from flask import Flask, request, jsonify
import cohere

co = cohere.Client("your-cohere-api-key")

personas = {
    "Angry Adam": "A teenager who is angry and confrontational, often responds defensively or with frustration.",
    "Happy Hannah": "A cheerful teenager who is generally happy but has something bothering them inside. Responds positively but with underlying concern.",
    "Quiet Quintin": "A moody and introspective teenager, responds in short, often somber tones. Prefers to be left alone.",
    "Judgmental Judy": "A teenager who expresses disgust or judgment towards things, often reacts with a tone of superiority or distaste."
}

def generate_response(message, persona):
    """
    This function takes the parent’s message and the chosen persona,
    then generates a response using Cohere's API based on the persona's tone.
    """
    persona_style = personas.get(persona, "")
    
    # Create the prompt combining the persona and the parent's message
    prompt = f"Persona: {persona_style}\nParent's message: {message}\nReply:"
    
    # Call Cohere API to generate a response
    response = co.generate(
        model="command-xlarge-2021-11-08",  # Use the large model for best results
        prompt=prompt,
        max_tokens=100  # Limit the length of the response
    )
    
    # Return the generated response
    return response.generations[0].text.strip()