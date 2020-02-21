import React, { useState } from 'react';
import axios from "axios";

import './App.css';

function App() {
  const [username, setUsername] = useState("")
  const [tweets, setTweets] = useState([])
  const [error, setError] = useState("")

  const onClick = async () => {
    try {
      const response = await axios.post("/tweets", { username });

      if (response.data.error) throw new Error(response.data.error)
      const tweets = response.data.tweets
      setTweets(tweets)
      setError(false)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleOnChange = event => {
    const { value } = event.target;
    setUsername(value)
  }

  return (
    <div className="App">
      <input onChange={handleOnChange} value={username} onEnter></input>
      <button onClick={onClick}>submit</button>

      {
        error ? <div>{error}</div> :
          <ul>{
            tweets.map(tweet => {
              return (
                <li key={tweet.id}>
                  <span>{tweet.text}</span>
                  <span>{tweet.created_at}</span>
                </li>
              )
            })
          }</ul>
      }

    </div>
  );
}

export default App;
