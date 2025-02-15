import os
from dotenv import load_dotenv
import argparse
import cohere

# Load the .env file
load_dotenv()

# Access the API key
api_key = os.getenv('API_KEY')

if api_key is None:
    raise ValueError("API key not found. Please ensure the .env file contains the correct 'API_KEY'.")

parser = argparse.ArgumentParser(description = "Classifer")
parser.add_argument("paragraph", type = str, help = "Input paragraph")
args = parser.parse_args()
print(args.paragraph)

situation = args.paragraph

co = cohere.Client(api_key)

# Step 1: Classify the input (match with chat model)
response = co.classify(
    model='5ae71449-3ae0-488f-a703-eb0275839e8f-ft',
    inputs=[situation])
print('The confidence levels of the labels are: {}'.format(response.classifications))

# Find top chat model based on classification results
highest_confidence = max(response.classifications, key = lambda x: x.confidence)
classification = highest_confidence.prediction
confidence_level = highest_confidence.confidence
print(f"Classified as: {classification}")
print(f"Confidence level: {confidence_level}")

# If confidence level is too low (below 25%):
if confidence_level < 0.25:
    print("Confidence is too low. Please provide a more descriptive message.")
    exit()


# if classification == "Angry":
#   chat_id = "ef9183fe-75a5-4686-b7ff-14fced618013-ft"
# elif classification == "Quiet":
#   chat_id = "ef9183fe-75a5-4686-b7ff-14fced618013-ft"
# elif classification == "Judgemental":
#   chat_id = "ef9183fe-75a5-4686-b7ff-14fced618013-ft"
# elif classification == "happy":
#   chat_id = "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"

# Map labels to chat models
persona_models = {
    "Angry": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",
    "Quiet": "ebbfe6bd-0c47-42e6-8afe-949a8bfe9e34-ft",  
    "Judgemental": "d5452d1d-d8bd-42d6-a28c-321f79f96572-ft", 
    "Happy": "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"
}

chat_id = persona_models.get(classification)

if not chat_id:
    print(f"No model found for classification: {classification}")
    exit()

stream = co.chat_stream( 
    model = chat_id,
    message = situation, # responds to users initial input
    temperature = 0.3,
    chat_history = [],
    prompt_truncation = 'AUTO'
) 

# Stream response
for event in stream:
    if event.event_type == "text-generation":
      print(event.text, end = '')