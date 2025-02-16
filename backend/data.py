from flask import Flask, jsonify, request
from flask_cors import CORS  
import cohere
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

api_key = os.getenv('API_KEY')
co = cohere.Client(api_key)

chat_history = []

persona_models = {
    "Angry Adam": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",
    "Quiet Quintin": "ebbfe6bd-0c47-42e6-8afe-949a8bfe9e34-ft",
    "Judgmental Judy": "d5452d1d-d8bd-42d6-a28c-321f79f96572-ft",
    "Happy Hannah": "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"
}


@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.get_json()
        paragraph = data.get("paragraph", "").strip()

        if not paragraph:
            return jsonify({"error": "No paragraph provided!"}), 400

        response = co.classify(
            model = '5ae71449-3ae0-488f-a703-eb0275839e8f-ft',
            inputs = [paragraph]
        )

        highest_confidence = max(response.classifications, key = lambda x: x.confidence)
        classification = highest_confidence.prediction
        confidence_level = highest_confidence.confidence

        if confidence_level < 0.25:
            return jsonify({"error": "Confidence too low. Please provide more details."}), 400

        chat_id = persona_models.get(classification)
        if not chat_id:
            return jsonify({"error": f"No model found for classification: {classification}"}), 404

        return jsonify({
            "classification": classification,
            "confidence": confidence_level,
            "persona_model_id": chat_id
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/refined', methods=['POST'])
def refine():
    data = request.json
    situation = data.get("situation")

    stream = co.chat_stream( 
        model='c4ai-aya-expanse-32b',
        message='BASED ON THIS INFORMATION:'+ situation + "create a single, concise 2-sentence description of a teenager, for example: Hi I am a teenager with ____ and I've been having trouble with _____. Please strictly adhere to the short and concise length.",
        temperature=0.3,
        chat_history=[],
        prompt_truncation='AUTO'
    ) 

    updated_situation = ""

    for event in stream:
        if event.event_type == "text-generation":
        # Concatenate the generated text to the updated_situation variable
            updated_situation += event.text
            print(event.text, end = '')
    
    return{
        "profile_intro": updated_situation
    }

@app.route('/chat', methods=['POST'])
def chat():
    global chat_history
    if request.method == 'POST':
        data = request.json
        classification = data.get("classification")
        situation = data.get("situation")
        user_input = data.get("user_input")

        chat_id = persona_models.get(classification)

        if not chat_id:
            return jsonify({"error": f"No model found for classification: {classification}"}), 400

        message_to_chat = (
            f"You are a teenager with the personality: {classification}. "
            "Your role is to help a parent practice conversations with their child based on the situation they have described. "
            f"Stay in character as '{classification}' throughout the conversation. "
            "React naturally based on your assigned persona's emotions, thoughts, and communication style. "
            "Your goal is to simulate a realistic interaction to help the parent better understand how to communicate with their child. "
            "Let the parent lead the conversation, and only respond as the teenager. "
            "Make sure you are open to change. "
            f"Here is the context of the situation provided by the parent: {situation}"
        )

        if not chat_history:
            chat_history = [{"role": "system", "message": message_to_chat}]

        chat_history.append({"role": "user", "message": user_input})

        response = co.chat(
            model = chat_id,
            message = user_input,
            temperature = 0.3,
            chat_history = chat_history,
            prompt_truncation = 'AUTO'
        )

        bot_response = response.text
        chat_history.append({"role": "Chatbot", "message": bot_response})
        return jsonify({"bot_response": bot_response})
    
@app.route('/evaluation', methods=['POST'])
def evaluation():
    try:
        data = request.json  # ✅ No need to extract "params"
        situation = data.get("scenario")  # ✅ Matches frontend
        chat = data.get("chat_history")  # ✅ Matches frontend

        stream = co.chat_stream( 
            model='c4ai-aya-expanse-32b',
            message = f"Based on this information: {situation}, and this conversation: {chat}. Answer the following: 'what the parent did well', 'areas for improvement', and 'advice for better connection'. Give a brief text responses for each topic.",
            temperature=0.3,
            chat_history=[],
            prompt_truncation='AUTO'
        ) 

        # well, improve, connection = "", "", ""
        output = ""

        for event in stream:
            if event.event_type == "text-generation":
                output += event.text
                # print(output, end='')

        return {
            "Output": output
        }

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == "__main__":
    app.run(debug = True)