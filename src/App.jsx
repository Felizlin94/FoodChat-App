import "./App.css";
// import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage.jsx";
// import ChatPage from "./pages/ChatPage/ChatPage";


// Sign In With Google
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <GoogleOAuthProvider clientId="783354130612-3gp8k8fhg8povfqqh9jf09s8rio6bg6m.apps.googleusercontent.com">
      <div className="App">
        {/* <LoginPage /> */}
        <MainPage />
       {/*<ChatPage /> */}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
