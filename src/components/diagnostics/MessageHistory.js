import "./MessageHist.scss";

export default function MessageHistory({ messageHistory }) {
  return (
    <div className="message-history">
      {messageHistory.map((message, i) => {
        return (
          <div
            key={i}
            className={`message-history__message ${
              message.role === "user"
                ? "message-history__message--user"
                : "message-history__message--assistant"
            }`}
          >
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
          </div>
        );
      })}
    </div>
  );
}
