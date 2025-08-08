import openai
import requests
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
from io import BytesIO

# Set your API keys
OPENAI_API_KEY = '' #OpenAI API Code
TELEGRAM_API_KEY = '' #Telgram Bot Access Token


openai.api_key = OPENAI_API_KEY

def chat_with_gpt(messages):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Use the appropriate model
            messages=messages,
            max_tokens=1500,  # Adjust the number of tokens as needed
            temperature=0.7,
        )
        return response.choices[0].message['content'].strip()
    except openai.error.OpenAIError as e:
        return f"An error occurred: {e}"

def analyze_file(file_content):
    try:
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Analyze the following file content:\n\n{file_content}"}
        ]
        return chat_with_gpt(messages)
    except Exception as e:
        return f"An error occurred while analyzing the file: {e}"


def generate_image(prompt):
    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        image_url = response['data'][0]['url']
        return image_url
    except Exception as e:
        return f"An error occurred while generating the image: {e}"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Welcome to the Parsai GPT Telegram bot! How can I assist you today?")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text
    chat_id = update.message.chat_id

    if user_message.startswith("analyze file"):
        file_path = user_message.split(" ", 2)[2]
        try:
            with open(file_path, 'r') as file:
                file_content = file.read()
            response = analyze_file(file_content)
        except Exception as e:
            response = f"An error occurred while reading the file: {e}"
    elif user_message.startswith("generate image"):
        prompt = user_message.split(" ", 2)[2]
        image_url = generate_image(prompt)
        if image_url.startswith("An error occurred"):
            response = image_url
        else:
            response = "Here is your generated image:"
            image_data = requests.get(image_url).content
            image_file = BytesIO(image_data)
            image_file.name = 'generated_image.png'
            await context.bot.send_photo(chat_id=chat_id, photo=image_file)
            return
    else:
        context.user_data.setdefault("messages", [])
        messages = context.user_data["messages"]
        messages.append({"role": "user", "content": user_message})
        response = chat_with_gpt(messages)
        messages.append({"role": "assistant", "content": response})

    if response.startswith("An error occurred"):
        await context.bot.send_message(chat_id=chat_id, text=response)
    else:
        # Handle code block formatting
        if '```' in response:
            parts = response.split('```')
            formatted_response = ""
            for i, part in enumerate(parts):
                if i % 2 == 0:
                    formatted_response += part
                else:
                    formatted_response += f"```\n{part}\n```"
            response = formatted_response
        await context.bot.send_message(chat_id=chat_id, text=response, parse_mode='Markdown')

def main():
    application = ApplicationBuilder().token(TELEGRAM_API_KEY).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    application.run_polling()

if __name__ == "__main__":
    main()
