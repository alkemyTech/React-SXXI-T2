import logo from '../../resources/logo/LOGO-SOMOS_MAS.png';
import '../FormStyles.css';
import { useFormik } from 'formik';
import * as Yup from "yup";

export const Contact = () => {
    const initialValues = {
        userName: "",
        email: "",
        phone: "",
        message: "",
    };

    const required = "* Campo obligatorio";

    const validationSchema = () =>
        Yup.object().shape({
            userName: Yup.string()
                .required(required),
            email: Yup.string()
                .email("Debe ser un email valido")
                .required(required),
            phone: Yup.number()
                .typeError("Tiene que ser un numero valido")
                .integer("No puede contener decimales")
                .min(10000000, "La cantidad mínima de numeros es 8")
                .required(required),
            message: Yup.string()
                .required(required),
        });
    
    const onSubmit = () => {
        console.log(values)
        resetForm();
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        values,
        resetForm,
    } = formik;
  
    return (
    <div className='container'>
        <img src={logo} alt='logo' id='logo' />
        <div id='contribuir' >
            <h1>¿Quieres contribuir?</h1>
            <button className="submit-btn donar-btn">Donar</button>
            <h1>¡Contactate con nosotros!</h1>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="userName" 
                placeholder="Nombre y Apellido" 
                className={errors.userName && touched.userName ? "error" : "input-field" }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName} 
            />
            {errors.userName && touched.userName && (
                <span className="error-message">{errors.userName}</span>
            )}
            <input 
                type="email"
                name="email"
                placeholder="Email"
                className={errors.email && touched.email ? "error" : "input-field" }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}  
            />
            {errors.email && touched.email && (
                <span className="error-message">{errors.email}</span>
            )}
            <input 
                type="text"
                name="phone"
                placeholder="Numero de telefono" 
                className={errors.phone && touched.phone ? "error" : "input-field" }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone} 
            />
            {errors.phone && touched.phone && (
                <span className="error-message">{errors.phone}</span>
            )}
            <textarea 
                name="message"
                placeholder="Mensaje"
                className={errors.message && touched.message ? "error" : "input-field" }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message} 
            />
            {errors.message && touched.message && (
                <span className="error-message">{errors.message}</span>
            )}
            <input type="submit" value="Enviar mensaje" className="submit-btn" />
        </form>
    </div>
  )
}
