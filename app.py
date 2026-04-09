import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from groq import Groq

# .env faylidagi o'zgaruvchilarni yuklash
load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')

# API kalitini .env faylidan olish
api_key = os.getenv("GROQ_API_KEY")

# Groq klientini sozlash
client = Groq(api_key=api_key)

# Asosiy sahifani ko'rsatish uchun
@app.route('/')
def index():
    return render_template('index.html')

# Chat uchun API endpoint
@app.route('/chat', methods=['POST'])
def chat():
    # Agar API kalit topilmasa xatolik qaytarish
    if not api_key:
        return jsonify({"error": "API kaliti topilmadi!"}), 500

    # Foydalanuvchidan kelgan xabarni olish
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "Xabar yuborilmadi!"}), 400

    try:
        # Groq API'ga so'rov yuborish
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_message,
                }
            ],
            model="llama-3.1-8b-instant", # Bu model tez va bepul
        )
        # AI javobini olish
        ai_response = chat_completion.choices[0].message.content
        return jsonify({"response": ai_response})

    except Exception as e:
        # Boshqa xatoliklar yuz bersa
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)