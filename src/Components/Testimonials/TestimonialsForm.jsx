import React, { useState, useRef, useEffect } from 'react';
import '../FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { onSubmitService } from '../../Services/testimonialService.js'

// const TestimonialForm = () => {

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             image: '',
//             description: ''
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().min(4, 'El Título debe contener al menos 4 letras.').required('El Titulo no puede quedar vacío.'),
//             description: Yup.string().required('La descripción no puede quedar vacía.'),
//             image: Yup.mixed().required('La imagen es requerida')
//         }),
//         onSubmit: ( formData ) => {
//             console.log(formData);
//         }
//     })

    // const [initialValues, setInitialValues] = useState({
    //    name: '',
    //    description: '' 
    // });

    // const handleChange = (e) => {
    //     if(e.target.name === 'name'){
    //         // console.log(e.target.value);
    //         setInitialValues({...initialValues, name: e.target.value})
    //     }
    // }

    // const handleChangeCKEditor = (e, editor) => {
    //     const data = editor.getData().replace(/(<([^>]+)>)/gi, ""); 
    //     // console.log(data);
    //     setInitialValues({...initialValues, description: data});
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(initialValues);
    //     axios .post('https://ongapi.alkemy.org/api/testimonials', {
    //         id: 321563351,
    //         name: 'asd',
    //         image: 'img',
    //         description: 'description',
    //         created_at: '2022-11-11 ',
    //     } )
    //         .then(res => {
    //             console.log(res)
    //         })
    // }



//     return (
//         <>
//             <form className="form-container" onSubmit={formik.handleSubmit}>
//                 <input className="input-field" type="text" name="name" onChange={formik.handleChange} placeholder="Testimonial Title" ></input>
//                 { formik.errors.name ? <p>{formik.errors.name}</p>  : '' }

//                 <CKEditor 
//                     editor={ ClassicEditor }
//                     // onChange={(e, editor) => {
//                     // handleChangeCKEditor(e,editor)
//                     // }}
//                     onChange={formik.handleCKEditor}
//                 />
//                 { formik.errors.description ? <p>{formik.errors.description}</p>  : '' }
                
//                 <input className="input-field" type="file" name="image" accept='image/png, image/jpg' onChange={(event) => {
//                     formik.setFieldValue('image', event.currentTarget.files[0])
//                 }} ></input>
//                 { formik.errors.image ? <p>{formik.errors.image}</p>  : '' }

//                 <button className="submit-btn" type="submit">Send</button>

//             </form>
            
//         </>
        
//     );
// }


const TestimonialForm = () => {

    const { id } = useParams();
    const imageRef = useRef();
    
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ busca, setBusca ] = useState(false); 


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
    const { handleSubmit, handleChange, handleBlur, setFieldValue, setFieldTouched, setValues, isSubmitting, setSubmitting, resetForm, values, touched, errors } = formik;

    useEffect(() => {
        if (id) {
            setBusca(() => (true))
            axios.get(`https://ongapi.alkemy.org/api/testimonials/${id}`)
                .then( res => {
                    console.log(res);
                    setValues(() => ({
                        ...res,
                        name: res.data.data.name,
                        description: res.data.data.description,
                        // image: res.data.data.image
                    }))
                    // setImagePreview(() => ( res.data.data.image ));
                    setBusca(() => ( false ));
                })
        }
    }, [id, setValues]);

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Título:</h2>
                <input className="input-field" type="text" name="name" value={values.name} onBlur={handleBlur} onChange={handleChange} placeholder='Ingrese el Título del Testimonio' />
                <div className='errors'>{ errors.name && touched.name && <span>{ errors.name }</span> }</div>

                <div >
                    <h2>Descripción:</h2>
                    <CKEditor 
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
                </div>
                
                <div>
                    <h2>Ingrese una Imagen:</h2>
                    <input className='input-field' type="file" ref={ imageRef } name='image' value={ values.image } onBlur={ handleBlur } onChange={ handleChange } />
                    <div className='errors'>{ errors.image && touched.image && <span>{ errors.image }</span> }</div>
                    
                    {/* <div>
                        { id 
                            ? <div style={{ backgroundImage: `url(${imagePreview})` }}></div>
                            : null
                        }
                        
                    </div> */}

                </div>

                <button className="submit-btn" type="submit" >Enviar</button>
            </form>
        </>
    )
}



export default TestimonialForm;