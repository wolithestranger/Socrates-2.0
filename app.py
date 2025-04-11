from flask import Flask, request, jsonify
from flask_cors import CORS
from agent.deepseek_client import send_prompt  # <- updated import

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '')
    response = send_prompt(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
