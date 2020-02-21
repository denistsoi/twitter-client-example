require("dotenv").config()

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

const Twit = require("twit");


const client = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000,
	strictSSL: true
})


app.use(express.json())

app.get("/", (req, res) => {
	res.write("I am an api")
})

app.post("/tweets", async (req, res) => {
	const username = req.body.username;

	try {
		const response = await client.get("statuses/user_timeline", { screen_name: username, count: 10 })

		res.json({
			error: null,
			length: response.data.length,
			tweets: response.data
		})
	} catch (error) {
		res.json({
			error: error.message
		})
	}
})


app.listen(PORT, () => {
	console.log(`API listening on port ${PORT}`)
})