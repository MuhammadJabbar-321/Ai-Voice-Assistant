# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SHIFRA 2.O - Smart Virtual Assistant

SHIFRA 2.O is an advanced AI-powered assistant built with **React**, **Vite**, and **JavaScript**, integrating the **Google Gemini API** to provide a seamless, multimodal user experience. This assistant isn't just a chatbot; it's designed to interact via voice, manage tasks, and navigate the web efficiently.

## 🚀 Features

* **Voice Interaction:** Talk to SHIFRA and receive real-time voice responses.
* **Live Captioning:** Integrated captioning system for accessibility and clarity during voice conversations.
* **Web Automation:** Ability to open specific websites, search the browser, or play music/videos online via voice commands.
* **Gemini Integration:** Leverages the power of Google's Gemini API for intelligent, context-aware responses.
* **Modern UI:** Built with React and CSS for a sleek, responsive, and high-performance interface.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite
- **Logic:** JavaScript (ES6+)
- **AI Engine:** Google Gemini API
- **Styling:** CSS3

## 📂 Project Structure

- `src/context`: Manages global state and API logic.
- `src/gemini.js`: Configuration and communication with the Gemini API.
- `App.jsx`: Main application container.
- `main.jsx`: Entry point for the Vite build.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/shifra-2-0.git](https://github.com/your-username/shifra-2-0.git)
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env file in the root and add your API key:

Code snippet
VITE_GEMINI_API_KEY=your_open_api_key_here
Run the Development Server:

Bash
npm run dev
📜 License
This project is licensed under the MIT License.


---

## ✍️ GitHub Social Caption (Approx. 300 Words)

**Headline: Revolutionizing Personal Automation with SHIFRA 2.O**

Meet **SHIFRA 2.O**, a next-generation AI assistant that bridges the gap between simple LLM wrappers and functional desktop automation. Built using the modern **React + Vite** stack, SHIFRA 2.O is designed for users who want a more hands-free, interactive digital environment. 

While many assistants are limited to text-based chat, SHIFRA 2.O focuses on **multimodal accessibility**. By utilizing the **Google Gemini API**, it processes complex queries with high reasoning capabilities. The integration of a robust **Voice-to-Text and Text-to-Speech** engine allows users to communicate naturally, supported by a dynamic **live captioning system** that ensures every word is captured visually on the screen.

**Why SHIFRA 2.O?**
It goes beyond the "input box." SHIFRA is equipped with logic to act as a web navigator. Whether you need to open a specific browser tab, find a tutorial online, or play your favorite song on YouTube, SHIFRA handles the execution. The project utilizes **React Context API** for efficient state management, ensuring that the assistant remembers the flow of conversation and stays responsive without unnecessary re-renders.

**The Development Journey:**
This project highlights the power of combining modern frontend frameworks with cutting-edge AI. By moving away from traditional Create-React-App to **Vite**, the development experience is lightning-fast, mirroring the speed at which the assistant responds to user prompts. 

**Future Roadmap:**
* Enhanced system-level automation.
* Integration with more third-party APIs (Spotify, Google Calendar).
* Advanced visual recognition via Gemini Vision.

Whether you are looking to learn how to integrate Gemini into a React app or you want a functional virtual companion to boost your productivity, SHIFRA 2.O is the perfect starting point. **Check out the code, star the repo, and let's build the future of AI together!**

#ReactJS #GenerativeAI #GeminiAPI #WebDevelopment #AIAssistant #OpenSource #Vite