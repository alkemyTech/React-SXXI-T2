import "./LoginFormStyles.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

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

  const msjError = "*Campo obligatorio";

  const validationSchema = Yup.object().shape(
    {
      email: Yup.string()
        .matches(RegexEmail, {
          message: "Escribí un mail válido Ej: Nombre@siglo.com",
          excludeEmptyString: true,
        })
        .required(msjError),
      password: Yup.string().required(msjError)
      .min(6, "Debe contener al menos 6 caracteres")
      .matches(RegexPassword, {
        message:
        "La contraseña debe tener al menos un número, una letra y un símbolo (por ejemplo: @#$%).",
        excludeEmptyString: true,
      })
    });

  const onSubmit = (event) => {
    navigate("backoffice");
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit }); //recibe al menos 3 argumentos.
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    formik;

  return (
    <form className="frmLogin" onSubmit={handleSubmit}>
      <input
        className={`inputField ${errors.email ? "inputError" : null}`}
        type="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        placeholder="Enter email"
      ></input>
      {errors.email && touched.email && (
        <div className="msjError">{errors.email}</div>
      )}
      <input
        className={`inputField ${errors.password ? "inputError" : null}`}
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter password"
      ></input>
      {errors.password && touched.password && (
        <div className="msjError">{errors.password}</div>
      )}
      <button className="submitBtn" type="submit">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
