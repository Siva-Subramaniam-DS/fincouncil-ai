# FinCouncil AI 🎯📊🛡️

### Your AI-Powered Financial Deliberation Committee

[![Live Demo](https://img.shields.io/badge/Demo-Live_on_Vercel-059669?style=for-the-badge)](https://fincouncil-ai.vercel.app)
[![Powered by Gemini 2.5](https://img.shields.io/badge/Powered_by-Gemini_2.5-4285f4?style=for-the-badge&logo=google-gemini)](https://ai.google.dev/)
[![Built with ADK](https://img.shields.io/badge/Orchestrated_with-Google_ADK-34a853?style=for-the-badge)](https://github.com/google/ai-agent-sdk)

FinCouncil AI is a modern multi-agent financial advisory platform where six specialized AI agents debate, collaborate, and stress-test investment theses in real-time to deliver consensus-driven recommendations.

---

## 🎨 Live Preview

Check out the interactive application hosted live on Vercel:
👉 **[https://fincouncil-ai.vercel.app](https://fincouncil-ai.vercel.app)**

---

## 💡 Key Features

* **Sequential Agent Deliberation**: Real-time simulation of sequential workflow progress. Watch individual agent cards cycle through analysis states (`idle` ➔ `thinking` ➔ `completed`) as they evaluate tickers.
* **Structured Debate System**: Access the deliberation log moderated by the Committee Agent. Read arguments between the Market Agent (quantitative charts) and the Risk Agent (downside risk checks).
* **Financial Literacy Coach**: An embedded Education Agent highlights complex terms in recommendations (e.g., Forward P/E, CoWoS Packaging, CUDA lock-in) and translates them into simple concepts.
* **Interactive Learning Hub**: Features personalized learning paths, metrics tracker, search/filter systems, and multiple-choice quizzes with instant feedback.
* **Architecture Interactive Logs**: View detailed system diagrams, technology stack lists, security compliance details, and MCP tool registries.

---

## 🛡️ The AI Committee Roles

FinCouncil AI utilizes a committee of six specialized agents coordinated using the **Google Agent Development Kit (ADK)**:

1. **Executive Agent (Chief Strategist)**: Parses initial query intent, delegates work, and synthesizes the consensus thesis.
2. **Market Agent (Quant Analyst)**: Computes valuation models, historical indicators, and targets.
3. **News Agent (Sentiment Analyst)**: Scraping news cycles, social metrics, and earnings reports.
4. **Risk Agent (Risk Officer)**: stress-tests exposure warnings and calculates position sizing limits.
5. **Education Agent (Financial Coach)**: Extracts complex concepts and drafts retail guides.
6. **Committee Agent (Facilitator)**: Moderates the deliberation timeline and challenges groupthink.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
* **Animations**: Framer Motion (smooth transitions, SVG timeline connections)
* **Charts**: Recharts (interactive stock history indicators)
* **Icons**: Lucide React
* **AI Integration**: Google Gemini 2.5 Pro & Flash

---

## 🚀 Local Development Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation
1. Clone the repository and navigate to the directory:
   ```bash
   cd fincouncil-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
