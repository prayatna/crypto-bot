import express from "express";
import axios from 'axios';
import dotenv from "dotenv";
import { WebClient }  from "@slack/web-api"
import { createEventAdapter } from "@slack/events-api";

// initialize configuration
dotenv.config();
const port = parseInt(process.env.PORT, 10);

const app = express();
app.use( express.json() );

const slackEvents = createEventAdapter(process.env.SIGNING_KEY);
const token = process.env.BOT_USER_ACCESS_TOKEN;
const web = new WebClient(token);

app.get("/", ((req:any, res:any) => res.send("Hello World!")));
app.use("/events", slackEvents.expressMiddleware());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on("message", (event:any) => {
	console.log(
		`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
	);
	console.log(event);
	(async () => {
		if (!event.bot_id) {
			// See: https://api.slack.com/methods/chat.postMessage
			const res = await web.chat.postMessage({
				channel: event.channel,
				text: ":wave: Hello there!"
			});

			// `res` contains information about the posted message
			console.log("Message sent: ", res.ts);
		}
	})();
});

// Handle errors (see `errorCodes` export)
slackEvents.on("error", console.error);

// Start a basic HTTP server
slackEvents.start((port)).then(()=> {
	console.log(`server listening on port ${port}`);
});
