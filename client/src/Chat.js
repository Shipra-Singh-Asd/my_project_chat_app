import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div>
        <p className="welcome"><b>WELCOME TO CHAT YARD</b></p>
      </div>
      <div className="chat-header" id='rightInnerContainer'>
        <p><b>Get Talking      ,      Get Connected!</b>
        </p>
        <a href='/'>
                <h3 className='colo'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeGjVNQASmBroO1w7WVTdAUjPz41OiIrLlQ&usqp=CAU" height="30px" width="30px" alt="CLOSE"></img>  </h3>
            </a>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}><img src="https://cdn-icons-png.flaticon.com/512/2343/2343673.png" height="39px" weight="50px" object-fit="cover" alt="Send"/></button>
      </div>
    </div>
  );
}

export default Chat;