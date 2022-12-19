import React, { useState, useRef, useEffect } from 'react';
import '../FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitServicePUT, onSubmitServicePOST } from '../../Services/slidesService.js'
import './SlideForm.css'

export const SlidesForm = () => {
    
    const { id } = useParams();
    const imageRef = useRef();
    
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ search, setSearch ] = useState(false); 

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const [ imageValue, setImageValue ] = useState(null);

    const initialValues = {
        name: '',
        description: '',
        image: '',
        order: ''
    }

    const validationSchema = () => Yup.object().shape({
        name: Yup
            .string()
            .min(4, 'El Título debe contener al menos 4 carácteres.')
            .required('El título es requerido.'),
        description: Yup
            .string()
            .required('La descripción no puede quedar vacía.'),
        order: Yup
            .string()
            .trim()
            .required('El Orden no puede quedar vacío')
            .matches(/^[0-9]+$/, 'El campo Orden debe ser un numero'),
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
                values.description,
                imageValue,
                parseInt(values.order),
                ( (imageValue) ? true : false )
            )
        } else {
            onSubmitServicePOST(
                values.name,
                values.description,
                parseInt(values.order),
                resetForm,
                imageValue
            )
        }
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
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
        if ( id ) {
            setSearch(() => (true))
            axios.get(`https://ongapi.alkemy.org/api/slides/${id}`)
                .then( res => {
                    setValues(() => ({
                        ...res,
                        name: res.data.data.name,
                        description: res.data.data.description,
                        image: '',
                        order: ( res.data.data.order === null ? 0 : res.data.data.order )
                    }))
                    setImagePreview(() => ( res.data.data.image ))
                    setSearch(() => ( false ))
                } )
        }
    }, [ id, setValues ])

    const convertToBase64 = () => {
        const file = imageRef.current.files[0]; 
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
            <h1 style={ {textAlign:"center"} }>{ id ? "Modificar Slide" : "Crear Slide" }</h1>

            <form className="slides-form-container" onSubmit={handleSubmit}>
                <div className='slides-box'>
                    <h2>Título:</h2>
                    <input 
                        className={ errors.name && touched.name ? 'slides-error' : 'slides-input-field' }
                        type="text" 
                        name="name" 
                        value={values.name} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        placeholder='Ingrese el Título del Testimonio' 
                    />
                    <div>{ errors.name && touched.name && <span className='slides-error-message'>{ errors.name }</span> }</div>
                </div>

                <div className='slides-box'>
                    <h2>Descripción:</h2>
                    <CKEditor 
                        className={ errors.description && touched.description ? 'slides-error' : 'slides-input-field' }
                        editor= { ClassicEditor }
                        data= { values.description }
                        config= {{ placeholder:'Escriba una Descripción' }}
                        onfocus= {( event, editor ) => {
                            editor.setData(values.description);
                        }}
                        onChange= {(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('description', data);
                        }}
                        onBlur= {( event, editor ) => {
                            setFieldTouched('description');
                        }}
                    />
                    <div>{ errors.description && touched.description && <span className='slides-error-message'>{ errors.description }</span> }</div>
                </div>
                
                <div className='slides-box'>
                    <h2>Orden:</h2>
                    <input 
                        className={ errors.order && touched.order ? 'slides-order-error' : 'slides-input-field input-order' }
                        type="text" 
                        name="order" 
                        value={values.order} 
                        onBlur={handleBlur} 
                        onChange={handleChange}  
                    />
                    <div>{ errors.order && touched.order && <span className='slides-error-message'>{ errors.order }</span> }</div>
                </div>
                
                <div className='slides-box'>
                    <h2>Ingrese una Imagen:</h2>
                    <input 
                        id='slides-input-file'
                        className={ errors.image && touched.image ? 'slides-error' : 'slides-input-field' }
                        type="file" 
                        name='image' 
                        ref={ imageRef } 
                        value={values.image}
                        onBlur={ handleBlur } 
                        onChange={ handleChange } 
                    />
                    <div>{ errors.image && touched.image && <span className='slides-error-message'>{ errors.image }</span> }</div>
                </div>

                <div className='slides-preview-image-container'>
                    { id 
                        ? 
                            <div>
                                <div className='slides-image-Preview' style={{ content: `url(${imagePreview})` }}></div>
                            </div>
                        : null
                    }
                        
                </div>
                
                <div className='slides-box-button'>
                    <button className="slides-submit-btn" type="submit" >Enviar</button>
                </div>
            </form>
        </div>
    );
}