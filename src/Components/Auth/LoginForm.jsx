
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "../FormStyles.css";

const LoginForm = () => {
    const navegar = useNavigate();

    const RegexEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){1,99}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const RegexPassword = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$ %^&*-]).{6,}$/;
  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (values.email !== "" && !RegexEmail.test(values.email)) {
        errors.email = "Escribi un mail válido Ej: Nombre@siglo.com";
    }
    if (!values.email) {
      errors.email = "*Campo obligatorio";
    }
    if (!values.password && !RegexPassword.test(values.password)) {
        errors.password = "*La contraseña debe tener una mayúscula, minúscula, un número y un caracter (+,-,_$,)";
     }
    if (!values.password) {
      errors.password = "*Campo obligatorio";
    }
    
    
    return errors;
  };

  const onSubmit = (event) => {

    localStorage.setItem("logged", "Sí");
    console.log("Paso las validaciones");
    navegar("/task");
  };

  const formik = useFormik({ initialValues, validate, onSubmit }); //recibe al menos 3 argumentos.
  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          placeholder="Enter email"
        ></input>
        {errors.email && errors.email}
        <input
          className="input-field"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Enter password"
        ></input>
        {errors.password && <div>*Campo obligatorio</div>}
        <button className="submit-btn" type="submit">
          Log In
        </button>
        <div className="registrar">No tienes cuenta? Registrate!</div>
      </form>
    </>
  );
};

export default LoginForm;
