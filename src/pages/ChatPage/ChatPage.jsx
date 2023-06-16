import { useState, useEffect, useContext } from "react";
import styles from "./ChatPage.module.scss";

import iconChatCat from "../../assets/icons/Icon_chatCat.svg";
import backArrow from "../../assets/icons/backArrow_chatroom.svg";
import addImage from "../../assets/icons/addImage.svg";
import iconSendMessage from "../../assets/icons/sendMessage.svg";
import addEmoji from "../../assets/icons/addEmoji.svg";

import io from "socket.io-client";
import { UserContext, userAccounts } from "../../contexts/UserContext";

function ChatPage({ onChangePage }) {
  const currentUser = useContext(UserContext);
  const currentAccount = currentUser.currentAccount;

  return (
    <div className={styles.container}>
      <FriendList currentAccount={currentAccount} userAccounts={userAccounts} />
      <Chatroom
        currentAccount={currentAccount}
        onBackArrowClick={onChangePage}
      />
    </div>
  );
}

function FriendList({ currentAccount, userAccounts, onViewProfile }) {
  const friendNumber = userAccounts.length - 1;

  return (
    <div className={styles.friendList}>
      <p> Hi! {currentAccount.Username}</p>
      <p>You have {friendNumber} friends</p>
      <button onClick={onViewProfile}>View profiles</button>
      <InfoCard user={userAccounts[1]} />
    </div>
  );
}

function Chatroom({ currentAccount, onBackArrowClick }) {
  const [newMessage, setNewMessage] = useState("");
  const [messageBase, setMessageBase] = useState([]);
  const socket = io("http://localhost:3001");
  // const socket = io("http://localhost:3001", { autoConnect: false });

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
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    // Fetch all stored messages from the server
    fetchMessages();

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    const receiveMessage = (receivedMessagePack) => {
      setMessageBase((prev) => [...prev, receivedMessagePack]);
    };

    socket.on("message", receiveMessage);

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
      socket.emit("message", messagePack);
      setNewMessage("");
    }
  }

  return (
    <div className={styles.chatroom}>
      <AvatarAndName onBackArrowClick={onBackArrowClick} />
      <div className={styles.chatArea}>
        {messageBase.map((messages, index) =>
          messages.username === currentAccount.Username ? (
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
    </div>
  );
}

// FriendList related components
function InfoCard({ user }) {
  return (
    <>
      <div className={styles.infoCard}>
        <div className={styles.info}>{user.Username}</div>
        <div className={styles.aboutMe}>{user.Info.aboutMe}</div>
        <div className={styles.pickedTags}>
          {user.Info.citySelected}
          {user.Info.cuisineSelected}
        </div>
      </div>
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
