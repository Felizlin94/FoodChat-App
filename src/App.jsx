import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage";
import { UserContext, userAccounts } from "./contexts/UserContext";

function App() {
  const user = userAccounts.find((account) => account.Username === "Anya");
  const [page, setPage] = useState("loginPage");
  const [currentAccount, setCurrentAccount] = useState(user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const citySelected = currentAccount.Info.citySelected;
  // const cuisineSelected = currentAccount.Info.cuisineSelected;
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);

  console.log("selectedCity", selectedCity);
  console.log("currentAccount", currentAccount);

  function handleToLoginPage() {
    setPage("loginPage");
  }

  function handleToMainPage() {
    setPage("mainPage");
  }

  function handleToChatPage() {
    setPage("chatPage");
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
      setSelectedCity(currentAccount.Info.citySelected);
      setSelectedCuisine(currentAccount.Info.cuisineSelected);
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
    <UserContext.Provider value={{ currentAccount }}>
      <div className="App">
        <button onClick={handleToChatPage}>ToChatPage</button>
        <button onClick={handleToLoginPage}>ToLoginPage</button>
        <button onClick={handleToMainPage}>ToMainPage</button>

        {page === "loginPage" && (
          <LoginPage
            onLoginClick={handleLoginClick}
            username={username}
            password={password}
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
          />
        )}
        {page === "mainPage" && (
          <MainPage
            onToChatPage={handleToChatPage}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
          />
        )}
        {page === "chatPage" && <ChatPage onChangePage={handleToMainPage} />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
