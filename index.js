require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express();
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SIGNING_KEY);
const port = process.env.PORT || 8090;


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/events', slackEvents.expressMiddleware());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});

