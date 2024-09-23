Cricket Scoring Project
Overview
The Cricket Scoring Project aims to develop a robust backend and frontend system for accurately tracking and updating cricket scores. The application handles various cricket scenarios, including special cases like overthrows, no-balls, wides, and wickets. The system allows users to create matches, log scoring events, and view real-time match status.

Table of Contents
Technologies Used
Features
Setup
Usage
API Endpoints
Contributing
License
Technologies Used
Backend: Node.js, TypeScript, Express.js
Database: MongoDB
Frontend: React, Axios, React Router
Testing: Jest (for backend), React Testing Library (for frontend)
Features
Create and manage cricket matches
Log various scoring events (normal runs, no-balls, wides, etc.)
View current match status, including runs scored, wickets lost, and balls bowled
Real-time updates on match statistics
Simple and user-friendly interface
Setup
Prerequisites
Make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (for the backend)
npm or yarn (for package management)
Backend Setup
Navigate to the backend directory.
bash
Copy code
cd backend
Install the dependencies.
bash
Copy code
npm install
Create a .env file and configure your MongoDB connection string.

Start the backend server.

bash
Copy code
npm run dev
Frontend Setup
Navigate to the frontend directory.
bash
Copy code
cd frontend
Install the dependencies.
bash
Copy code
npm install
Start the frontend application.
bash
Copy code
npm start
Usage
Go to http://localhost:3000 in your web browser.
Use the Create Match form to set up a new match.
Once a match is created, you can log scoring events using the Log Scoring Event form.
View the current match status and statistics in real-time.
API Endpoints
Matches
POST /matches
Create a new match.
GET /matches/:id
Retrieve match details by ID.
Events
POST /events
Log a scoring event.
Teams (Optional)
GET /teams/:id/players
Retrieve players for a specific team.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.