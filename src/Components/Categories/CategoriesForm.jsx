import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitService } from '../../Services/categoriesService.js'
import '../FormStyles.css';
import './CategoriesForm.css';

const CategoriesForm = () => {
    
    const { id } = useParams();
    const imageRef = useRef();
    
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ search, setSearch ] = useState(false); 

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const initialValues = {
        name: '',
        description: '',
        image: ''
    }

    const validationSchema = () => Yup.object().shape({
        name: Yup.string().min(4, 'El Título debe contener al menos 4 carácteres.').required('El título es requerido.'),
        description: Yup.string().required('La descripción no puede quedar vacía.'),
        image: Yup.string().matches(jpgRegExp, {message: 'La imagen debe ser un archivo .jpg o .png', excludeEmptyString: true}).required('Debe ingresar una imagen.')
    })

    const onSubmit = () => {
        const file = imageRef.current.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function () {
            setImagePreview(fileReader.result)
            onSubmitService(
                id,
                values.name,
                values.description,
                fileReader.result,
                resetForm,
                setSubmitting
            );
        }
        fileReader.onerror = () => {
            setSubmitting(false);
            alert('Error al procesar imagen.')
        }

        fileReader.readAsDataURL(file);
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { 
        handleSubmit, 
        handleChange, 
        handleBlur, 
        setFieldValue, 
        setFieldTouched, 
        setValues, 
        isSubmitting, 
        setSubmitting, 
        resetForm, 
        values, 
        touched, 
        errors
    } = formik;

    useEffect(() => {
        if (id) {
            setSearch(() => (true))
            axios.get(`https://ongapi.alkemy.org/api/categories/${id}`)
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



    return (
        <div className='container'>
            <h1 style={ {textAlign:"center"} }>{ id ? "Modificar Categoría" : "Crear Categoría" }</h1>

            <form className="categories-form-container" onSubmit={handleSubmit}>
                <div className='categories-box'>
                    <h2>Título:</h2>
                    <input 
                        className={ errors.name && touched.name ? 'categories-error' : 'categories-input-field' }
                        type="text" 
                        name="name" 
                        value={values.name} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        placeholder='Ingrese el Título de la Categoría' 
                    />
                    <div>{ errors.name && touched.name && <span className='categories-error-message'>{ errors.name }</span> }</div>
                </div>

                <div className='categories-box'>
                    <h2>Descripción:</h2>
                    <CKEditor 
                        className={ errors.description && touched.description ? 'categories-error' : 'categories-input-field' }
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
                    <div>{ errors.description && touched.description && <span className='categories-error-message'>{ errors.description }</span> }</div>
                </div>
                
                <div className='categories-box'>
                    <h2>Ingrese una Imagen:</h2>
                    <input 
                        id='categories-input-file'
                        className={ errors.image && touched.image ? 'categories-error' : 'categories-input-field' }
                        type="file" name='image' 
                        ref={ imageRef } 
                        value={ values.image } 
                        onBlur={ handleBlur } 
                        onChange={ handleChange } 
                    />
                    <div>{ errors.image && touched.image && <span className='categories-error-message'>{ errors.image }</span> }</div>
                </div>
                    
                <div className='categories-preview-image-container'>
                    { id 
                        ? 
                            <div>
                                <div className='categories-image-Preview' style={{ content: `url(${imagePreview})` }}></div>
                            </div>
                        : null
                    }
                </div>
                
                <div className='categories-box-button'>
                    <button className="categories-submit-btn" type="submit" >Enviar</button>
                </div>
            </form>
        </div>
    );
}
 
export default CategoriesForm;