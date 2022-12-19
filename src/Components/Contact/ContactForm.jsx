import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { onSubmitServicePOST } from '../../Services/contactService';

export const ContactForm = () => {
    const [contactValues, setContactValues] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: "",
    };

    const required = "* Campo obligatorio";

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string()
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
        onSubmitServicePOST(contactValues);
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
  
    useEffect(() => {
        setContactValues(currValues => ({ ...currValues, ...values }))
    }, [values])

    return (
        <form className="form-container contact-container" onSubmit={handleSubmit}>
            <h1>¡Contactate con nosotros!</h1>
            <input 
                type="text"
                name="name" 
                placeholder="Nombre y Apellido" 
                className={errors.name && touched.name ? "error" : "input-field" }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} 
            />
            {errors.name && touched.name && (
                <span className="error-message">{errors.name}</span>
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
  )
}
