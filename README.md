# NoteApp

A collaborative MERN-stack note-taking app featuring JWT authentication, rich-text editing, and full-text search.

## Features
* **User Authentication:** Secure signup and login using JSON Web Tokens (JWT).
* **Rich-Text Editing:** Create and format notes with a rich-text interface.
* **Full-Text Search:** Quickly search through note titles and content to find what you need.
* **Collaborative:** Notes can be shared amoung others and enable view and edit features for others.

## Tech Stack
* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose

## Prerequisites
Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js](https://nodejs.org/en/) and npm/yarn.
* You have a MongoDB database running locally or a connection string for MongoDB Atlas.

## Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file. You can use the provided `.env.example` file as a template.

**Backend Variables:**
* `PORT` - The port your server will run on (e.g., 5000)
* `MONGO_URI` - Your MongoDB connection string
* `JWT_SECRET` - Your secret key for signing JSON Web Tokens

**Frontend Variables (if applicable):**
* `VITE_SERVER_URL` - The URL of your backend server (e.g., http://localhost:5000)

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/NoteApp.git](https://github.com/your-username/NoteApp.git)
   cd NoteApp
2. **Install Backend Dependencies:**
   ```bash
   cd server  # or your backend folder name
   npm install
3. **Install Frontend Dependencies:**
   ```bash
   cd ../client  # or your backend folder name
   npm install
4. **Setup Environment Variables**
   ```
   Create a .env file in the root of your backend directory.
   Copy the variables from .env.example into your new .env file and fill in your actual database URI and JWT secret.
5. **Run the application**

   Start the backend server:
   ```
   cd server
   npm run dev
   ```

   Start the frontend client:
   ```
   cd client
   npm run dev
   ```

**Author**
  
  Isuru Prabhath Kulasooriya



