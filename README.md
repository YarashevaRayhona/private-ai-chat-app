# Minimal AI Web Chat Application

This is a stylish, single-page AI web chat application built as a case study for the Private AI System program. The application features a modern, dark-themed interface, preserves chat history during a session, and connects to a powerful Large Language Model (LLM) via the Groq API.



## Features

- **Interactive Chat Interface:** Clean, modern, and user-friendly design.
- **Persistent Chat History:** Conversations are maintained within the session.
- **Real-time AI Responses:** Fast and intelligent answers powered by the Groq Llama 3.1 model.
- **Secure API Key Handling:** API keys are managed safely using environment variables.
- **Clear Separation of Concerns:** A Flask backend for logic and a Vanilla JS frontend for the user interface.

## Technologies Used

- **Backend:**
  - Python 3
  - Flask
  - `python-dotenv` for environment variables
  - `groq` for API communication
- **Frontend:**
  - HTML5
  - CSS3 (with Google Fonts)
  - JavaScript (Vanilla JS, Fetch API)
- **Development:**
  - Git & GitHub for version control
  - `venv` for dependency management

## Setup and Installation

Follow these steps to run the project locally on your machine.

### 1. Prerequisites

Make sure you have [Python 3](https://www.python.org/downloads/) and [Git](https://git-scm.com/downloads/) installed on your system.

### 2. Clone the Repository

Open your terminal and clone this repository:

```bash
git clone https://github.com/YarashevaRayhona/private-ai-chat-app.git
cd private-ai-chat-app
```

### 3. Set Up a Virtual Environment

It is highly recommended to use a virtual environment to manage project dependencies.

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 4. Install Dependencies

Install all the required Python packages using `pip`:

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

You need an API key from Groq to use the LLM.

1.  Visit [Groq Console](https://console.groq.com/) to get your free API key.
2.  In the root of the project folder, create a new file named `.env`.
3.  Add your API key to the `.env` file like this:

    ```
    GROQ_API_KEY="your_groq_api_key_here"
    ```

### 6. Run the Application

Now you are all set! Run the Flask application with the following command:

```bash
python app.py
```

The application will be running at `http://127.0.0.1:5000`. Open this URL in your web browser to start chatting with the AI!
