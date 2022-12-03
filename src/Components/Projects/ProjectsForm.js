import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { onSubmitServicePUT, onSubmitServicePOST } from '../../Services/ProjectService';
import { useRef } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './ProjectsForm.scss';

const ProjectsForm = () => {

  const { id } = useParams();
  const imgRef = useRef();
  const [ imgPreview, setImgPreview ] = useState(null);
  const [ search, setSearch ] = useState(false);
  const [ imageValue, setImageValue ] = useState(null);

  const jpgRegExp = /\.(jpe?g|png)$/i;

  const initialValues = {
    id: null, 
    title: '',
    description: '', 
    image: '',
    due_date: '',
  }

  const validationSchema = yup.object().shape({
    title: yup.string().min(5, "El titulo debe contener al menos 5 caracteres").required("Titulo es requerido"),
    description: yup.string().required("Debe completar el campo descripción"),
    image: yup.string().matches(jpgRegExp, {message: 'La imagen debe ser un archivo .jpg o .png', excludeEmptyString: true}),
    due_date: yup.date(),
  });

  const onSubmit = () => {         
    if ( id ) {
        if (imageValue) {
            setImgPreview(imageValue) 
        }
        onSubmitServicePUT(
            id,
            values.name,
            values.description,
            values.due_date,
            imageValue,
            ( (imageValue) ? true : false )
        )
    } else {
        onSubmitServicePOST(
            values.name,
            values.description,
            values.due_date,
            resetForm,
            imageValue
        )
    }
}

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setValues,
    values,
    resetForm,
    touched,
    errors
  } = formik;

  useEffect(() => {
    if (id) {
      setSearch(() => (true))
      axios
      .get(`https://ongapi.alkemy.org/public/api/projects/${id}`)
      .then(res => {
        setValues(() => ({
          ...res,
          title: res.data.data.title,
          description: res.data.data.description,
          image: '',
          due_date: res.data.data.due_date
        }))
        setSearch(() => (false))
      })
    }
    }, [ id, setValues ])

    const convertToBase64 = () => {
      const file = imgRef.current.files[0]; 
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = function(event){
          let base64 = fileReader.result
          setImageValue(base64)
      }
  }

  useEffect(() => {
      if ( values.image ) convertToBase64();
  }, [values])

  return (
      <>
        <div className="container">
        <h1 style={ {textAlign:"center"} }>{ id ? "Modificar proyecto" : "Crear proyecto" }</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <div>
              <h3>Titulo:</h3>
              <input 
              className="input-field" 
              type="text" 
              name="title" 
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange} 
              placeholder="Ingrese el nombre del Proyecto">
              </input>
              <div>{ errors.title && touched.title && <span className='error-message'>{ errors.title }</span> }</div>
            </div>
            <div className='box'>
                    <h2>Descripción:</h2>
                    <CKEditor 
                        editor= { ClassicEditor }
                        data= { values.description }
                        config= {{ placeholder:'Describir el proyecto' }}
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
                    <div>{ errors.description && touched.description && <span className='error-message'>{ errors.description }</span> }</div>
                </div>
            <div>
              <h3>Imagen</h3>
              <input 
              className="input-field" 
              type="file" 
              ref={imgRef}
              name="image" 
              value={values.image} 
              onBlur={handleBlur}
              onChange={handleChange} >
              </input>
              <div>{ errors.image && touched.image && <span className='error-message'>{ errors.image }</span> }</div>
            </div> 
            <div>
              <h3>Fecha</h3>
              <input 
              className="input-field" 
              type="date" 
              name="due_date" 
              value= {values.due_date}
              onBlur={handleBlur}
              onChange={handleChange} 
              placeholder="Ingresar la fecha correspondiente">
              </input>
              <div>{ errors.due_date && touched.due_date && <span className='error-message'>{ errors.due_date }</span> }</div>
            </div>  
            <div className='testimonial-preview-image-container'>
                    { id 
                        ? 
                            <div>
                                <div className='testimonial-image-Preview' style={{ content: `url(${imgPreview})` }}></div>
                            </div>
                        : null
                    }
                </div>

              <button className="submit-btn" type="submit">Enviar</button>
          </form>
        </div>
        </>
  );
}



export default ProjectsForm