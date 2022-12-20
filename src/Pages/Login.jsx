import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";
import { LoginForm } from "../Components/index";
import logo from "../Assets/logo-somos.png";
import img2 from "../Assets/img2.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInBackOffice } from "../Store/Reducers/headerReducer";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, userRole } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogged) {
      if (userRole === 1) {
        navigate("/backoffice");
        dispatch(setInBackOffice());
      } else {
        navigate("/");
      }
    }
  }, [dispatch, isLogged, navigate, userRole]);

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
