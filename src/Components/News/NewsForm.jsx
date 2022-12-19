import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitServicePUT, onSubmitServicePOST } from '../../Services/newsService.js'
import '../FormStyles.css';
import './NewsForm.css';

export const NewsForm = () => {
    
    const { id } = useParams();
    const imageRef = useRef();
    
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ search, setSearch ] = useState(false); 

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const [ imageValue, setImageValue ] = useState(null)
    const [ dataCategories, setDataCategories ] = useState([])

    const initialValues = {
        name: '',
        content: '',
        category_id: '',
        image: ''
    }

    const validationSchema = () => Yup.object().shape({
        name: Yup
            .string()
            .min(4, 'El Título debe contener al menos 4 carácteres.')
            .required('El título es requerido.'),
        content: Yup
            .string()
            .required('La descripción no puede quedar vacía.'),
        category_id: Yup
            .string()
            .required('Debe seleccionar una Categoría.'),
        image: 
            (id)
                ? Yup
                    .string()
                    .matches(jpgRegExp, {message: 'La imagen debe ser un archivo .jpg o .png', excludeEmptyString: true})
                : Yup
                    .string()
                    .matches(jpgRegExp, {message: 'La imagen debe ser un archivo .jpg o .png', excludeEmptyString: true})
                    .required('La imagen es un dato requerido.')
    })

    const onSubmit = () => {
        if ( id ) {
            if (imageValue) {
                setImagePreview(imageValue)
            }
            onSubmitServicePUT(
                id,
                values.name,
                values.content,
                values.category_id,
                imageValue,
                ( (imageValue) ? true : false )
            )
        } else {
            onSubmitServicePOST(
                values.name,
                values.content,
                values.category_id,
                resetForm,
                imageValue
            )
        }
    }


    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { 
        handleSubmit, 
        handleChange, 
        handleBlur, 
        setFieldValue, 
        setFieldTouched, 
        setValues, 
        resetForm, 
        values, 
        touched, 
        errors
    } = formik;


    useEffect(() => {
        if (id) {
            setSearch(() => (true))
            axios.get(`https://ongapi.alkemy.org/api/news/${id}`)
                .then( res => {
                    setValues(() => ({
                        ...res,
                        name: res.data.data.name,
                        content: res.data.data.content,
                        category_id: res.data.data.category_id,
                        image: ''
                    }))
                    setImagePreview(() => ( res.data.data.image ));
                    setSearch(() => (false))
                } )
        }

        axios.get(`https://ongapi.alkemy.org/api/categories`)
            .then( res => {
                const results = res.data.data;
                setDataCategories(results)
            } )

    }, [id, setValues, ])


    const convertToBase64 = () => {
        const file  = imageRef.current.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function(event){
            let base64 = fileReader.result
            setImageValue(base64)
            setImagePreview(base64)
        }
    }

    useEffect(() => {
        if ( values.image ) convertToBase64();
    }, [values])



    return (
        <div className='container'>
            <h1 style={ {textAlign:"center"} }>{ id ? "Modificar Novedad" : "Crear Novedad" }</h1>

            <form className="news-form-container" onSubmit={handleSubmit}>
                <div className='news-box'>
                    <h2>Título:</h2>
                    <input 
                        className={ errors.name && touched.name ? 'news-error' : 'news-input-field' }
                        type="text" 
                        name="name" 
                        value={values.name} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        placeholder='Ingrese el Título de la Novedad' 
                    />
                    <div>{ errors.name && touched.name && <span className='news-error-message'>{ errors.name }</span> }</div>
                </div>

                <div className='news-box'>
                    <h2>Contenido:</h2>
                    <CKEditor 
                        className={ errors.content && touched.content ? 'news-error' : 'news-input-field' }
                        editor= { ClassicEditor }
                        data= { values.content }
                        config= {{ placeholder:'Escriba un Contenido' }}
                        onfocus= {( event, editor ) => {
                            editor.setData(values.content);
                        }}
                        onChange= {(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('content', data);
                        }}
                        onBlur= {( event, editor ) => {
                            setFieldTouched('content');
                        }}
                    />
                    <div>{ errors.content && touched.content && <span className='news-error-message'>{ errors.content }</span> }</div>
                </div>

                <div className='news-box'>
                    <h2>Seleccione una Categoría:</h2>
                    <select
                        className={ errors.category_id && touched.category_id ? 'news-error' : 'news-input-field' }
                        name= 'category_id'
                        value={ values.category_id }
                        onBlur={ handleBlur }
                        onChange={ handleChange }
                    >
                        {
                            dataCategories.map((value) => 
                                <option 
                                    key={ value.id }
                                    value={ value.id }
                                >{ value.name }</option> )
                        }
                    </select>
                </div>
                
                <div className='news-box'>
                    <h2>Ingrese una Imagen:</h2>
                    <input 
                        id='input-file'
                        className={ errors.image && touched.image ? 'news-error' : 'news-input-field' }
                        type="file" 
                        name='image' 
                        ref={ imageRef } 
                        value={ values.image } 
                        onBlur={ handleBlur } 
                        onChange={ handleChange } 
                    />
                    <div>{ errors.image && touched.image && <span className='news-error-message'>{ errors.image }</span> }</div>
                </div>
                    
                <div className='news-preview-image-container'>
                    { id 
                        ? 
                            <div>
                                <div className='news-image-Preview' style={{ content: `url(${imagePreview})` }}></div>
                            </div>
                        : null
                    }
                </div>
                
                <div className='news-box-button'>
                    <button className="news-submit-btn" type="submit" >Enviar</button>
                </div>
            </form>
        </div>
    );
}