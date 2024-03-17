const express = require('express');  
const cors = require('cors');  
const axios = require('axios');
require( 'dotenv').config();

 
const app = express();
app.use(express.json());   
app.use(cors({origin: true}));  

const CHAT_ENGINE_PROJECT_ID = process.env.CHAT_ENGINE_PROJECT_ID;
const CHAT_ENGINE_PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;
const CHAT_ENGINE_API_URL_CREATE = process.env.CHAT_ENGINE_API_URL_CREATE;
const CHAT_ENGINE_API_URL_GET = process.env.CHAT_ENGINE_API_URL_GET;

app.post("/signup", async (req, res) => {
    const { username, secret, email, first_name, last_name } = req.body;

    // Get or create user on Chat Engine
    try {
        const r = await axios.put(
            CHAT_ENGINE_API_URL_CREATE,
            { 
                username: username, secret: secret, email: email,
                first_name: first_name, last_name: last_name
            },
            {
                headers: {
                    "Private-Key": CHAT_ENGINE_PRIVATE_KEY
                } 
            }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});

app.post("/login", async (req, res) => {
    const { username, secret } = req.body;

    // Fetch this user from Chat Engine in this project
    try {
        const r = await axios.get(
            CHAT_ENGINE_API_URL_GET,
            {
                headers: {
                    "Project-ID": CHAT_ENGINE_PROJECT_ID,
                    "User-Name": username,
                    "User-Secret": secret
                }
            }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});

app.listen(3001);