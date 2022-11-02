import '../FormStyles.css';
import { useFormik } from 'formik';
import { basicSchema } from './registerSchema';

const onSubmit = async (values, actions) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData = values;
    actions.resetForm();
    console.log(userData);
}

export const RegisterForm = () => {

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            repassword: ''
        },
        validationSchema: basicSchema,
        onSubmit
    });

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    className={errors.fullname && touched.fullname ? "input-error input-field" : "input-field"}
                    type="text"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nombre y Apellido" />
                {errors.fullname && touched.fullname && <p className="input-error">{errors.fullname}</p>}

                <input
                    className={errors.email && touched.email ? "input-error input-field" : "input-field"}
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"></input>
                {errors.email && touched.email && <p className="input-error">{errors.email}</p>}

                <input
                    className={errors.password && touched.password ? "input-error input-field" : "input-field"}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contraseña"></input>
                {errors.password && touched.password && <p className="input-error">{errors.password}</p>}

                <input
                    className={errors.repassword && touched.repassword ? "input-error input-field" : "input-field"}
                    type="password"
                    name="repassword"
                    value={values.repassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Repite la contraseña"></input>
                {errors.repassword && touched.repassword && <p className="input-error">{errors.repassword}</p>}

                <button disabled={isSubmitting} className="submit-btn" type="submit">Registrarme</button>
            </form>
            
        </>
    );
}
