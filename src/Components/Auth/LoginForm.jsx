import "../FormStyles.css";
import { useFormik } from "formik";
import logo from "../../resources/logo/LOGO-SOMOS_MAS.png";
import img2 from "../../resources/logo/img2.png";

function LoginForm() {
  const RegexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){1,99}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const RegexPassword = /(?=^.{6,}$)(?=.[0-9])(?=.[A-Z])(?=.[a-z])(?=.[^A-Za-z0-9]).*/;
  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (values.email !== "" && !RegexEmail.test(values.email)) {
      errors.email = "Escribí un mail válido Ej: Nombre@siglo.com";
    }
    if (!values.email) {
      errors.email = "*Campo obligatorio";
    }
    if (values.password.length < 6) {
      errors.password = "*La contraseña debe contener al menos 6 dígitos";
    }
    if (values.password && !RegexPassword.test(values.password)) {
      errors.password =
        "*La contraseña debe tener una mayúscula, minúscula, un número";
    }
    if (!values.password) {
      errors.password = "*Campo obligatorio";
    }

    return errors;
  };

  const onSubmit = (event) => {

  };

  const formik = useFormik({ initialValues, validate, onSubmit }); //recibe al menos 3 argumentos.
  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <>
      <div id="welcome-text" className="no-display-mobile">
        <p>Bienvenido</p>
        <h2>¡Inicia sesión en tu cuenta!</h2>
      </div>
      <div className="container">
        <img src={logo} alt="logo" id="logo" />
        <div id="register">
          <form className="form-container" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Enter email"
            ></input>
            {errors.email && <div className="input-error">{errors.email}</div>}
            <input
              className="input-field"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter password"
            ></input> 
            {errors.password && <div className="input-error">{errors.password}</div>}
            <button className="submit-btn" type="submit">
              Log In
            </button>
            <p id='go-to-login'>¿No tienes cuenta?<a href='/register'>¡Registrate</a></p>
          </form>
          <img
            src={img2}
            alt="img-register"
            className="no-display-mobile"
            id="img-register"
          />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
