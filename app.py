from flask import Flask, request, jsonify, render_template
from chat import process_user_message

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main_page.html')

@app.route('/home')
def home():
    return render_template('page1.html')

@app.route('/plan')
def plan():
    return render_template('page2.html')

@app.route('/faqs')
def faqs():
    return render_template('page3.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    bot_response = process_user_message(user_message)
    return jsonify({'bot_response': bot_response})

if __name__ == "__main__":
    app.run(debug=True)

