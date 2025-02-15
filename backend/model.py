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
api_key = os.getenv('API_KEY')
co = cohere.Client(api_key)

def evaluate_conversation(chat_history):
    try:
        # Classify the conversation for communication quality
        response = co.classify(
            model = 'your-finetuned-model-id',  # MODEL ID HERE
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
        return {"error": str(e)}, 500
    

# OLD CODE: 


# # Load the .env file
# load_dotenv()

# app = Flask(__name__)
# # Access the API key
# api_key = os.getenv('API_KEY')

# if api_key is None:    raise ValueError("API key not found. Please ensure the .env file contains the correct 'API_KEY'.")

# parser = argparse.ArgumentParser(description = "Classifer")
# parser.add_argument("paragraph", type = str, help = "Input paragraph")
# args = parser.parse_args()
# print(args.paragraph)

# situation = args.paragraph

# co = cohere.Client(api_key)

# # Step 1: Classify the input (match with chat model)
# response = co.classify(
#     model='5ae71449-3ae0-488f-a703-eb0275839e8f-ft',
#     inputs=[situation])
# print('The confidence levels of the labels are: {}'.format(response.classifications))

# # Find top chat model based on classification results
# highest_confidence = max(response.classifications, key = lambda x: x.confidence)
# classification = highest_confidence.prediction

# confidence_level = highest_confidence.confidence
# print(f"Classified as: {classification}")
# print(f"Confidence level: {confidence_level}")

# # If confidence level is too low (below 25%):
# if confidence_level < 0.25:
#     print("Confidence is too low. Please provide a more descriptive message.")
#     exit()

# chat_history = []

# def chat(classification, situation):

# # Map labels to chat models
#     persona_models = {
#         "Angry Adam": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",
#         "Quiet Quintin": "ebbfe6bd-0c47-42e6-8afe-949a8bfe9e34-ft",
#         "Judgmental Judy": "d5452d1d-d8bd-42d6-a28c-321f79f96572-ft",
#         "Happy Hannah": "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"
#     }

#     chat_id = persona_models.get(classification)

#     if not chat_id:
#         print(f"No model found for classification: {classification}")
#         exit()

#     # message_to_chat = "YOU ARE A PRETEEN/TEENAGER STAY WITH THAT ROLE AND with your pretrained personality:" + classification + ". You are going to help a parent practice talking to there child based on this situation:" + situation + " REMEBER YOU ARE THE CHILD SO STAY IN CHARACTER. Let the parent prompt the conversation and be natural."

#     message_to_chat = (
#         f"You are a teenager with the personality: {classification}. "
#         "Your role is to help a parent practice conversations with their child based on the situation they have described. "
#         f"Stay in character as '{classification}' throughout the conversation. "
#         "React naturally based on your assigned persona's emotions, thoughts, and communication style. "
#         "Your goal is to simulate a realistic interaction to help the parent better understand how to communicate with their child. "
#         "Let the parent lead the conversation, and only respond as the teenager. "
#         "Make sure you are open to change. "
#         "Here is the context of the situation provided by the parent: " + situation
#     )

#     print("\nChatbot initialized. Type your message below. Type 'exit' to quit.\n")
#     chat_history = [{"role": "system", "message": message_to_chat}]

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() == 'exit':
#             print("Exiting chat...")
#             break
        
#         chat_history.append({"role": "user", "message": user_input})
#         response = co.chat(
#             model=chat_id,
#             message=user_input,
#             temperature=0.3,
#             chat_history=chat_history,
#             prompt_truncation='AUTO'
#         )
#         bot_response = response.text
#         chat_history.append({"role": "Chatbot", "message": bot_response})
#         print(f"Chatbot: {bot_response}\n")

