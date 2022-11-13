import "../Components/FormStyles.css";
import LoginForm from "../Components/Auth/LoginForm";
import logo from "../Assets/logo-somos.png";
import img2 from "../Assets/img3.png";

function Login() {
  return (
    <div className="container">
      <img src={logo} alt="logo" id="logo" />
      <div className="register">
        <div className="register-form">
          <div className="no-display-mobile welcome-text">
            <p>Bienvenido</p>
            <h2>¡Inicia sesión en tu cuenta!</h2>
          </div>
          <LoginForm />
          <p id="go-to-login">¿No tienes cuenta?<a href="/register">¡Registrate</a></p>
        </div>
        <img src={img2} alt="img-register" className="no-display-mobile img-register"/>
      </div>
    </div>
  );
}

export default Login;
