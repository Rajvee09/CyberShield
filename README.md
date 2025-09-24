# CyberShield

### **Project Overview**

CyberShield is a community-driven, full-stack application designed to combat the growing threat of online scams. The platform's core mission is to provide users with the tools and knowledge needed to protect themselves and their community from digital deception. By combining AI analysis with real-world, user-reported data, CyberShield creates a comprehensive and dynamic resource for online safety.

The application serves as a centralized hub, allowing users to:
* Get instant risk analysis on suspicious messages.
* Share and discuss scam encounters with a global community.
* Learn about and identify common scam tactics.
* Stay informed about the latest and most frequent threats.

### **Core Features**

* **AI Scam Checker**: An advanced AI tool that analyzes user-provided text (e.g., emails, text messages) to assess scam risk. It provides an instant risk score and a clear, detailed summary of why the text may be fraudulent.
* **Community Reports**: Users can submit detailed scam reports with a title, type, description, and even attachments like images and videos. This feature powers a real-time database of scams reported from around the world.
* **Trending Scams**: A dynamic carousel on the homepage displays the most frequently reported scams.
* **Prevention Guide**: A dedicated section provides users with comprehensive guides on how to recognize and avoid different types of scams.
* **Community Discussion**: Users can engage in discussions and submit comments on individual scam reports.
* **One-Click PDF Report Generation**: The project allows users to download a formatted PDF document containing scam report details, which can be useful for official records.
* **Dark Mode Option**: Users can toggle between a light and a dark theme.

### **Technology Stack**

* **Frontend**: The project is a Next.js application built with **React** and **TypeScript**. It uses a responsive, card-based layout styled with **Tailwind CSS**.
* **Backend**: The application is designed to use **Firebase** as its backend-as-a-service. User authentication and data persistence are handled by Firebase services, although the current implementation uses local JSON files for data storage for simplicity.
* **AI Integration**: The AI Scam Checker is powered by the **Genkit** framework, which provides a straightforward way to integrate a large language model.
* **Database**: The data is stored in static JSON files (`scams.json`, `users.json`, `comments.json`).

### **Unique Value Proposition**

CyberShield sets itself apart by blending the power of a modern AI with a dynamic, user-driven community. Unlike single-purpose scam-checking apps or static informational websites, CyberShield offers a holistic, real-time defense. It empowers users not only to react to immediate threats with a smart tool but also to proactively educate themselves and contribute to a collective, global defense network. This integrated approach makes the platform more effective and relevant, creating a safer digital environment for everyone.
