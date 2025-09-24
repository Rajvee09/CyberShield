# **App Name**: CyberShield

## Core Features:



- AI-Powered Scam Checker: Analyze user-provided text (e.g., emails) to assess scam risk using an AI model, returning a risk score and summary explanation. 
- Community Scam Reporting: Enable users to submit detailed scam reports with title, type, description, location, and attachments, like png and jpg images.
- Community Scam Discussion: Users can engage in discussion, and submit comments. User can filter by type of scam and app that was targeted.
- Prevention Section: Add a prevention section in which prevention methods of various scams are available in detailed manner.
- Animated UI elements: Add animations to UI elements where appropriate to enhance user experience.
- Dark Mode Option: Implement a toggle for users to switch between light and dark themes.

Technology Stack
Frontend: The project is a Next.js application built with React and TypeScript. It uses a responsive, card-based layout styled with Tailwind CSS.

Backend: The application is designed to use Firebase as its backend-as-a-service. User authentication and data persistence are handled by Firebase services, although the current implementation uses local JSON files for data storage for simplicity.

AI Integration: The AI Scam Checker is powered by the Genkit framework, which provides a straightforward way to integrate a large language model.

Database: The data is stored in static JSON files (scams.json, users.json, comments.json).

Unique Value Proposition
CyberShield sets itself apart by blending the power of a modern AI with a dynamic, user-driven community. Unlike single-purpose scam-checking apps or static informational websites, CyberShield offers a holistic, real-time defense. It empowers users not only to react to immediate threats with a smart tool but also to proactively educate themselves and contribute to a collective, global defense network. This integrated approach makes the platform more effective and relevant, creating a safer digital environment for everyone.

