import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./MessageHist.scss";

export default function MessageHistory({ messageHistory }) {
  return (
    <div className="message-history">
      {messageHistory.map((message, i) => {
        return (
          <Box
            key={i}
            className={`message-history__message ${
              message.role === "user"
                ? "message-history__message--user"
                : "message-history__message--assistant"
            }`}
          >
            <Paper elevation={3} className="message-history__message-paper">
              <h3
                className={`message-history__message-role ${
                  message.role === "user"
                    ? "message-history__message--question"
                    : "message-history__message--answer"
                }`}
              >
                {message.role === `user` ? "You" : "Chewy"}
              </h3>
              <p className="message-history__message-content">
                {message.content.split("---").map((line, i) => {
                  return (
                    <span key={i}>
                      <br />
                      {line}
                      <br />
                    </span>
                  );
                })}
              </p>
            </Paper>
          </Box>
        );
      })}
    </div>
  );
}
