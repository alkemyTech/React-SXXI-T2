import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { getSlides, putSlidesHome } from "../../../Services/publicApiService";
import { UploadOutlined } from '@ant-design/icons';

export const SlidesHomeForm = () => {
    const [slides, setSlides] = useState({});
    const [slideChanged, setSlideChanged] = useState({
        firstSlide: false,
        secondSlide: false,
        thirdSlide: false,
    })

    const initialValues = { 
        firstSlideImg: "",
        secondSlideImg: "",
        thirdSlideImg: "",
        firstSlideText: "",
        secondSlideText: "",
        thirdSlideText: ""
    };
    const required = "* Campo obligatorio";
    
    const getExtension = path => {
        return path.slice(-3).toLowerCase();
    }

    const convertToBase64 = (name) => {
        let input = document.getElementById(name);
        let fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
            let base64 = fReader.result;
            if(name.includes("first"))
                setSlides(currValues => ({ ...currValues, firstSlideImg: base64 }))
            if(name.includes("second"))
                setSlides(currValues => ({ ...currValues, secondSlideImg: base64 }))
            if(name.includes("third"))
                setSlides(currValues => ({ ...currValues, thirdSlideImg: base64 }))
        }
    }

    const validationSchema = () =>
        Yup.object().shape({
            firstSlideImg: Yup.mixed()
                .test({
                    message: 'El formato debe ser jpg o png',
                    test: file => (!file || ['png', 'jpg'].includes(getExtension(file)))
                }),
            secondSlideImg: Yup.mixed()
                .test({
                    message: 'El formato debe ser jpg o png',
                    test: file => (!file || ['png', 'jpg'].includes(getExtension(file)))
                }),
            thirdSlideImg: Yup.mixed()
                .test({
                    message: 'El formato debe ser jpg o png',
                    test: file => (!file || ['png', 'jpg'].includes(getExtension(file)))
                }),
            firstSlideText: Yup.string().required(required),
            secondSlideText: Yup.string().required(required),
            thirdSlideText: Yup.string().required(required),
        });
    
    const onSubmit = async () => {
        await putSlidesHome(slides, slideChanged);
    }

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        values,
    } = useFormik({ initialValues, validationSchema, onSubmit });

    useEffect(() => {
        getSlides().then( data => {
            setSlides({
                firstSlideImg: data[0].image,
                secondSlideImg: data[1].image,
                thirdSlideImg: data[2].image,
                firstSlideText: data[0].name,
                secondSlideText: data[1].name,
                thirdSlideText: data[2].name,
                firstSlideId: data[0].id,
                secondSlideId: data[1].id,
                thirdSlideId: data[2].id
            })
            values.firstSlideText = data[0].name;
            values.secondSlideText = data[1].name;
            values.thirdSlideText = data[2].name;
        }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSlides(currValues => ({ 
            ...currValues,
            firstSlideText: values.firstSlideText,
            secondSlideText: values.secondSlideText,
            thirdSlideText: values.thirdSlideText 
        }))
    }, [values.firstSlideText, values.secondSlideText, values.thirdSlideText])
    
    useEffect(() => {
        if (values.firstSlideImg) {
            convertToBase64("firstSlideImg");
            setSlideChanged(currValues => ({ ...currValues, firstSlide: true }))
        }
        if (values.secondSlideImg) {
            convertToBase64("secondSlideImg");
            setSlideChanged(currValues => ({ ...currValues, secondSlide: true }))
        }
        if (values.thirdSlideImg) {
            convertToBase64("thirdSlideImg");
            setSlideChanged(currValues => ({ ...currValues, thirdSlide: true }))
        }
    }, [values.firstSlideImg, values.secondSlideImg, values.thirdSlideImg])

  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <h2>Slides</h2>
        { Object.keys(slides).length && 
        <>
            <ul id='slides-home'>
                <li>
                    <img src={slides.firstSlideImg} alt="first-slide-img" />
                    {errors.firstSlideImg && (
                        <span className="error-message">{errors.firstSlideImg}</span>
                    )}
                    <input 
                        type="text" 
                        className={errors.firstSlideText && touched.firstSlideText ? "error input-slide" : "input-field input-slide"}
                        name="firstSlideText"
                        value={values.firstSlideText}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre del slide"
                        hidden={!slideChanged.firstSlide}
                    />
                    {errors.firstSlideText && touched.firstSlideText && (
                        <span className="error-message">{errors.firstSlideText}</span>
                    )}
                    <label className='upload-img-btn'>
                        <UploadOutlined />
                        <input 
                            type="file" 
                            id="firstSlideImg"
                            name="firstSlideImg"
                            accept="image/png, image/jpeg" 
                            value={values.firstSlideImg}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            hidden 
                        />
                    </label>
                </li>
                <li>
                    <img src={slides.secondSlideImg} alt="second-slide-img" />
                    {errors.secondSlideImg && (
                        <span className="error-message">{errors.secondSlideImg}</span>
                    )}
                    <input 
                        type="text" 
                        className={errors.secondSlideText && touched.secondSlideText ? "error input-slide" : "input-field input-slide"}
                        name="secondSlideText"
                        value={values.secondSlideText}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre del slide" 
                        hidden={!slideChanged.secondSlide}
                    />
                    {errors.secondSlideText && touched.secondSlideText && (
                        <span className="error-message">{errors.secondSlideText}</span>
                    )}
                    <label className='upload-img-btn'>
                        <UploadOutlined />
                        <input 
                            type="file" 
                            id="secondSlideImg"
                            name="secondSlideImg"
                            accept="image/png, image/jpeg" 
                            value={values.secondSlideImg}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            hidden 
                        />
                    </label>
                </li>
                <li>
                    <img src={slides.thirdSlideImg} alt="third-slide-img" />
                    {errors.thirdSlideImg && (
                        <span className="error-message">{errors.thirdSlideImg}</span>
                    )}
                    <input 
                        type="text" 
                        className={errors.thirdSlideText && touched.thirdSlideText ? "error input-slide" : "input-field input-slide"}
                        name="thirdSlideText"
                        value={values.thirdSlideText}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre del slide"
                        hidden={!slideChanged.thirdSlide}
                    />
                    {errors.thirdSlideText && touched.thirdSlideText && (
                        <span className="error-message">{errors.thirdSlideText}</span>
                    )}
                    <label className='upload-img-btn'>
                        <UploadOutlined />
                        <input 
                            type="file" 
                            id="thirdSlideImg"
                            name="thirdSlideImg"
                            accept="image/png, image/jpeg" 
                            value={values.thirdSlideImg}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            hidden 
                        />
                    </label>
                </li>
            </ul>
            <button type="submit" className="submit-btn slide-btn">Guardar</button>
        </> }
    </form>
  )
}
