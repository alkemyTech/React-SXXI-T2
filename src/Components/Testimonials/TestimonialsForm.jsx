import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitServicePUT, onSubmitServicePOST } from '../../Services/testimonialService.js'
import '../FormStyles.css';
import './TestimonialsForm.css';

export const TestimonialForm = () => {

    const { id } = useParams();
    const imageRef = useRef();
    
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ search, setSearch ] = useState(false); 

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const [ imageValue, setImageValue ] = useState(null);

    const initialValues = {
        name: '',
        description: '',
        image: ''
    }

    const validationSchema = () => Yup.object().shape({
        name: Yup
            .string()
            .min(4, 'El Título debe contener al menos 4 carácteres.')
            .required('El título es requerido.'),
        description: Yup
            .string()
            .required('La descripción no puede quedar vacía.'),
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
                ( (imageValue) ? true : false )
            )
        } else {
            onSubmitServicePOST(
                values.name,
                values.description,
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
            axios.get(`https://ongapi.alkemy.org/api/testimonials/${id}`)
                .then( res => {
                    setValues(() => ({
                        ...res,
                        name: res.data.data.name,
                        description: res.data.data.description,
                        image: ''
                    }))
                    setImagePreview(() => ( res.data.data.image ));
                    setSearch(() => ( false ));
                })
        }
    }, [id, setValues]);
    
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
            <h1 style={ {textAlign:"center"} }>{ id ? "Modificar Testimonio" : "Crear Testimonio" }</h1>

            <form className="testimonial-form-container" onSubmit={handleSubmit}>
                <div className='testimonial-box'>
                    <h2>Título:</h2>
                    <input 
                        className={ errors.name && touched.name ? 'testimonial-error' : 'testimonial-input-field' }
                        type="text" 
                        name="name" 
                        value={values.name} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        placeholder='Ingrese el Título del Testimonio' 
                    />
                    <div>{ errors.name && touched.name && <span className='testimonial-error-message'>{ errors.name }</span> }</div>
                </div>

                <div className='testimonial-box'>
                    <h2>Descripción:</h2>
                    <CKEditor 
                        className={ errors.description && touched.description ? 'testimonial-error' : 'testimonial-input-field' }
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
                    <div>{ errors.description && touched.description && <span className='testimonial-error-message'>{ errors.description }</span> }</div>
                </div>
                
                <div className='testimonial-box'>
                    <h2>Ingrese una Imagen:</h2>
                    <input 
                        id='testimonial-input-file'
                        className={ errors.image && touched.image ? 'testimonial-error' : 'testimonial-input-field' }
                        type="file" name='image' 
                        ref={ imageRef } 
                        value={ values.image } 
                        onBlur={ handleBlur } 
                        onChange={ handleChange } 
                    />
                    <div>{ errors.image && touched.image && <span className='testimonial-error-message'>{ errors.image }</span> }</div>
                </div>
                    
                <div className='testimonial-preview-image-container'>
                    { id 
                        ? 
                            <div>
                                <div className='testimonial-image-Preview' style={{ content: `url(${imagePreview})` }}></div> 
                            </div>
                        : null
                    }
                </div>
                
                <div className='testimonial-box-button'>
                    <button className="testimonial-submit-btn" type="submit" >Enviar</button>
                </div>
            </form>
        </div>
    )
}