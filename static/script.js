document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatLog = document.getElementById('chat-log');
    const submitButton = document.getElementById('submit-button');

    // Funksiya: Xabarlarni chat oynasiga chiroyli qo'shish
    const appendMessage = (sender, text) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        
        const pElement = document.createElement('p');
        pElement.textContent = text;
        messageElement.appendChild(pElement);
        
        chatLog.appendChild(messageElement);
        
        // Har doim oxirgi xabarga scroll qilish
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    // Forma yuborilganda...
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Sahifani yangilanishdan saqlaydi
        
        const message = messageInput.value.trim();
        if (message === '') return;

        // 1. Foydalanuvchi xabarini ekranga qo'shish
        appendMessage('user', message);
        messageInput.value = ''; // Kiritish maydonini tozalash
        submitButton.disabled = true;

        // 2. "AI o'ylanmoqda..." indikatorini qo'shish
        const thinkingMessage = document.createElement('div');
        thinkingMessage.classList.add('message', 'ai-message');
        thinkingMessage.innerHTML = '<p class="thinking"><span>.</span><span>.</span><span>.</span></p>';
        chatLog.appendChild(thinkingMessage);
        chatLog.scrollTop = chatLog.scrollHeight;


        // 3. Backend'ga so'rov yuborish
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            const data = await response.json();
            
            // "O'ylanmoqda..." xabarini o'chirish
            chatLog.removeChild(thinkingMessage);

            if (data.error) {
                appendMessage('ai', 'Xatolik: ' + data.error);
            } else {
                appendMessage('ai', data.response);
            }

        } catch (error) {
            chatLog.removeChild(thinkingMessage);
            appendMessage('ai', 'Server bilan bog\'lanishda xatolik yuz berdi.');
        } finally {
            submitButton.disabled = false;
        }
    });

    // Enter tugmasi bilan yuborish (Shift+Enter yangi qator)
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
});