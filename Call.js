const express = require('express');
const twilio = require('twilio');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json()); // Add this middleware
app.use(express.urlencoded({ extended: true })); // Add this for Twilio's form data

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
app.post('/call', async (req, res) => {
  const { phoneNumber } = req.body;

  // Log the incoming request for debugging
  console.log('Request body:', req.body);

  try {
    const call = await twilioClient.calls.create({
      url: 'http://54.208.14.108/question', // Make sure this is publicly accessible
      to: `+91${phoneNumber}`, // Indian phone number
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio number
    });

    res.status(200).send(`Call initiated: ${call.sid}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error making call');
  }
});

// Twilio will hit this endpoint to ask the question
app.post('/question', (req, res) => {
  console.log('Twilio Request:', req.body); // Log Twilio request for debugging

  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say('what task did uou do today');
  twiml.record({
    action: '/store-answer', // Where the recorded answer will be sent
    finishOnKey: '#',
    maxLength: 10
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

// Store the response in the database
app.post('/store-answer', async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const phoneNumber = req.body.From;

  try {
    const query = 'INSERT INTO responses (phone_number, answer) VALUES ($1, $2)';
    await dbClient.query(query, [phoneNumber, recordingUrl]);

    res.status(200).send('Answer stored successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing answer');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});