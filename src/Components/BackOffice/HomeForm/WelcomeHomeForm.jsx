import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { getOrganization, putWelcomeText } from '../../../Services/publicApiService';
import '../../FormStyles.css';

export const WelcomeHomeForm = () => {
    const [organizationData, setOrganizationData] = useState({
        name: "",
        welcome_text: "",
        id: 0,
        group_id: 2,
    });

    const initialValues = { welcome: "" };
    const required = "* Campo obligatorio";

    const validationSchema = () =>
        Yup.object().shape({
            welcome: Yup.string()
            .min(20, "La cantidad mínima de caracteres es 20")
            .required(required),
        });
    
    const onSubmit = async () => {
        putWelcomeText(organizationData)
    }

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        values,
    } = useFormik({ initialValues, validationSchema, onSubmit });

    useEffect(() => {
        getOrganization().then( ({ name, welcome_text, id }) => {
            values.welcome = welcome_text;
            setOrganizationData(currValues => ({ ...currValues, name, welcome_text, id }));
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setOrganizationData(currValues => ({ ...currValues, welcome_text: values.welcome }));
    }, [values])


  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <h2>Texto de bienvenida</h2>
        <input 
            className={errors.welcome && touched.welcome ? "error" : "input-field" }
            type="text" 
            name="welcome" 
            value={values.welcome} 
            onChange={handleChange} 
            onBlur={handleBlur}
            placeholder="Texto de bienvenida" 
            autoComplete="off" 
            required 
        />
        {errors.welcome && touched.welcome && (
            <span className="error-message">{errors.welcome}</span>
        )}
        <button className="submit-btn" type="submit">Guardar</button>
    </form>
  )
}
