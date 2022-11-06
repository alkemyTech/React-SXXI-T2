import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import '../FormStyles.css';

const UserForm = () => {
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        roleId: '',
        profilePhoto: '',
    })

    const required = "* Campo obligatorio";
    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string()
                .required(required),
            email: Yup.string()
                .email("Debe ser un email valido")
                .required(required),
            roleId: Yup.number()
                .typeError("Tiene que ser un numero valido")
                .integer("No puede contener decimales")
                .min(10000000, "La cantidad mínima de numeros es 8")
                .required(required),
            profilePhoto: Yup.string()
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
            <h1 style={ {textAlign:"center"} }>{ id ? "Modificar usuario" : "Crear usuario" }</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input className="input-field" type="text" name="name" value={initialValues.name || ''} onChange={handleChange} placeholder="Name"></input>
                <input className="input-field" type="text" name="email" value={initialValues.description || ''} onChange={handleChange} placeholder="Email"></input>
                <select className="input-field" value={initialValues.roleId || ''} onChange={e => setInitialValues({...initialValues, roleId: e.target.value})}>
                    <option value="" disabled >Select the role</option>
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                </select>
                <button className="submit-btn" type="submit">Send</button>
            </form>
        </div>
    );
}
 
export default UserForm;