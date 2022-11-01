import '../../Components/FormStyles.css';
import { useFormik } from 'formik';
import { basicSchema } from './newsSchema';
import axios from 'axios';
import { useEffect, useState } from 'react';

const onSubmit = async (values, actions) => {
    const newData = values;

    axios.post('https://ongapi.alkemy.org/api/news', newData)
        .then(response => console.log(response.success));

}

export const NewsForm = () => {

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            title: '',
            content: '',
            category: '',
            image: ''
        },
        validationSchema: basicSchema,
        onSubmit
    });

    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get("https://ongapi.alkemy.org/api/categories");
            const results = [];

            data.data.map((value) => {
                results.push({
                    key: value.name,
                    value: value.id,
                });
            });

            setOptions([
                { key: 'Selecciona una categoría', value: '' },
                ...results
            ])
        }

        // Trigger the fetch
        fetchData();
    }, []);

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <input className={errors.title && touched.title ? "input-error input-field" : "input-field"}
                    type="text"
                    name="title"
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Título'></input>

                <input className={errors.content && touched.content ? "input-error input-field" : "input-field"}
                    type="text"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    placeholder='Contenido'></input>

                <select className="select-field"
                    name="category"
                    value={values.category}
                    onChange={handleChange}>
                    {options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        );
                    })}

                </select>

                <input
                    type='file'
                    name='image'
                    value={values.image}
                    onChange={handleChange}
                    accept="image/png, image/jpeg"></input>

                <button disabled={isSubmitting} className="submit-btn" type="submit">Send</button>
            </form>

        </>
    );
}
