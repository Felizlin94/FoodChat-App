import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage";
import { UserContext, userAccounts } from "./contexts/UserContext";

// Sign In With Google
// import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [page, setPage] = useState("loginPage");
  const [currentAccount, setCurrentAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleToLoginPage() {
    setPage("loginPage");
  }

  function handleToMainPage() {
    setPage("mainPage");
  }

  function handleToChatPage() {
    setPage("chatPage");
    console.log("currentAccount:", currentAccount);
  }

  ///////////// Login related functions  /////////////
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLoginClick() {
    const findMeetUsernameAccount = userAccounts.filter(
      (account) => account.Username === username
    );
    const findMeetPasswordAccount = findMeetUsernameAccount.filter(
      (account) => account.Password === password
    );

    if (findMeetPasswordAccount.length !== 0) {
      setCurrentAccount(findMeetPasswordAccount[0]);
      console.log(
        "Login Success, Welcome",
        findMeetPasswordAccount[0].Username
      );
      setTimeout(() => {
        setPage("mainPage");
      }, 50);
    } else {
      alert("Invalid Username or Password");
    }
  }

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUsername("");
  //   setPassword("");
  // };

  return (
    // <GoogleOAuthProvider clientId="783354130612-3gp8k8fhg8povfqqh9jf09s8rio6bg6m.apps.googleusercontent.com">
    <UserContext.Provider value={{ currentAccount }}>
      <div className="App">
        <button onClick={handleToChatPage}>ToChatPage</button>
        <button onClick={handleToLoginPage}>ToLoginPage</button>

        {page === "loginPage" && (
          <LoginPage
            onLoginClick={handleLoginClick}
            username={username}
            password={password}
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
          />
        )}
        {page === "mainPage" && <MainPage onToChatPage={handleToChatPage} />}
        {page === "chatPage" && <ChatPage onChangePage={handleToMainPage} />}
      </div>
    </UserContext.Provider>
    // </GoogleOAuthProvider> >
  );
}

export default App;
