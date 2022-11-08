import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from "axios";
import * as Yup from "yup";
import { Checkbox, notification, message } from 'antd';
import '../FormStyles.css';

const UserForm = () => {
    const { id } = useParams();
    const [usersValues, setUsersValues] = useState({
        name: '',
        email: '',
        role_id: 0,
        profile_image: '',
        password:'',
        group_id: 2,
    })
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    const initialValues = {
        name: '',
        email: '',
        role_id: 0,
        profile_image: '',
        password:'',
    }

    const required = "* Campo obligatorio";
    const getExtension = path => {
        return path.slice(-3).toLowerCase();
    }
    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string()
                .min(4, "La cantidad mínima de caracteres es 4")
                .required(required),
            email: Yup.string()
                .email("Debe ser un email valido")
                .required(required),
            role_id: Yup.number()
                .required(required),
            profile_image: Yup.mixed()
                .test({
                    message: 'El formato debe ser jpg o png',
                    test: file => (!file || ['png', 'jpg'].includes(getExtension(file)))
                }),
                // .required(required),
            password: Yup.string()
                .min(8, 'La cantidad mínima de caracteres es 8')
                .required(required),
        });
    

    const onSubmitPost = async () => {
        setUsersValues(currValues => ({ ...values, group_id: 2 }))
        try {
            let endPoint = "https://ongapi.alkemy.org/api/users";
            const dataToCreate = { ...values, group_id: 2 }
            const config = { 
                header: { 
                    accept: 'application/json', 
                    'Content-Type': 'application/json' 
                } 
            };
            const { data } = await axios.post(endPoint, dataToCreate, config);
            notification['success']({
                message: '¡Creacion exitosa!',
                description: `El usuario "${data.data.name}" fue creado con exito`,
                duration: 7,
              });
        } catch (err){
            message.error("Ha ocurrido un error")
            console.log(err.message);
        }
    }

    const onSubmitPut = async () => {
        setUsersValues(currValues => ({ ...values, group_id: 2 }))
        try {
            let endPoint = `https://ongapi.alkemy.org/api/users/${id}`;
            const dataToUpdate = { ...values, group_id: 2 };
            const config = { 
                header: { 
                    accept: 'application/json', 
                    'Content-Type': 'application/json' 
                } 
            };
            const { data } = await axios.put(endPoint, dataToUpdate, config);
            notification['success']({
                message: '¡Modificacion exitosa!',
                description: `El usuario "${data.data.name}" fue modificado con exito`,
                duration: 7,
              });
        } catch (err){
            message.error("Ha ocurrido un error")
            console.log(err.message);
        }
    }
    
    const onSubmit = () => {
        if (id !== undefined) {
            onSubmitPut();
        } else {
            onSubmitPost();
        }
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
        if (id !== undefined) {
            const endPoint = `https://ongapi.alkemy.org/api/users/${id}`;
            axios.get(endPoint).then((response) => {
            const { name, email, role_id, profile_image, password, group_id } = response.data.data;
            setUsersValues(currValues => ({ ...currValues, name, email, role_id, profile_image, password, group_id }))
            values.name = name;
            values.email = email;
            values.role_id = role_id;
            values.password = password;
        })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container'>
            <h1 style={ {textAlign:"center"} }>{ id ? "Modificar usuario" : "Crear usuario" }</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input 
                    className={errors.name && touched.name ? "error" : "input-field" }
                    type="text" 
                    name="name" 
                    value={values.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nombre"
                />
                {errors.name && touched.name && (
                    <span className="error-message">{errors.name}</span>
                )}
                <input 
                    className={errors.email && touched.email ? "error" : "input-field" }
                    type="text" 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Email"
                />
                {errors.email && touched.email && (
                    <span className="error-message">{errors.email}</span>
                )}
                <input 
                    className={errors.password && touched.password ? "error" : "input-field" }
                    type={isVisiblePassword ? "text" : "password" }
                    name="password" 
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Contraseña"
                />
                <Checkbox onChange={() => setIsVisiblePassword(currValue => !currValue)}>Mostrar contraseña</Checkbox>
                {errors.password && touched.password && (
                    <span className="error-message">{errors.password}</span>
                )}
                <select 
                    className={errors.role_id && touched.role_id ? "select-error" : "select-field" }
                    name="role_id" 
                    value={values.role_id} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="">Seleccionar un role</option>
                    <option value="1">Administrador</option>
                    <option value="2">Regular</option>
                </select>
                {errors.role_id && touched.role_id && (
                    <span className="error-message">{errors.role_id}</span>
                )}
                <input 
                    id="input-file"
                    type="file"
                    name="profile_image" 
                    accept="image/png, image/jpeg" 
                    value={values.profile_image} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.profile_image && touched.profile_image && (
                    <span className="error-message">{errors.profile_image}</span>
                )}
                <button 
                    className="submit-btn" 
                    type="submit"
                >
                    { id !== undefined ? "Guardar cambios" : "Crear usuario" }
                </button>
            </form>
        </div>
    );
}
 
export default UserForm;