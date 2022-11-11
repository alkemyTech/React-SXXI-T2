import "../FormStyles.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const RegexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){1,99}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const RegexPassword =
    /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;

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
    if (!values.password) {
      errors.password = "*Campo obligatorio";
    }
    if (values.password && !RegexPassword.test(values.password)) {
      errors.password =
        "La contraseña debe tener al menos un número, una letra y un símbolo (por ejemplo: @#$%). (mínimo 6 carácteres)";
    }

    return errors;
  };

  const onSubmit = (event) => {
    navigate("backoffice");
  };

  const formik = useFormik({ initialValues, validate, onSubmit }); //recibe al menos 3 argumentos.
  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <form className="form-container-login" onSubmit={handleSubmit}>
      <input
        className={`input-field ${errors.email ? "input-error" : null}`}
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
        placeholder="Enter email"
      ></input>
      {errors.email && <div className="input-error">{errors.email}</div>}
      <input
        className={`input-field ${errors.email ? "input-error" : null}`}
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
    </form>
  );
}

export default LoginForm;
