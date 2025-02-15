import os
from dotenv import load_dotenv
import argparse

# Load the .env file
load_dotenv()

# Access the API key
api_key = os.getenv('API_KEY')

parser = argparse.ArgumentParser(description="Classifer")
parser.add_argument("paragraph", type=str, help="Input paragraph")
args = parser.parse_args()
print(args.paragraph)


classified_model = "angry"

print(classified_model)
