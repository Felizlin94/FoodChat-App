import styles from "./LoginPage.module.scss";
// SVG檔案
import foodchatLOGO from "../../assets/icons/foodchat_LOGO_bread.svg";
import { useState } from "react";
import { userAccounts } from "../../contexts/UserContext";
// import logoGoogle from "../../assets/icons/Logo_Google.svg";
// import logoInstagram from "../../assets/icons/Logo_Instagram.svg";

// Sign In With Google
// import { GoogleLogin } from "@react-oauth/google";

function LoginPage({
  onLoginClick,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
}) {
  const [showCreateUserArea, setShowCreateUserArea] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  ///////////// Create account related functions /////////////
  function handleNewUsernameChange(event) {
    setNewUsername(event.target.value);
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  function handleCreateAccountClick() {
    if (newUsername.length && newPassword.length !== 0) {
      let index = userAccounts.length + 1;

      userAccounts.push({
        Index: index,
        Username: newUsername,
        Password: newPassword,
      });
      setShowCreateUserArea(false);
      setNewUsername("");
      setNewPassword("");
    } else {
      return;
    }
  }

  // 在進行登入時，收合創建使用者之區域
  function handleOnLoginArea() {
    setShowCreateUserArea(false);
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.foodchatLOGO}
        src={foodchatLOGO}
        alt="foodchatLOGO"
      />
      {/* <GoogleLoginArea /> */}
      {/* <InstagramLoginArea /> */}

      <LoginArea
        onLoginClick={onLoginClick}
        username={username}
        password={password}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onLoginArea={handleOnLoginArea}
      />
      <CreateAccountArea
        newUsername={newUsername}
        newPassword={newPassword}
        onNewUsernameChange={handleNewUsernameChange}
        onNewPasswordChange={handleNewPasswordChange}
        onCreateAccountClick={handleCreateAccountClick}
        showCreateUserArea={showCreateUserArea}
        setShowCreateUserArea={setShowCreateUserArea}
      />
    </div>
  );
}

// function GoogleLoginArea() {
//   return (
//     <>
//       <div className={styles.googleLoginArea}>
//         <div className={styles.loginTitle}>
//           使用
//           <img src={logoGoogle} alt="Google" />
//           登入
//         </div>
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             console.log(credentialResponse);
//           }}
//           type="icon"
//           onError={() => {
//             console.log("Login Failed");
//           }}
//           // useOneTap
//         />
//       </div>
//     </>
//   );
// }

// function InstagramLoginArea() {
//   return (
//     <>
//       <div className={styles.instagramLoginArea}>
//         <div className={styles.loginTitle}>
//           使用
//           <img src={logoInstagram} alt="Instagram" />
//           登入
//         </div>
//       </div>
//     </>
//   );
// }

// Login Area

function LoginArea({
  onLoginClick,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLoginArea,
}) {
  return (
    <div className={styles.loginArea} onClick={onLoginArea}>
      <div className={styles.inputInfo}>
        Username :
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div className={styles.inputInfo}>
        Password :
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>

      <div className={styles.loginBtn} onClick={onLoginClick}>
        Login to Chat
      </div>
    </div>
  );
}

// Create Account Area
function CreateAccountArea({
  onCreateAccountClick,
  showCreateUserArea,
  setShowCreateUserArea,
  newUsername,
  newPassword,
  onNewUsernameChange,
  onNewPasswordChange,
}) {
  function handleCreateAccountClick() {
    if (showCreateUserArea) {
      setShowCreateUserArea(false);
    } else {
      setShowCreateUserArea(true);
    }
  }

  return (
    <div className={styles.createAccountArea}>
      <div
        className={styles.createAccountBtn}
        onClick={handleCreateAccountClick}
      >
        Newcomer? Create your account in 1 minute
      </div>

      {showCreateUserArea && (
        <div className={styles.createUserInfo}>
          <div>
            Set username:
            <input
              type="text"
              placeholder="Username"
              value={newUsername}
              onChange={onNewUsernameChange}
            />
          </div>
          <div>
            Set password:
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={onNewPasswordChange}
            />
          </div>
          <button onClick={onCreateAccountClick}>Create account</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
