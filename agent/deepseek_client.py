import os 
from openai import OpenAI
from dotenv import load_dotenv
import requests


load_dotenv()

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
BASE_URL = "https://api.deepseek.com"

API_URL = "https://api.deepseek.com/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
    "Content-Type": "application/json"
}

def send_prompt(prompt):
    payload = {#dictionary
        "model": "deepseek-chat",
        "messages": [
            {"role":"user","content":prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(API_URL, headers = HEADERS, json = payload)

    if response.status_code ==200:
        data =  response.json()
        return data["choices"][0]["message"]["content"]
    else:
        print("ERROR:", response.status_code, response.text)
        return "There was an error with the request."