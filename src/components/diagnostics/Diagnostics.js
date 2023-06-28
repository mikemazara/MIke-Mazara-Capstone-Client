import axios from "axios";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useSessionStorageState from "../functions/useSessioonStorageState";
import MessageHistory from "../message-history/MessageHistory";

const Diagnostics = ({ selectedModel, selectedMake, selectedYear }) => {
  const [messageHistory, setMessageHistory] = useSessionStorageState(
    "messages",
    []
  );
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    if (promptState.toLowerCase() === "thanks") {
      window.location.href = "http://localhost:3000/contact";
    }

    const newMessage = { role: "user", content: promptState };
    setPromptState("");
    setMessageHistory((messageHistory) => [...messageHistory, newMessage]);

    axios
      .post(`http://localhost:8080/chat`, {
        messageHistory: [...messageHistory, newMessage],
        model: model,
        make: make,
        year: year,
      })
      .then((res) => {
        setIsLoading(false);
        setMessageHistory((messageHistory) => [...messageHistory, res.data]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const deleteMessageHistory = () => {
    setMessageHistory([]);
  };

  return (
    <div className="diag__container">
      <div className="diag__container__nav">
        <NavLink
          className="diag__container__nav__link"
          to="/"
          activeclassname="diag__container__nav__link--active"
        >
          Back
        </NavLink>
        <button
          onClick={deleteMessageHistory}
          className="diag__container__clear-button"
        >
          Clear
        </button>
      </div>
      <div className="diag__container__card">
        <h2 className="diag__container__card__title">
          {selectedYear} {selectedMake} {selectedModel}
        </h2>
      </div>
      <MessageHistory messageHistory={messageHistory} />
      <div className="diag__container__card diag__container__card--input">
        {isLoading && (
          <div className="diag__container__card">
            <h2>Ghhhhrararararara.. Loading.. </h2>
          </div>
        )}
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Ask a question"
            variant="filled"
            value={promptState}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="diag__container__card__input"
          />
        </Box>
      </div>
    </div>
  );
};

export default Diagnostics;
