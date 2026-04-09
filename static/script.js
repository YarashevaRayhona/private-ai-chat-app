document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const messageInput = document.getElementById('message-input');
    const responseArea = document.getElementById('response-area');

    submitButton.addEventListener('click', async () => {
        const message = messageInput.value;
        if (message.trim() === '') return;

        responseArea.textContent = 'O\'ylanmoqda...';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            const data = await response.json();

            if (data.error) {
                responseArea.textContent = 'Xatolik: ' + data.error;
            } else {
                responseArea.textContent = data.response;
            }

        } catch (error) {
            responseArea.textContent = 'Server bilan bog\'lanishda xatolik yuz berdi.';
        }
    });
});