# Project GenMedix
- By Team DevTitans

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tools](#tools)
- [Backend Installation](#backend-installation)
- [Credentials](#credentials)
- [Running_the_Application](#running-the-application)
- [API_Endpoints](#api-endpoints)
- [Contact](#contact)

## Introduction
This project sets up an API using FastAPI to interact with a Generative AI model. The model, configured with specific settings, serves as a mental health assistant named Eliza, capable of engaging in supportive and empathetic conversations.

## Features
- Interactive Chat: Users can ask questions and receive responses from Eliza.
- Configured Model: The AI model is fine-tuned with safety settings and specific parameters to ensure quality and safety.

## Tools
# Libraries and Frameworks:
- FastAPI: The main class to create the FastAPI application.
- CORSMiddleware: Middleware to handle Cross-Origin Resource Sharing (CORS) policies.
- uvicorn: An ASGI server used to run the FastAPI application.
- google.generativeai: A module from Google's generative AI library.

## Backend Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/DATICAN-UNDERGRADUATES-COMPETITION/GenMedix.git
    ```
2. Navigate to the project directory:
    ```bash
    cd GenMedix
    ```
    Step 1 and 2 would have been completed using information from the general README file.
3. Navigate to the genmedix_backend directory once you are in the GenMedix folder:
    ```bash
    cd genmedix_backend
    ```
4. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```


## Credentials
You'll need to get these api keys:
- Gemini API key: https://aistudio.google.com

Add it to line 8 of the code:
GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"

## Running_the_Application
1. Start the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
    make sure the port is runned on port 8000

2. Access the API:
- Open your browser and go to http://localhost:8000/docs to view the automatically generated API documentation and test the endpoints.


## API_Endpoints
1. Get Chat History:

- GET /chat_history
Retrieves the chat history.

2. Ask a Question:

- POST /chat
Sends a question to Eliza and receives a response.
Request Body:
json
{
  "question": "Your question here"
}


## Contact
For any questions or feedback, please contact us at [samuelajala01@gmail.com] or [igedavid01@gmail.com].

### Team DevTitans
- [David Ige](https://github.com/defdave)
- [Samuel Ajala](https://github.com/samuelajala01)
