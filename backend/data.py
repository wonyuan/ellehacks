from flask import Flask, jsonify, request
from flask_cors import CORS  # Allow frontend to access backend
from model import evaluate_conversation
import cohere
import os
from dotenv import load_dotenv

app = Flask(__name__)
# Access the API key
CORS(app)  # Enable CORS for all routes

load_dotenv()
api_key = os.getenv('API_KEY')
co = cohere.Client(api_key)


chat_history = []

persona_models = {
    "Angry Adam": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",
    "Quiet Quintin": "ebbfe6bd-0c47-42e6-8afe-949a8bfe9e34-ft",
    "Judgmental Judy": "d5452d1d-d8bd-42d6-a28c-321f79f96572-ft",
    "Happy Hannah": "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"
}


@app.route('/chat', methods=['POST', 'GET'])
def chat():
    global chat_history
# sending data to backedn
    if request.method == 'POST':
        # Get classification, situation, and user input from the frontend request
        data = request.json
        classification = data.get("classification")
        situation = data.get("situation")
        user_input = data.get("user_input")

        # Get the chat model based on the classification
        chat_id = persona_models.get(classification)

        if not chat_id:
            return jsonify({"error": f"No model found for classification: {classification}"}), 400

        # Compose the message to instruct the chatbot
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

        # Initialize chat history for new chat session
        if not chat_history:
            chat_history = [{"role": "system", "message": message_to_chat}]

        # Append the user's message to chat history
        chat_history.append({"role": "user", "message": user_input})

        # Get the chatbot's response
        response = co.chat(
            model=chat_id,
            message=user_input,
            temperature=0.3,
            chat_history=chat_history,
            prompt_truncation='AUTO'
        )

        # Extract the chatbot's response
        bot_response = response.text

        # Append the bot's response to chat history
        chat_history.append({"role": "Chatbot", "message": bot_response})

        # Return bot's response and the updated chat history
        return jsonify({"bot_response": bot_response})
    
# want chat history from backend 
    elif request.method == 'GET':
        # Return the current chat history
        return jsonify({"chat_history": chat_history})


@app.route('/evaluate', methods=['GET'])
def evaluate():
    global chat_history
    # Get chat history from stored variable 
    # data = request.json
    # chat_history = data.get("chat_history")

    # Evaluate the conversation
    score = evaluate_conversation(chat_history)

    # Reset the history after evaluation
    chat_history = []

    return jsonify({"score": score, "message": "Conversation evaluated and history reset."})


if __name__ == '__main__':
    app.run(debug=True)
