from agent.deepseek_client import send_prompt

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    response = send_prompt(user_input)
    print("DeepSeek:", response)