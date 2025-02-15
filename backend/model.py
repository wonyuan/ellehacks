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


co = cohere.Client(api_key)
response = co.classify(
  model='5ae71449-3ae0-488f-a703-eb0275839e8f-ft',
  inputs=[args.paragraph])
print('The confidence levels of the labels are: {}'.format(response.classifications))
