import React, { useState, useRef, useEffect } from 'react';
import '../FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitService } from '../../Services/slidesService';


const SlidesForm = () => {
    
    const { id } = useParams();
    const imageRef = useRef();

    const [ imagePreview, SetImagePreview ] = useState(null);
    const [ busca, setBusca ] = useState(false); 

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const initialValues = {
        name: '',
        description: '',
        image: '',
        order: ''
    }

    const validationSchema = () => Yup.object().shape({
        name: Yup.string().min(4, 'El Título debe contener al menos 4 carácteres.').required('El título es requerido.'),
        description: Yup.string().required('La descripción no puede quedar vacía.'),
        image: Yup.string().matches(jpgRegExp, {message: 'La imagen debe ser un archivo .jpg o .png', excludeEmptyString: true}).required('Debe ingresar una imagen.'),
        order: Yup.required('El Orden no puede quedar vacío').matches(/^[0-9]+$/, 'El Orden debe ser un número.')
    })

    const onSubmit = () => {
        const file = imageRef.current.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function () {
            SetImagePreview(fileReader.result)
            onSubmitService(
                id, 
                values.name,
                values.description,
                fileReader.result,
                values.order,
                resetForm,
                setSubmitting
            )
        }
        fileReader.onerror = () => {
            setSubmitting(false);
            alert('Error al procesar imagen.');
        }

        fileReader.readAsDataURL(file);
    }

    const formik = useFormik({initialValues, validationSchema, onSubmit});
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
        if ( id ) {
            setBusca(() => (true))
            axios.get(`https://ongapi.alkemy.org/api/slides/${id}`)
                .then( res => {
                    setValues(() => ({
                        ...res,
                        name: res.data.data.name,
                        description: res.data.data.description,
                        image: '',
                        order: res.data.data.order
                    }))
                    SetImagePreview(() => ( res.data.data.image ));
                    setBusca(() => ( false ));
                } )
        }
    }, [ id, setValues ]);

    return (
        <form className="form-container" onSubmit={handleSubmit} >
            <h2>Título:</h2>
            <input 
                className={ errors.name && touched.name ? 'error' : 'input-field' }
                type="text" 
                name="name" 
                value={values.name} 
                onBlur={handleBlur} 
                onChange={handleChange} 
                placeholder='Ingrese el Título del Testimonio' 
            />
            <div className='errors'>{ errors.name && touched.name && <span>{ errors.name }</span> }</div>
            
            <h2>Descripción: </h2>
            <CKEditor
                className={ errors.description && touched.description ? 'error' : 'input-field' }
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
            <div className='errors'>{ errors.description && touched.description && <span>{ errors.description }</span> }</div>

            <h2>Ingrese una Imagen:</h2>
            <input 
                id='input-file'
                className='input-field' 
                type="file" name='image' 
                ref={ imageRef } 
                value={ values.image } 
                onBlur={ handleBlur } 
                onChange={ handleChange } 
            />
            <div className='errors'>{ errors.image && touched.image && <span>{ errors.image }</span> }</div>

            <div className='preview-image-container'>
                { id 
                    ? 
                        <div>
                            <div className='image-Preview' style={{ content: `url(${imagePreview})` }}></div>
                        </div>
                    : null
                }      
            </div>

            <h2>Ingrese el Orden:</h2>
            <input
                id='input-order'
                className='input-field'
                type='text'
                value={ values.order }
                onBlur={ handleBlur }
                onChange={ handleChange }
            />
            <div className='errors'>{ errors.order && touched.order && <span>{ errors.order }</span> }</div>

            <button className="submit-btn" type="submit">Enviar</button>
        </form>
    );
}
 
export default SlidesForm;