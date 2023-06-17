import { useState, useEffect, useContext } from "react";
import styles from "./ChatPage.module.scss";

import iconChatCat from "../../assets/icons/Icon_chatCat.svg";
import backArrow from "../../assets/icons/backArrow_chatroom.svg";
import genderBoy from "../../assets/icons/gender_boy.svg";
import genderGirl from "../../assets/icons/gender_girl.svg";
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
      <FriendList currentAccount={currentAccount} />
      <Chatroom
        currentAccount={currentAccount}
        onBackArrowClick={onChangePage}
      />
    </div>
  );
}

function FriendList({ currentAccount, onViewProfile }) {
  const friendNumber = userAccounts.length - 1;
  const [profileVisible, setProfileVisible] = useState(false);

  function handleViewProfile() {
    setProfileVisible(!profileVisible);
  }

  return (
    <div className={styles.friendList}>
      <span> Hi! {currentAccount.Username}</span>
      <span>You have {friendNumber} friends</span>
      <button onClick={handleViewProfile}>
        {profileVisible ? "Hide profiles" : "View profiles"}
      </button>
      {profileVisible &&
        userAccounts
          .filter((user) => user.Id !== currentAccount.Id)
          .map((user) => <InfoCard key={user.Id} user={user} />)}
    </div>
  );
}

// FriendList related component
function InfoCard({ user }) {
  return (
    <>
      <div className={styles.infoCard}>
        <div className={styles.info}>
          {user.Username}
          <div className={styles.moreInfo}>
            <img
              src={user.Info.gender === "girl" ? genderGirl : genderBoy}
              alt="gender"
            />
            <span>{user.Info.age},</span>
            <span>{user.Info.MBTI}</span>
          </div>
        </div>
        <div className={styles.aboutMe}>{user.Info.aboutMe}</div>
        <div className={styles.pickedTags}>
          <div className={styles.cityTags}>
            {user.Info.citySelected.map((city, index) => {
              return (
                <div className={styles.tag} key={index}>
                  {city}
                </div>
              );
            })}
          </div>
          <div className={styles.cuisineTags}>
            {user.Info.cuisineSelected.map((cuisine, index) => {
              return (
                <div className={styles.tag} key={index}>
                  {cuisine}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
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

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const messagePack = {
    text: newMessage,
    username: currentAccount.Username,
    id: currentAccount.Id,
    socketID: socket.id,
    sendingTime: getCurrentTime(),
  };

  function handleSendMessage() {
    if (newMessage) {
      socket.emit("message", messagePack);
      setNewMessage("");
    }
  }

  return (
    <div className={styles.chatroom}>
      <img
        className={styles.backArrow}
        src={backArrow}
        alt="back-arrow"
        onClick={onBackArrowClick}
      />
      <div className={styles.OtherAvatarName}>
        {userAccounts
          .filter((account) => account.Id !== currentAccount.Id)
          .map((account) => (
            <AvatarAndName
              key={account.Id}
              onBackArrowClick={onBackArrowClick}
              otherAvatar={account.Info.avatar}
              otherUsername={account.Username}
            />
          ))}{" "}
      </div>

      <div className={styles.chatArea}>
        {messageBase.map((messages, index) => {
          const senderAccount = userAccounts.find(
            (account) => account.Id === messages.id
          );
          return messages.id === currentAccount.Id ? (
            <SelfMessage
              key={index}
              postNewMessage={messages.text}
              sendingTime={messages.sendingTime}
            />
          ) : (
            <FriendMessage
              key={index}
              postNewMessage={messages.text}
              sendingTime={messages.sendingTime}
              userAvatar={senderAccount.Info.avatar}
            />
          );
        })}
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

// Chatroom related components
function AvatarAndName({ otherAvatar, otherUsername }) {
  return (
    <div className={styles.avatarAndName}>
      <img className={styles.avatar} src={otherAvatar} alt="avatar" />
      <span className={styles.name}>{otherUsername}</span>
    </div>
  );
}

function SelfMessage({ postNewMessage, sendingTime }) {
  return (
    <div className={styles.selfMessage}>
      <div className={styles.message}>{postNewMessage}</div>
      <div className={styles.sendingTime}>{sendingTime}</div>
    </div>
  );
}
function FriendMessage({ postNewMessage, sendingTime, userAvatar }) {
  return (
    <div className={styles.friendMessage}>
      <img className={styles.avatar} src={userAvatar} alt="avatar" />
      <div className={styles.messageAndTime}>
        <div className={styles.message}>{postNewMessage}</div>
        <div className={styles.sendingTime}>{sendingTime}</div>
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
