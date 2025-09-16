# **App Name**: CyberShield

## Core Features:

- Location-Based Scam Carousel: Display trending scams in a dynamic image carousel, prioritized by the user's selected country.
- Interactive Scam Map: Show reported scams on a map with clickable markers, using Leaflet.js. Popup shows key scam details.
- AI-Powered Scam Checker: Analyze user-provided text (e.g., emails) to assess scam risk using an AI model, returning a risk score and summary explanation. The LLM acts as a tool: reasoning about which components of its knowledge or external details apply.
- Community Scam Reporting: Enable users to submit detailed scam reports with title, type, description, location, and attachments, like png and jpg images.
- Community Scam Discussion: Users can engage in discussion, and submit comments. User can filter by type of scam and app that was targeted.
- One-Click PDF Report Generation: Allow users to download a formatted PDF document containing scam report details via jsPDF library.
- Database: Create a working database to store user credentials as well as all the data uploaded by users.
- Prevention Section: Add a prevention section in which prevention methods of various scams are available in detailed manner.
- Working Backend: Implement a fully functional backend to support all features.
- Animated UI elements: Add animations to UI elements where appropriate to enhance user experience.
- Dark Mode Option: Implement a toggle for users to switch between light and dark themes.

## Style Guidelines:

- Primary color: Soft Teal (#4DB6AC) to convey trust and tranquility.
- Background color: Off-White (#F5F5F5) for a clean and accessible layout.
- Accent color: Coral (#FF8A65) to highlight important elements in a friendly manner.
- Font pairing: 'Nunito' sans-serif for headlines, and 'Open Sans' sans-serif for body text.
- Utilize a set of consistent, outline-style icons (inline SVGs) representing scam types (phishing, fake job, etc.).
- Implement a responsive, card-based layout for scam reports, ensuring readability on mobile and desktop devices.
- Use subtle fade-in animations for newly loaded scam reports.
- All buttons should look good and give a 3d effect on hovering upon and all should be working.
- Logo: A simplistic shield icon with a network overlay, conveying security and connectivity.