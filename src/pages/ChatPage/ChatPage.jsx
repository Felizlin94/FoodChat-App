import { useState } from "react";
import styles from "./ChatPage.module.scss";

import iconChatCat from "../../assets/icons/Icon_chatCat.svg";
import backArrow from "../../assets/icons/backArrow_chatroom.svg";
import addImage from "../../assets/icons/addImage.svg";
import sendMessage from "../../assets/icons/sendMessage.svg";
import addEmoji from "../../assets/icons/addEmoji.svg";

function ChatPage() {
  return (
    <div className={styles.container}>
      {/* <FriendList /> */}
      <Chatroom />
    </div>
  );
}

function FriendList() {
  return (
    <div className={styles.friendList}>
      <InfoCard />
    </div>
  );
}

function Chatroom() {
  return (
    <div className={styles.chatroom}>
      <AvatarAndName />
      <ChatArea />
      <LaunchArea />
    </div>
  );
}
// FriendList related components
function InfoCard() {
  return <div className={styles.infoCard}>InfoCard</div>;
}

// Chatroom related components
function AvatarAndName() {
  return (
    <div className={styles.avatarAndName}>
      <img className={styles.backArrow} src={backArrow} alt="back-arrow" />
      <img className={styles.avatar} src={iconChatCat} alt="avatar" />
      <span className={styles.name}>Anna</span>
    </div>
  );
}
function ChatArea() {
  return (
    <div className={styles.chatArea}>
      <SelfMessage />
      <FriendMessage />
      <SelfMessage />
      <FriendMessage />
      <SelfMessage />
      <FriendMessage />
      <SelfMessage />
      <FriendMessage />
      <SelfMessage />
      <FriendMessage />
      <SelfMessage />
      <FriendMessage />
    </div>
  );
}

function SelfMessage() {
  return (
    <div className={styles.selfMessage}>
      <div className={styles.message}>
        Hello! <br /> You
      </div>

      <div className={styles.sentTime}>7:07PM</div>
    </div>
  );
}
function FriendMessage() {
  return (
    <div className={styles.friendMessage}>
        <img className={styles.avatar} src={iconChatCat} alt="avatar" />
      <div className={styles.messageAndTime}>
        <div className={styles.message}>
          Hello World!
        </div>
      <div className={styles.sentTime}>8:08PM</div>
      </div>
    </div>
  );
}

function LaunchArea() {
  return <div className={styles.launchArea}>
        <img className={styles.addImage} src={addImage} alt="avatar" />
        <input />
        <img className={styles.sendMessage} src={sendMessage} alt="avatar" />
        <img className={styles.addEmoji} src={addEmoji} alt="avatar" />


  </div>;
}

export default ChatPage;
