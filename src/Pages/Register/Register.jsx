import { RegisterForm } from "../../Components/Auth/RegisterForm";
import logo from "../../Assets/logo-somos.png";
import background from "../../Assets/img3.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  return (
    <div>
      <img src={logo} alt="logo" className="logo-login-register" />
      <div className="login-register">
        <div className="login-register-form">
          <div className="welcome-text no-display-mobile">
            <p>Bienvenido</p>
            <h2>¡Registra una cuenta!</h2>
          </div>
          <RegisterForm />
          <p className="go-to-login-register">
            ¿Ya tenés una cuenta? <a href="/login">¡Ingresa!</a>
          </p>
        </div>
        <img
          src={background}
          alt="img-register"
          className="no-display-mobile img-login-register"
        />
      </div>
    </div>
  );
};
