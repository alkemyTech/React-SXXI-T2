import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../Store/Reducers/authReducer";
import { basicSchema } from "./registerSchema";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    dispatch(register(values));
    navigate("/");
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className={
            errors.fullname && touched.fullname
              ? "input-error input-field"
              : "input-field"
          }
          type="text"
          name="fullname"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nombre y Apellido"
        />
        {errors.fullname && touched.fullname && (
          <p className="error-msg">{errors.fullname}</p>
        )}

        <input
          className={
            errors.email && touched.email
              ? "input-error input-field"
              : "input-field"
          }
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        ></input>
        {errors.email && touched.email && (
          <p className="error-msg">{errors.email}</p>
        )}

        <input
          className={
            errors.password && touched.password
              ? "input-error input-field"
              : "input-field"
          }
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Contraseña"
        ></input>
        {errors.password && touched.password && (
          <p className="error-msg">{errors.password}</p>
        )}

        <input
          className={
            errors.repassword && touched.repassword
              ? "input-error input-field"
              : "input-field"
          }
          type="password"
          name="repassword"
          value={values.repassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Repite la contraseña"
        ></input>
        {errors.repassword && touched.repassword && (
          <p className="error-msg">{errors.repassword}</p>
        )}

        <button disabled={isSubmitting} className="submit-btn" type="submit">
          Registrarme
        </button>
      </form>
    </>
  );
};
