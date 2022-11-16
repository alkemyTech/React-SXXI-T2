import { useEffect, useState } from 'react';
import '../../Components/FormStyles.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { notification, message } from 'antd';
// import SlidesForm from '../Slides/SlidesForm';

export const HomeForm = () => {
    const [organizationData, setOrganizationData] = useState({
        name: "",
        welcome_text: "",
        id: 0,
        group_id: 2,
    });
    const [slides, setSlides] = useState([]);

    const initialValues = { welcome: "" };
    const required = "* Campo obligatorio";

    const validationSchema = () =>
        Yup.object().shape({
            welcome: Yup.string()
            .min(20, "La cantidad mínima de caracteres es 20")
            .required(required),
        });
    
    const onSubmit = async () => {
        try {
            let endPoint = `https://ongapi.alkemy.org/api/organization/${organizationData.id}`;
            const dataToUpdate = { 
                welcome_text: organizationData.welcome, 
                group_id: organizationData.group_id, 
                name: organizationData.name,
            };
            const config = { 
                header: { 
                    accept: 'application/json', 
                    'Content-Type': 'application/json' 
                } 
            };
            const { data } = await axios.put(endPoint, dataToUpdate, config);
            notification['success']({
                message: 'Texto de bienvenida actualizado',
                description:
                  `El texto de bienvenida fue actualizado a: 
                  "${data.data.welcome_text}"`,
                duration: 7,
              });
        } catch (err){
            message.error("Ha ocurrido un error")
        }
    }

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        values,
    } = useFormik({ initialValues, validationSchema, onSubmit });

    const handleSlide = (id, e) => {
        console.log(id, e.target.value)
    }

    useEffect(() => {
        let endPoint = "https://ongapi.alkemy.org/api/slides";
        axios
        .get(endPoint)
        .then((response) => {
            const apiData = response.data;
            const data = apiData.data;
            setSlides(data.slice(0,3))
        })
        .catch( (e) => {
            message.error("Ha ocurrido un error");
            console.log(e.message);
        })

        endPoint = "https://ongapi.alkemy.org/api/organization";
        axios.get(endPoint).then((response) => {
            const apiData = response.data;
            const { name, welcome_text, id  } = apiData.data;
            values.welcome = welcome_text;
            setOrganizationData(currValues => ({ ...currValues, name, welcome_text, id }));
        })
        .catch( (e) => {
            message.error("Ha ocurrido un error");
            console.log(e.message);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setOrganizationData(currValues => ({ ...currValues, welcome_text: values.welcome }));
    }, [values])

    return (
        <div className='container'>
            <h1 style={ {textAlign:"center"} }>Modificar inicio</h1>
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
            <div className="form-container">
                <h2>Slides</h2>
                <ul id='slides-home'>
                    {slides.map(slide => (
                        <li key={slide.id}>
                            <img src={slide.image} alt="slide-img" />
                            <h4>{slide.name}</h4>
                            <label className='upload-img-btn'>
                                <span>🔄</span>
                                <input hidden type="file" onChange={(e) => handleSlide(slide.id, e)}/>
                            </label>
                        </li>
                    ))}
                </ul>
                <button className="submit-btn">Guardar</button>
            </div>
        </div>
    );
}