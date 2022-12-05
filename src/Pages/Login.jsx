import "./LoginStyles.css";
import LoginForm from "../Components/Auth/LoginForm";
import logo from "../Assets/logo-somos.png";
import img2 from "../Assets/img2.png";

function Login() {
  return (
    <div>
      <img src={logo} alt="logo" className="logo-login" />
      <div className="login">
        <div className="login-form">
          <div className="no-display-mobile welcome-text">
            <p>Bienvenido</p>
            <h2>¡Inicia sesión en tu cuenta!</h2>
          </div>
          <LoginForm />
          <p className="go-to-log">
            ¿No tienes cuenta?<a href="/register"> ¡Registrate!</a>
          </p>
        </div>
        <img
          src={img2}
          alt="img-login"
          className="no-display-mobile img-login"
        />
      </div>
    </div>
  );
}

export default Login;
