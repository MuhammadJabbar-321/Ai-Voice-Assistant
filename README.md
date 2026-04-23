# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

SHIFRA 2.O — Advanced AI Virtual Assistant
SHIFRA 2.O is a sophisticated, web-based AI assistant built with React.js and Vite. It leverages the power of Google's Gemini API to provide an interactive, multimodal experience. Beyond simple text-based chatting, SHIFRA 2.O is designed to be a functional companion—capable of voice interaction, live captioning, and web-based task automation like opening browsers or playing media.

🌟 Key Features
🗣️ Voice-Activated Intelligence: Interactive voice communication with integrated Speech-to-Text (STT) and Text-to-Speech (TTS).

👁️ Visual Feedback: Real-time animated feedback via aiVoice.gif and speak.gif to indicate when the AI is listening or responding.

📜 Live Captioning: High-accuracy captioning system for real-time visual tracking of conversations.

🌐 Web Automation: Execute commands to open websites, search the web, and play music/videos via voice intent.

🧠 Gemini Integration: Powered by Google Gemini for high-reasoning, context-aware responses.

⚡ High Performance: Built on Vite for near-instant load times and a smooth UI/UX.

🛠️ Tech Stack
Frontend Framework: React.js

Build Tool: Vite

AI Model: Google Gemini API

State Management: React Context API

Styling: CSS3 (Modular and Responsive)

📂 Project Architecture
Plaintext
SHIFRA2.O/
├── public/              # Static public assets
├── src/
│   ├── assets/          # Visual assets (aiVoice.gif, speak.gif, logos)
│   ├── context/         # UserContext.jsx for global state management
│   ├── App.jsx          # Main application logic & UI structure
│   ├── gemini.js        # API configuration and Gemini model integration
│   ├── main.jsx         # Application entry point
│   └── App.css          # Core styling and animations
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite build configuration
🚀 Getting Started
1. Prerequisites
Node.js (v16.0 or higher)

npm or yarn

Gemini API Key (Obtainable from Google AI Studio)

2. Installation
Clone the repository and install the dependencies:

Bash
git clone https://github.com/yourusername/shifra2.0.git
cd shifra2.0
npm install
3. Environment Setup
Create a .env file in the root directory and add your API key:

Code snippet
VITE_GEMINI_API_KEY=your_gemini_api_key_here
4. Run Development Server
Bash
npm run dev
Open http://localhost:5173 in your browser to start interacting with SHIFRA.

🎮 How It Works
State Management: UserContext.jsx manages the assistant's "memory," handling the toggle between listening modes and storing response data.

AI Communication: The gemini.js file handles the asynchronous calls to the generative model, ensuring responses are streamed or delivered efficiently.

Voice UI: The app monitors audio input levels to trigger the speak.gif and aiVoice.gif animations, providing a lifelike "breathing" interface.

Action Dispatcher: Specific keywords in your speech (e.g., "Open YouTube" or "Play Music") trigger window-level functions to automate browser tasks.

🤝 Contributing
Contributions are welcome! If you'd like to improve the voice recognition accuracy or add new automation features, please feel free to fork the repo and submit a Pull Request.

📜 License
This project is licensed under the MIT License.

Developed with ❤️ Muhammad Jabbar

#ReactJS #GenerativeAI #GeminiAPI #WebDevelopment #AIAssistant #OpenSource #Vite
