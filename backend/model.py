import cohere
import numpy as np
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import time
load_dotenv()


import os
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

