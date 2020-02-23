import React, { useState } from 'react';
import axios from "axios";
import "./styles/app.css";

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
    <div className="App bg-gray-100 p-4 h-full h-screen overflow-auto">
      <div className="pt-4 pb-4 bg-gray-100 flex border-b sticky w-full top-0">
        <input className="w-full mr-2 border border-gray-500" onChange={handleOnChange} value={username}></input>
        <button className="w-1/3 bg-green-600 text-gray-200" onClick={onClick}>Submit</button>
      </div>

      <div className="container overflow-scroll">
        {/* todo: list component */}
        {
          error ? <div>{error}</div> :
            <ul>{
              tweets.map(tweet => {
                return (
                  <li className="border w-full mt-2 mb-8 p-2 bg-gray-100" key={tweet.id}>
                    <span className="">"{tweet.text}"</span>
                    <div>
                      <span className="text-sm">Posted at: {tweet.created_at}</span>
                    </div>

                  </li>
                )
              })
            }</ul>
        }
      </div>

    </div>
  );
}

export default App;
