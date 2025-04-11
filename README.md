An intelligent search engine enabling users to search via text, voice, or images. Built with React (Vite) and Tailwind CSS, and integrated with Hugging Face's AI models for enhanced search capabilities.
Features
Frontend

Framework: React with Vite for fast development and optimized builds.

Styling: Tailwind CSS for responsive, utility-first design.

Search Modalities:

    Text Search: Traditional keyword-based search.

    Voice Search: Utilizes the Web Speech API for speech recognition.

    Image Search:

    Upload images from your device.

    Paste image URLs.

    Crop and modify images before searching.

    Responsive Design: Ensures optimal user experience across devices.

    Search Results:

    Displays relevant images, tags, links, and descriptions.

    Multiple view options: map, video, news, etc.

Backend

    Framework: Node.js with Express for building RESTful APIs.

    AI Integration: Utilizes Hugging Face's Inference API for:

    Generating image prompts.

    Processing and analyzing search queries.

    Endpoints:

    /searchbyimage: Handles image file uploads.

    /searchbyurl: Processes image URLs.

    /searchbybase64: Accepts base64-encoded images.

    File Handling: Uses Multer for efficient file upload and management.

Project Structure

project-root/
├── client/                 # Frontend source code
│   ├── public/
│   └── src/
        ----Api
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── server/                 # Backend source code
│   ├── controllers/
│   ├── routes/
│   └── index.js
├── .env                    # Environment variables
├── package.json
└── README.md

Installation
Prerequisites

    Node.js v18 or higher

    npm or yarn

Clone the Repository

git clone https://github.com/yourusername/ai-search-engine.git
cd ai-search-engine

Setup Frontend

cd client
npm install
# or
yarn install

Setup Backend

cd ../server
npm install
# or
yarn install

Configuration

Create a .env file in both the client and server directories with the following variables:
Client .env

VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_CX=your_google_custom_search_engine_id
VITE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN;
VITE_AUTH_CLIENTID=YOUR_AUTH_CLIENTID

Server .env

HF_API_KEY=your_huggingface_api_key

Ensure that your .env files are added to .gitignore to prevent sensitive information from being pushed to version control.
Running the Application
Start Backend Server

cd server
npm run dev
# or
yarn dev

Start Frontend Development Server

cd client
npm run dev
# or
yarn dev

The frontend will be available at http://localhost:5173 and will communicate with the backend server running at http://localhost:5000.
Usage

    Navigate to the homepage.

    Choose your preferred search method:

    Enter text into the search bar.

    Click the microphone icon to initiate voice search.

    Upload an image or paste an image URL.

    View the search results displayed with relevant information and options.

Dependencies
Frontend

React

Vite

Tailwind CSS

React Router

Axios

Backend

Express

Multer

Axios

dotenv

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
License

This project is licensed under the MIT License
