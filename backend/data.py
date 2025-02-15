from flask import Flask, jsonify
from flask_cors import CORS  # Allow frontend to access backend

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask API!", "status": "success"})

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!", "status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
