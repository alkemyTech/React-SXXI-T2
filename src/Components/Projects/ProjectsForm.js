import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import onSubmitService from '../../Services/onSubmitServiceProject';
import { useRef } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './ProjectsForm.scss';

const ProjectsForm = ({setRefresh, refresh}) => {

  const { id } = useParams();

  const imgRef = useRef();
  const [ imgPreview, setImgPreview ] = useState(null);
  const [ busca, setBusca ] = useState(false);

  const jpgRegExp = /\.(jpe?g|png)$/i;

  const initialValues = {
    title: '',
    description: '', 
    image: '',
    due_date: '',
  }

  const validationSchema = yup.object().shape({
    title: yup.string().min(5, "El titulo debe contener al menos 5 caracteres").required("Titulo es requerido"),
    description: yup.string().required("Debe completar el campo descripción"),
    image: yup.string().matches(jpgRegExp, {message: "Debe contener una imagen .jpg o .png"}).required("Imagen es requerido"),
    due_date: yup.date().required('Completar el campo fecha'),
  });

  const onSubmit = () => {

    const file = imgRef.current.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function() {
      setImgPreview(fileReader.result)
      onSubmitService(
        id,
        values.title,
        values.description,
        fileReader.result,
        parseInt(values.due_date),
        resetForm,
        setSubmitting,
      );
    }
      fileReader.oneerror = () => {
        setSubmitting(false);
        alert("Error al cargar la imagen");
      }
      fileReader.readAsDataURL(file);
  }

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setValues,
    setSubmitting,
    values,
    resetForm,
    touched,
    errors
  } = formik;

  useEffect(() => {
    if (id) {
      setBusca(() => (true))
      axios
      .get(`https://ongapi.alkemy.org/public/api/projects/${id}`)
      .then(res => {
        setValues(() => ({
          ...res,
          title: res.data.data.title,
          description: res.data.data.description,
          image: '',
          due_date: '',
        }))
        setImgPreview(() => (res.data.data.image))
        setBusca(() => (false))
      })
    }
    }, [ id, setValues ])

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
              placeholder="Título del proyecto">
              </input>
              <div>{ errors.name && touched.name && <span className='error-message'>{ errors.name }</span> }</div>
            </div>
            <div className='box'>
                    <h2>Descripción:</h2>
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
                    <div>{ errors.description && touched.description && <span className='error-message'>{ errors.description }</span> }</div>
                </div>
            <div>
              <h3>Imagen</h3>
              <input 
              className="input-field" 
              type="text" 
              name="image" 
              value={values.image} 
              onBlur={handleBlur}
              onChange={handleChange} 
              placeholder="Insertar imagen en jpg o png">
              </input>
              <div>{ errors.name && touched.name && <span className='error-message'>{ errors.name }</span> }</div>
            </div> 
            <div>
              <h3>Fecha</h3>
              <input 
              className="input-field" 
              type="date" 
              name="fecha" 
              value={values.due_date} 
              onBlur={handleBlur}
              onChange={handleChange} 
              placeholder="Ingresar la fecha correspondiente">
              </input>
              <div>{ errors.name && touched.name && <span className='error-message'>{ errors.name }</span> }</div>
            </div>  
            <div className='preview-image-container'>
                    { id 
                        ? 
                            <div>
                                <div className='image-Preview' style={{ content: `url(${imgPreview})` }}></div>
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