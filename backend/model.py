import cohere

co = cohere.Client('YOUR_API_KEY')  # Replace with your API key

def select_persona(parent_message):
    # Keywords for each persona
    angry_keywords = ["upset", "mad", "angry", "frustrated", "hate", "annoyed"]
    happy_keywords = ["happy", "excited", "cheerful", "good", "fun"]
    quiet_keywords = ["quiet", "reserved", "moody", "lonely", "introverted"]
    judgmental_keywords = ["disgusted", "critical", "rude", "annoyed", "disrespectful"]

    # Check for keywords in the parent's message
    message_lower = parent_message.lower()
    
    if any(word in message_lower for word in angry_keywords):
        return "Angry Adam"
    elif any(word in message_lower for word in happy_keywords):
        return "Happy Hannah"
    elif any(word in message_lower for word in quiet_keywords):
        return "Quiet Quintin"
    elif any(word in message_lower for word in judgmental_keywords):
        return "Judgmental Judy"
    else:
        return "Quiet Quintin"  # Set default to Quiet Quintin



def cohere_chatbot_interaction(persona, parent_message):
    # Set persona traits based on the selected persona
    if persona == "Angry Adam":
        persona_message = f"You are an angry and confrontational teenager. Respond to the parent angrily. The parent says: '{parent_message}'"
    elif persona == "Happy Hannah":
        persona_message = f"You are a cheerful, optimistic teenager. Respond to the parent in a happy and encouraging tone. The parent says: '{parent_message}'"
    elif persona == "Quiet Quintin":
        persona_message = f"You are a quiet, introspective teenager. Respond to the parent in a reserved and thoughtful manner. The parent says: '{parent_message}'"
    elif persona == "Judgmental Judy":
        persona_message = f"You are a judgmental and critical teenager. Respond to the parent in a blunt and harsh tone. The parent says: '{parent_message}'"
    else:
        persona_message = f"The parent says: '{parent_message}'"

    # Use Cohere's chat model to get a response
    response = co.generate(
        model='command-r7b-12-2024',  # Ensure you're using the correct model for chat
        prompt=persona_message,
        max_tokens=150,
        temperature=0.7
    )

    # Return the response
    return response.text.strip()

parent_message = "My kid won’t listen to me!"
persona = select_persona(parent_message)  # Selects the persona based on the parent’s message
response = cohere_chatbot_interaction(persona, parent_message)

print(response)



















#--------------------------------------

# Define personas dynamically (to be used in chat history)
personas = {
    "Angry Adam": "A teenager who is angry and confrontational.",
    "Happy Hannah": "A cheerful teenager who is happy but has something disturbing them inside.",
    "Quiet Quintin": "A moody teenager who is introspective and reserved.",
    "Judgmental Judy": "A teenager who expresses disgust or judgment towards things."
}

@app.route("/get_response", methods=["POST"])
def get_response():
    data = request.get_json()
    message = data.get("message")
    persona = data.get("persona")

    # Build the chat history based on the persona
    chat_history = [
        {"role": "User", "message": f"You are the Teen Replica, a model that takes inputs from parents and responds based on the {persona} persona"},
        {"role": "Chatbot", "message": f"Message for {persona} example: Hello, I'm {persona} and I feel..."}
    ]

    # Generate response from Cohere
    stream = co.chat_stream(
        model='command-r7b-12-2024',
        message=message,
        temperature=0.3,
        chat_history=chat_history,
        prompt_truncation='AUTO'
    )

    response_text = ""
    for event in stream:
        if event.event_type == "text-generation":
            response_text = event.text.strip()

    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(debug=True)
