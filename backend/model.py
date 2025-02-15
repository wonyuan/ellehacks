# from flask import Flask, jsonify, request
# from flask_cors import CORS  # Allow frontend to access backend
from model import evaluate_conversation
import cohere
import os
from dotenv import load_dotenv

# app = Flask(__name__)
# # Access the API key
# CORS(app)  # Enable CORS for all routes

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

api_key = os.getenv('API_KEY')
co = cohere.Client(api_key)

persona_models = {
    "Angry Adam": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",
    "Quiet Quintin": "ebbfe6bd-0c47-42e6-8afe-949a8bfe9e34-ft",
    "Judgmental Judy": "d5452d1d-d8bd-42d6-a28c-321f79f96572-ft",
    "Happy Hannah": "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"
}

@app.route('/classify', methods=['POST'])
def classify():
    try:
        # Classify the conversation for communication quality
        response = co.classify(
            model = 'bfc37152-1c6c-4486-84bb-843dd7d9df11-ft',  # MODEL ID HERE
            inputs = [chat_history]
        )

        # Find the classification with the highest confidence
        highest_confidence = max(response.classifications, key = lambda x: x.confidence)
        label_scores = {"one": "10%", "two": "20%", "three": "30%", "four": "40%", "five": "50%", "six": "60%", "seven": "70%", "eight": "80%", "nine": "90%", "ten": "100%",
        }

        label = highest_confidence.prediction  # labels from "one", "two", ..., "ten"
        confidence_level = highest_confidence.confidence

        # If confidence is low, prompt for more information
        if confidence_level < 0.25:
            return {"error": "Confidence too low. Please provide more details."}, 400

        return {
            "conversation_rating": label_scores.get(label),
            "confidence": confidence_level
        }

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
