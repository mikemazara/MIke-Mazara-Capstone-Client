import axios from "axios";
import React, { useEffect, useState } from "react";
import useSessionStorageState from "../functions/useSessioonStorageState";
import "./Diagnostics.scss";
import MessageHistory from "../message-history/MessageHistory";

const Diagnostics = ({ selectedModel, selectedMake, selectedYear }) => {
  const [messageHistory, setMessageHistory] = useSessionStorageState(
    "messages",
    []
  );
  const [promptState, setPromptState] = useSessionStorageState("prompt", "");
  const model = selectedModel;
  const make = selectedMake;
  const year = selectedYear;
  const handleChange = (e) => {
    setPromptState(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const newMessage = { role: "user", content: promptState };
    setPromptState("");
    setMessageHistory((messageHistory) => [...messageHistory, newMessage]);
    console.log(" after messageHistory setting", messageHistory);

    axios
      .post(`http://localhost:8080/chat`, {
        messageHistory: [...messageHistory, newMessage],
        model: model,
        make: make,
        year: year,
      })
      .then((res) => {
        setMessageHistory((messageHistory) => [...messageHistory, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    console.log("messageHistory", messageHistory);
  }, [messageHistory]);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container__card">
          <h2 className="home__container__card__title">
            Welcome to the Jungle.. of cars.. and tools n stuff.. yea
          </h2>
        </div>
        <MessageHistory messageHistory={messageHistory} />
        <div className="home__container__card">
          <label className="home__container__card__prompt-title">
            Car trouble?
          </label>
          <input
            className="home__container__card__prompt-input"
            type="text"
            placeholder="Wass yo probem"
            onChange={handleChange}
            value={promptState}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
