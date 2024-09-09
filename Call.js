const express = require('express');
const twilio = require('twilio');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);

// PostgreSQL client setup
const dbClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

dbClient.connect();

// Function to make the call
app.post('/call', async (req, res) => {
  const { phoneNumber } = req.body; // Ensure req.body is parsed properly

  if (!phoneNumber) {
    return res.status(400).send('Phone number is required');
  }

  try {
    const call = await twilioClient.calls.create({
      url: 'http://localhost:3000/question', // Twilio will request this URL for call instructions
      to: `+91${phoneNumber}`, // Indian phone number
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio number
    });
    
    res.status(200).send(`Call initiated: ${call.sid}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error making call');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
