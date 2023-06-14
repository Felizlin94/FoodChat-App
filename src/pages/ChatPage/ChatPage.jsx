import { useState, useEffect, useContext } from "react";
import styles from "./ChatPage.module.scss";

import iconChatCat from "../../assets/icons/Icon_chatCat.svg";
import backArrow from "../../assets/icons/backArrow_chatroom.svg";
import addImage from "../../assets/icons/addImage.svg";
import iconSendMessage from "../../assets/icons/sendMessage.svg";
import addEmoji from "../../assets/icons/addEmoji.svg";

import io from "socket.io-client";
import { UserContext } from "../../contexts/UserContext";

function ChatPage({ onChangePage }) {
  const currentUser = useContext(UserContext);
  const currentAccount = currentUser.currentAccount;

  return (
    <div className={styles.container}>
      {/* <FriendList /> */}
      <Chatroom
        currentAccount={currentAccount}
        onBackArrowClick={onChangePage}
      />
    </div>
  );
}

function FriendList() {
  const currentUser = useContext(UserContext);

  // const usersname = "To Write";

  return (
    <div className={styles.friendList}>
      I'm {currentUser}
      {/* <InfoCard users={usersname} /> */}
    </div>
  );
}

function Chatroom({ currentAccount, onBackArrowClick }) {
  const [newMessage, setNewMessage] = useState("");
  const [messageBase, setMessageBase] = useState([]);
  // const [isSocketConnected, setIsSocketConnected] = useState(false);
  const socket = io("http://localhost:3001");
  // ,{  autoConnect: false}

  async function fetchMessages() {
    try {
      const response = await fetch("http://localhost:3001/messages");
      const data = await response.json();
      setMessageBase(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    // Fetch all stored messages from the server
    fetchMessages();

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    const handleReceivedMessage = (receivedMessagePack) => {
      setMessageBase((prevPacks) => [...prevPacks, receivedMessagePack]);
    };

    socket.on("message", handleReceivedMessage);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleSendMessage();
    }
  };

  const messagePack = {
    text: newMessage,
    username: currentAccount.Username,
    id: currentAccount.Id,
    socketID: socket.id,
  };

  function handleSendMessage() {
    if (newMessage) {
      setMessageBase([...messageBase, messagePack]);
      socket.emit("message", messagePack);
      setNewMessage("");
    }
  }

  // const connectSocket = () => {
  //   socket.connect();
  //   setIsSocketConnected(true);
  // };

  // const disconnectSocket = () => {
  //   socket.disconnect();
  //   setIsSocketConnected(false);
  // };

  return (
    <div className={styles.chatroom}>
      <AvatarAndName onBackArrowClick={onBackArrowClick} />
      <div className={styles.chatArea}>
        {messageBase.map((messages, index) =>
          messageBase.username === currentAccount.Username ? (
            <SelfMessage key={index} postNewMessage={messages.text} />
          ) : (
            <FriendMessage key={index} postNewMessage={messages.text} />
          )
        )}
      </div>
      <LaunchArea
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyPress}
      />
      {/* {isSocketConnected ? (
        <button onClick={disconnectSocket}>Disconnect</button>
      ) : (
        <button onClick={connectSocket}>Connect</button>
      )} */}
    </div>
  );
}

// FriendList related components
function InfoCard({ users }) {
  return (
    <>
      <div className={styles.infoCard}>{users}</div>;
    </>
  );
}

// Chatroom related components
function AvatarAndName({ onBackArrowClick }) {
  return (
    <div className={styles.avatarAndName}>
      <img
        className={styles.backArrow}
        src={backArrow}
        alt="back-arrow"
        onClick={onBackArrowClick}
      />
      <img className={styles.avatar} src={iconChatCat} alt="avatar" />
      <span className={styles.name}>Anna</span>
    </div>
  );
}

function SelfMessage({ postNewMessage }) {
  return (
    <div className={styles.selfMessage}>
      <div className={styles.message}>{postNewMessage}</div>
      <div className={styles.sentTime}>7:07PM</div>
    </div>
  );
}
function FriendMessage({ postNewMessage }) {
  return (
    <div className={styles.friendMessage}>
      <img className={styles.avatar} src={iconChatCat} alt="avatar" />
      <div className={styles.messageAndTime}>
        <div className={styles.message}>{postNewMessage}</div>
        <div className={styles.sentTime}>8:08PM</div>
      </div>
    </div>
  );
}

function LaunchArea({ newMessage, setNewMessage, onSendMessage, onKeyDown }) {
  return (
    <div className={styles.launchArea}>
      <img className={styles.addImage} src={addImage} alt="avatar" />
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <img
        className={styles.sendMessage}
        src={iconSendMessage}
        alt="avatar"
        onClick={onSendMessage}
      />
      <img className={styles.addEmoji} src={addEmoji} alt="avatar" />
    </div>
  );
}

export default ChatPage;
