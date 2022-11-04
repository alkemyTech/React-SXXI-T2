import { useEffect, useState } from 'react';
import '../../Components/FormStyles.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
// import SlidesForm from '../Slides/SlidesForm';

export const HomeForm = () => {
    const [organizationData, setOrganizationData] = useState({
        name: "",
        welcome_text: "",
        id: 0,
        group_id: 2,
    });
    const [slideStaff, setSlideStaff] = useState([]);
    const [slideTestimonials, setSlideTestimonials] = useState([]);
    const [slideNews, setSlideNews] = useState([]);

    const initialValues = { welcome: "" };
    const required = "* Campo obligatorio";

    const validationSchema = () =>
        Yup.object().shape({
            welcome: Yup.string()
            .min(20, "La cantidad mínima de caracteres es 20")
            .required(required),
        });
    
    const onSubmit = async () => {
        setOrganizationData(currValues => ({ ...currValues, welcome_text: values.welcome }))
        try {
            let endPoint = `https://ongapi.alkemy.org/api/organization/${organizationData.id}`;
            const dataToUpdate = { welcome_text: values.welcome, group_id: 2 };
            const config = { header: { accept: 'application/json', 'Content-Type': 'application/json' } };
            console.log(endPoint, dataToUpdate, config);
            // const { data } = await axios.put(endPoint, dataToUpdate);
            const { data } = await axios.put(endPoint, dataToUpdate, config);
            console.log(data);
        } catch (err){
            console.log(err.message);
        }
        // axios.put(endPoint, apiData, config).then((response) => {
        //     console.log(response.data);
        // }).catch ((err) => {
        //     console.log(err.message);
        // })
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
        const getDataSlides = async (text) => {
            let endPoint = `https://ongapi.alkemy.org/api/${text}`;
            axios
            .get(endPoint)
            .then((response) => {
                const apiData = response.data;
                const data = apiData.data;
                text === "members" ? setSlideStaff(currValues => data)
                    : text === "testimonials" ? setSlideTestimonials(currValues => data)
                        : setSlideNews(currValues => data)
            })
            .catch( (e) => alert("Hubo errores, intenta mas tarde") )
        }
        let endPoint = "https://ongapi.alkemy.org/api/organization";
        axios.get(endPoint).then((response) => {
            const apiData = response.data;
            const { name, welcome_text, id  } = apiData.data;
            values.welcome = welcome_text;
            setOrganizationData(currValues => ({ ...currValues, name: name, welcome_text: welcome_text, id: id }));
        })
        getDataSlides("members");
        getDataSlides("testimonials");
        getDataSlides("news");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='container'>
            <h1 style={ {textAlign:"center"} }>Modificar inicio</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <h3>Texto de bienvenida</h3>
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
 
            {/* <SlidesForm data={homeValues.slideStaff} />
            <SlidesForm data={homeValues.slideTestimonials} />
            <SlidesForm data={homeValues.slideNews} /> */}
        </div>
    );
}