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

parser = argparse.ArgumentParser(description="Classifer")
parser.add_argument("paragraph", type=str, help="Input paragraph")
args = parser.parse_args()
print(args.paragraph)

situation = args.paragraph

co = cohere.Client(api_key)

# Step 1: Classify the input (match with chat model)
response = co.classify(
  model='5ae71449-3ae0-488f-a703-eb0275839e8f-ft',
  inputs=[situation])
print('The confidence levels of the labels are: {}'.format(response.classifications))

# classification = "Angry"
# After all chat models are available:
classification = max(response.classifications, key=lambda x: x.confidence).prediction
print(f"Classified as: {classification}")

# if classification == "Angry":
#     chat_id = "ef9183fe-75a5-4686-b7ff-14fced618013-ft"
# elif classification == "Quiet":
#     chat_id = "ef9183fe-75a5-4686-b7ff-14fced618013-ft"
# elif classification == "Judgemental":
#     chat_id = "ef9183fe-75a5-4686-b7ff-14fced618013-ft"
# elif classification == "happy":
#     chat_id = "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"

# Map labels to chat models
persona_models = {
    "Angry": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",
    "Quiet": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",  # Placeholder
    "Judgemental": "ef9183fe-75a5-4686-b7ff-14fced618013-ft",  # Placeholder
    "Happy": "5340c40f-9e3b-4d16-8d4c-9a1d4495e905-ft"
}

chat_id = persona_models.get(classification)

if not chat_id:
    print(f"No model found for classification: {classification}")
    exit()

stream = co.chat_stream( 
  model=chat_id,
  message=situation, # responds to users initial input
  temperature=0.3,
  chat_history=[],
  prompt_truncation='AUTO'
) 

# Stream response
for event in stream:
  if event.event_type == "text-generation":
    print(event.text, end='')