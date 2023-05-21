import styles from "./LoginPage.module.scss";

// SVG檔案
import foodchatLOGO from "../../assets/icons/foodchat_LOGO_yellow.svg";
import logoGoogle from "../../assets/icons/Logo_Google.svg";
import logoInstagram from "../../assets/icons/Logo_Instagram.svg";

// Sign In With Google
import { GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  return (
    <div className={styles.container}>
          <img className={styles.foodchatLOGO} src={foodchatLOGO} alt="foodchatLOGO" />
      <GoogleLoginArea />
      <InstagramLoginArea />
      <VisitorNav />
    </div>
  );
}

function GoogleLoginArea() {
  return (
    <>
      <div className={styles.googleLoginArea}>
        <div className={styles.loginTitle}>
          使用
          <img src={logoGoogle} alt="Google" />
          登入
        </div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          type="icon"
          onError={() => {
            console.log("Login Failed");
          }}
          // useOneTap
        />
      </div>
    </>
  );
}

function InstagramLoginArea() {
  return (
    <>
      <div className={styles.instagramLoginArea}>
        <div className={styles.loginTitle}>
          使用
          <img src={logoInstagram} alt="Instagram" />
          登入
        </div>
      </div>
    </>
  );
}

function VisitorNav() {
  return <div className={styles.visitorNav}>還沒有帳號？先逛逛</div>;
}

export default LoginPage;
