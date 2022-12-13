import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Checkbox } from 'antd';
import { getUser, postNewUser, putUser } from '../../../Services/publicApiService';
import { Skeleton } from '../../../Components/Skeleton/Skeleton';
import { Title } from '../../../Components/Title/Title';
import * as Yup from "yup";
import '../../../Components/FormStyles.css';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usersValues, setUsersValues] = useState({
        name: '',
        email: '',
        role_id: 0,
        profile_image: "",
        password:'',
        group_id: 2,
    })
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        name: '',
        email: '',
        role_id: 0,
        profile_image: "",
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
            password: Yup.string()
                .min(8, 'La cantidad mínima de caracteres es 8')
                .required(required),
        });

    const onSubmitPost = async () => {
        await postNewUser(usersValues);
    }

    const onSubmitPut = async () => {
        await putUser(usersValues, id);
    }
    
    const onSubmit = () => {
        if (id !== undefined) {
            onSubmitPut();
        } else {
            onSubmitPost();
        }
    }

    const convertToBase64 = (values) => {
        let input = document.getElementById("input-file");
        let fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
            let base64 = fReader.result;
            setUsersValues(currValues => ({ ...currValues, ...values, profile_image: base64 }))
        }
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        values,
    } = formik;

    useEffect(() => {
        if (id !== undefined) {
            setLoading(true);
            getUser(id).then( data => {
                setUsersValues(currValues => ({ ...currValues, ...data }))
                values.name = data.name;
                values.email = data.email;
                values.role_id = data.role_id;
                values.password = data.password;
                values.profile_image = data.profile_image;
                setLoading(false)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (values.profile_image) 
            convertToBase64(values);
        else
            setUsersValues(currValues => ({ ...currValues, ...values }))
    }, [values])

    return (
        <div className='container'>
            <Title 
                titleStyles={ {textAlign:"center"} } 
                title={ id ? "Modificar usuario" : "Crear usuario" }
            />
            <form className="form-container" onSubmit={handleSubmit}>
            { loading
                    ?
                        <Skeleton type="input" size="large" active block />
                    : 
                        <input 
                        className={errors.name && touched.name ? "error" : "input-field" }
                        type="text" 
                        name="name" 
                        value={values.name} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre"
                        />
                }
                {errors.name && touched.name && (
                    <span className="error-message">{errors.name}</span>
                )}
                { loading
                    ?
                        <Skeleton type="input" size="large" active block />
                    : 
                        <input 
                        className={errors.email && touched.email ? "error" : "input-field" }
                        type="text" 
                        name="email" 
                        value={values.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        placeholder="Email"
                        />
                }
                {errors.email && touched.email && (
                    <span className="error-message">{errors.email}</span>
                )}
                { loading
                    ?
                        <Skeleton type="input" size="large" active block />
                    : 
                        <input 
                        className={errors.password && touched.password ? "error" : "input-field" }
                        type={isVisiblePassword ? "text" : "password" }
                        name="password" 
                        value={values.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        placeholder="Contraseña"
                        />
                }
                { loading
                    ?
                        <Skeleton type="input" size="small" active />
                    : 
                        <Checkbox onChange={() => setIsVisiblePassword(currValue => !currValue)}>Mostrar contraseña</Checkbox>
                }
                {errors.password && touched.password && (
                    <span className="error-message">{errors.password}</span>
                )}
                { loading
                    ?
                        <Skeleton type="input" size="large" active block />
                    : 
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
                }
                {errors.role_id && touched.role_id && (
                    <span className="error-message">{errors.role_id}</span>
                )}
                { loading
                    ?
                        <Skeleton type="input" active />
                    : 
                        <input 
                            id="input-file"
                            type="file"
                            name="profile_image" 
                            accept="image/png, image/jpeg" 
                            value={!values.profile_image ? "" : values.profile_image} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                }
                {errors.profile_image && touched.profile_image && (
                    <span className="error-message">{errors.profile_image}</span>
                )}
                {usersValues.profile_image && <img src={usersValues.profile_image} alt='user_img' id='user_img'/>}
                <div className='buttonsForm'>
                    { loading
                        ?
                            <Skeleton type="button" size="large" active block />
                        : 
                            <button 
                                className="submit-btn" 
                                type="submit"
                            >
                                { id !== undefined ? "Guardar cambios" : "Crear usuario" }
                            </button>
                    }
                    { loading
                        ?
                            <Skeleton type="button" size="large" active block />
                        : 
                            <button
                                className='goback-btn'
                                onClick={() => navigate("/backoffice/users")}
                            >
                                Volver
                            </button>
                    }
                </div>
            </form>
        </div>
    );
}
 
export default UserForm;
