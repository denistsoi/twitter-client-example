const Twit = require("twit");

const client = new Twit({
  consumer_key: process.env.CONSUMER_KEY || "M9sH0OSwidJ3tK2c2Y5gpQa8U",
  consumer_secret: process.env.CONSUMER_SECRET || "HCYTKAUGYiaEVMOG2jj0LLP9RuvOdCUCue98l9N8mkgbdlo3m1",
  access_token: process.env.ACCESS_TOKEN || "7207442-GFHbOBcY9LCkrzQhkcuuwtUULOwbZMoGiAjAFzzdUO",
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || "t21nEWlLuNKh0cvwlcP3dvyPOA6tnM7Dee4hPHF1FDGPS",
  timeout_ms: 60 * 1000,
  strictSSL: true
})

const Tweets = async (req, res) => {
  const username = req.body.username;

  try {
    const response = await client.get("statuses/user_timeline", { screen_name: username, count: 10 })

    res.json({
      error: null,
      length: response.data.length,
      tweets: response.data
    })
  } catch (error) {

    res.status(400).json({
      error: error.message
    })
    return
  }
}

module.exports = Tweets