import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitServicePUT, onSubmitServicePOST } from '../../Services/MembersService.js'
import '../FormStyles.css';
import './MembersForm.css';

const MembersForm = () => {
  
  const { id } = useParams();
    const imageRef = useRef();
    
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ search, setSearch ] = useState(false); 

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const [ imageValue, setImageValue ] = useState(null)

    const initialValues = {
        name: '',
        description: '',
        image: '',
        facebookURL: '',
        linkedinURL: ''
    }

    const validationSchema = () => Yup.object().shape({ 
      name: Yup
        .string()
        .min(4, 'El Título debe contener al menos 4 carácteres.')
        .required('El título es requerido.'),
      description: Yup
        .string()
        .required('La descripción no puede quedar vacía.'),
      facebookURL: Yup
        .string()
        .url()
        .required('El Link es requerido.'),
      linkedinURL: Yup
        .string()
        .url()
        .required('El Link es requerido.'),
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
            values.facebookURL,
            values.linkedinURL,
            ( (imageValue) ? true : false )
        )
    } else {
        onSubmitServicePOST(
            values.name,
            values.description,
            resetForm,
            imageValue,
            values.facebookURL,
            values.linkedinURL
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
      axios.get(`https://ongapi.alkemy.org/api/members/${id}`)
        .then( res => {
          setValues(() => ({
            ...res,
            name: res.data.data.name,
            description: res.data.data.description,
            image: '',
            facebookURL: res.data.data.facebookUrl,
            linkedinURL: res.data.data.linkedinUrl
          }))
          setImagePreview(() => ( res.data.data.image ));
          setSearch(() => (false));
        })
    }
  }, [id, setValues])

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
      <h1 style={ {textAlign:"center"} }>{ id ? "Modificar Miembro" : "Crear Miembro" }</h1>

      <form className="members-form-container" onSubmit={handleSubmit}>
        <div className='members-box'>
          <h2>Nombre:</h2>
          <input 
            className={ errors.name && touched.name ? 'members-error' : 'members-input-field' }
            type="text"
            name="name" 
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='Ingrese el Nombre del Miembro'
          />
          <div>{ errors.name && touched.name && <span className='members-error-message'>{ errors.name }</span> }</div>
        </div>

        <div className='members-box'>
          <h2>Descripción:</h2>
          <CKEditor 
            className={ errors.description && touched.description ? 'members-error' : 'members-input-field' }
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
          <div>{ errors.description && touched.description && <span className='members-error-message'>{ errors.description }</span> }</div>
        </div>

        <div className='members-box'>
          <h2>Link de Facebook:</h2>
          <input 
            className={ errors.facebookURL && touched.facebookURL ? 'members-error' : 'members-input-field' }
            type="text"
            name="facebookURL" 
            value={values.facebookURL}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='Ingrese el Link de Facebook'
          />
          <div>{ errors.facebookURL && touched.facebookURL && <span className='members-error-message'>{ errors.facebookURL }</span> }</div>
        </div>

        <div className='members-box'>
          <h2>Link de LinkedIn:</h2>
          <input 
            className={ errors.linkedinURL && touched.linkedinURL ? 'members-error' : 'members-input-field' }
            type="text"
            name="linkedinURL" 
            value={values.linkedinURL}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='Ingrese el Link de LinkedIn'
          />
          <div>{ errors.linkedinURL && touched.linkedinURL && <span className='members-error-message'>{ errors.linkedinURL }</span> }</div>
        </div>

        <div className='members-box'>
          <h2>Ingrese una Imagen:</h2>
          <input 
            id='input-file'
            className={ errors.image && touched.image ? 'members-error' : 'members-input-field' }
            type="file" name='image' 
            ref={ imageRef } 
            value={ values.image } 
            onBlur={ handleBlur } 
            onChange={ handleChange } 
          />
          <div>{ errors.image && touched.image && <span className='members-error-message'>{ errors.image }</span> }</div>
        </div>

        <div className='members-preview-image-container'>
            { id
                ?
                  <div>
                    <div className='members-image-Preview' style={{ content: `url(${imagePreview})` }}></div>
                  </div>
                : null
            }
        </div>

        <div className='members-box-button'>
          <button className='members-submit-btn' type='submit'>Enviar</button>
        </div>
      </form>

    </div>
  );
}

export default MembersForm;