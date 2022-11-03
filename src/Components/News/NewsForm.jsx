import '../../Components/FormStyles.css';
import { useFormik } from 'formik';
import { basicSchema } from './newsSchema';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const onSubmit = async (values, actions) => {

    axios.post('https://ongapi.alkemy.org/api/news', { 
        name: values.title,
        content: values.content,
        category_id: values.category.key,
        image: values.image
    })
    .then((response) => console.log(response));
    actions.resetForm();
}

export const NewsForm = () => {
    
    const [create, setCreate] = useState(true);
    const [news, setNews] = useState([]);
    const [options, setOptions] = useState([]);
    const [categoryId, setCategoryId] = useState([]);

    const { newId } = useParams();
    
    useEffect(() => {
        if(newId !== undefined){
            async function fetchNewsData() {
                const { data } = await axios.get(`https://ongapi.alkemy.org/api/news/${newId}`);
                setNews(data.data);
            }
            fetchNewsData();
            async function fetchCategoryData() {
                const { data } = await axios.get(`https://ongapi.alkemy.org/api/categories/${news.category_id}`);
                setCategoryId(data.data);
            }
            fetchCategoryData();
            setCreate(false);
        }
    }, []);
    console.log(categoryId.id);
 
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            title: (create? '':news.name),
            content: (create? '':news.content),
            category: (create? '':categoryId.name),
            image: (create? '':news.image)
        },
        validationSchema: basicSchema,
        onSubmit
    });


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
        <form className="form-container" onSubmit={handleSubmit}>
            <input className={errors.title && touched.title ? "input-error input-field" : "input-field"}
                type="text"
                name="title"
                value={create ? values.title : news.name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='Título'></input>
            {errors.title && touched.title && <p className="input-error">{errors.title}</p>}


            <input className={errors.content && touched.content ? "input-error input-field" : "input-field"}
                type="text"
                name="content"
                value={values.content}
                onChange={handleChange}
                placeholder='Contenido'></input>
            {errors.content && touched.content && <p className="input-error">{errors.content}</p>}

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
            {errors.category && touched.category && <p className="input-error">{errors.category}</p>}


            <input
                type='file'
                name='image'
                value={values.image}
                onChange={handleChange}
                accept="image/png, image/jpeg"></input>
            {errors.image && touched.image && <p className="input-error">{errors.image}</p>}

            <button disabled={isSubmitting} className="submit-btn" type="submit">Send</button>
        </form>
    );
}
