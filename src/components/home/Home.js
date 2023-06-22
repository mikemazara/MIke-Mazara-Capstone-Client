import axios from "axios";
import React, { useState } from "react";
import "./Home.scss";

const Home = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [promptState, setPromptState] = useState("");

  const handlePrompt = (e) => {
    if (e.key === "Enter") {
      const currentPrompt = e.target.value;
      setPromptState(currentPrompt);

      axios
        .post(`http://localhost:8080/chat`, {
          prompt: currentPrompt,
        })
        .then((res) => {
          console.log(res.data);
          setMessageHistory((prevMessageHistory) => [
            ...prevMessageHistory,
            { question: currentPrompt, response: res.data.content },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });

      e.target.value = "";
    }
  };

  console.log(messageHistory);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container__card">
          <h2 className="home__container__card__title">
            Welcome to the Jungle.. of cars.. and tools n stuff.. yea
          </h2>
        </div>
        <div className="home__container__card">
          <label className="home__container__card__prompt-title">
            Car trouble?
          </label>
          <input
            className="home__container__card__prompt-input"
            type="text"
            placeholder="Wass yo probem"
            onKeyDown={handlePrompt}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
