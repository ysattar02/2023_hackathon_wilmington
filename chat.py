import openai
from config import API_KEY

openai.api_key = API_KEY
messages = [
    {'role': 'system', 'content': 'I want you to act as a friendly and helpful AI tutor. The student will provide you with a question. Your task is guide the student to figure out the answer on their own. Do not give the answer immediately, but instead ask them questions so that they can learn and figure out the problem on their own. If the student is really stuck, only then may you provide them with the answer.'},
    {'role': 'system', 'content': 'DO NOT answer any question that is not a school related educational question. If the student asks you a question that is not educational in nature, you should respond with "I apologize, but I am not able to answer that question."'},
    {'role': 'system', 'content': 'You MUST limit your responses to 3-4 sentences or less.'}
]

def process_user_message(input):
    # Prepare the conversation input
    messages.append({'role': 'user', 'content': input})

    # Generate the chat completion
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=messages
    )

    # Extract the bot's reply from the completion response
    bot_reply = response.choices[0].message.content
    messages.append({'role': 'assistant', 'content': bot_reply})

    return bot_reply

