import axios from "axios";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import useSessionStorageState from "../functions/useSessioonStorageState";
import MessageHistory from "../message-history/MessageHistory";
import "./Diagnostics.scss";

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

  useEffect(() => {
    console.log("messageHistory", messageHistory);
  }, [messageHistory]);

  return (
    <div className="diag">
      <div className="diag__container">
        <div className="diag__container__nav">
          <NavLink
            className="diag__container__nav__link"
            to="/"
            activeClassName="diag__container__nav__link--active"
          >
            Back
          </NavLink>
        </div>
        <div className="diag__container__card">
          <h2 className="diag__container__card__title">
            {selectedYear} {selectedMake} {selectedModel}
          </h2>
        </div>
        <MessageHistory messageHistory={messageHistory} />
        <div className="diag__container__card">
          <label className="diag__container__card__prompt-title">
            Car trouble?
          </label>
          <input
            className="diag__container__card__prompt-input"
            type="text"
            placeholder="Pocket mechanic at your service!"
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
