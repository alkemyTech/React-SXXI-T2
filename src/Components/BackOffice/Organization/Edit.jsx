import "./EditStyle.css";
import { BackOfficeNavbar } from "../BackOfficeNavbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onSubmitServicePUT } from "./ServicesEdit.js";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const jpgRegExp = /\.(jpe?g|png)$/i;
  const imageRef = useRef();
  const [urlImage, setUrlImage] = useState(null);

  const facebookRegExp =
    /(?:https?:\/\/)?(?:www)?(.facebook)(.com|.me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w]*\/)*([\w]*)/;
  const instagramRegExp =
    /(?:https?:\/\/)?(?:www)?(.instagram)(.com|.me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w]*\/)*([\w]*)/;
  const twitterRegExp =
    /(?:https?:\/\/)?(?:www)?(.twitter)(.com|.me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w]*\/)*([\w]*)/;
  const linkedinRegExp =
    /(?:https?:\/\/)?(?:www)?(.linkedin)(.com|.me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w]*\/)*([\w]*)/;
  const msjError = "*Campo obligatorio.";

  const initialValues = {
    name: "",
    img: "",
    shortDescription: "",
    longDescription: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(msjError),
    img: Yup.string()
      .matches(jpgRegExp, {
        message: "La imagen debe ser un archivo .jpg o .png",
        excludeEmptyString: true,
      })
      .required(msjError),

    shortDescription: Yup.string().required(msjError),
    longDescription: Yup.string().required(msjError),
    facebook: Yup.string().required(msjError).matches(facebookRegExp, {
      message: "No cumple con el formato válido EJ www.facebook.com/",
    }),
    instagram: Yup.string().required(msjError).matches(instagramRegExp, {
      message: "No cumple con el formato válido EJ www.instagram.com/",
    }),
    twitter: Yup.string().required(msjError).matches(twitterRegExp, {
      message: "No cumple con el formato válido EJ www.twitter.com/",
    }),
    linkedin: Yup.string().required(msjError).matches(linkedinRegExp, {
      message: "No cumple con el formato válido EJ www.linkedin.com/",
    }),
  });

  const onSubmit = (values) => {
    try {
      onSubmitServicePUT(
        id,
        values.name,
        urlImage,
        values.shortDescription,
        values.longDescription,
        values.facebook,
        values.linkedin,
        values.instagram,
        values.twitter
      );
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setValues,
  } = formik;

  const convertToBase64 = () => {
    const file = imageRef.current.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    console.log("Muestro file", file);
  };

  useEffect(() => {
    if ( values.image ) convertToBase64();
}, [values])

  useEffect(() => {
    if (id) {
      axios
        .get(`https://ongapi.alkemy.org/api/organization/${id}`)
        .then((res) => {
          const url = res.data.data.logo;
          setUrlImage(url);
          setValues((previousValues) => {
            return {
              ...previousValues,
              name: res.data.data.name,
              //img: res.data.data.logo,
              shortDescription: res.data.data.short_description,
              longDescription: res.data.data.long_description,
              facebook: res.data.data.facebook_url,
              linkedin: res.data.data.linkedin_url,
              instagram: res.data.data.instagram_url,
              twitter: res.data.data.twitter_url,
            };
          });
        });
    }
  }, [id]);

  return (
    <>
      <BackOfficeNavbar />
      <form className="frmEdit" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          className=""
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        ></input>
        {errors.name && touched.name && (
          <div className="msjError">{errors.name}</div>
        )}
        <label>Imagen (formato válido: JPG/PNG)</label>
        <input
          type="file"
          name="img"
          ref={imageRef}
          value={values.img}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.img && touched.img && (
          <div className="msjError">{errors.img}</div>
        )}
        <label>Vista previa de imagen actual</label>
        <div style={{ content: `url(${urlImage})` }}></div>
        <label>Descripción corta</label>
        <CKEditor
          editor={ClassicEditor}
          data={values.shortDescription}
          config={{ placeholder: "Escriba una Descripción" }}
          onfocus={(event, editor) => {
            editor.setData(values.shortDescription);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setFieldValue("shortDescription", data);
          }}
          onBlur={(event, editor) => {
            setFieldTouched("shortDescription");
          }}
        />
        {errors.shortDescription && touched.shortDescription && (
          <div className="msjError">{errors.shortDescription}</div>
        )}

        <label>Descripción larga</label>
        <input
          type="text"
          name="longDescription"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.longDescription}
        ></input>
        {errors.longDescription && touched.longDescription && (
          <div className="msjError">{errors.longDescription}</div>
        )}
        <h4 className="socialNetworks">Redes sociales</h4>
        <label>Facebook</label>
        <input
          type="text"
          name="facebook"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.facebook}
        ></input>
        {errors.facebook && touched.facebook && (
          <div className="msjError">{errors.facebook}</div>
        )}
        <label>Instagram</label>
        <input
          type="text"
          name="instagram"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.instagram}
        ></input>
        {errors.instagram && touched.instagram && (
          <div className="msjError">{errors.instagram}</div>
        )}
        <label>Twitter</label>
        <input
          type="text"
          name="twitter"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.twitter}
        ></input>
        {errors.twitter && touched.twitter && (
          <div className="msjError">{errors.twitter}</div>
        )}
        <label>LinkendIn</label>
        <input
          type="text"
          name="linkedin"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.linkedin}
        ></input>
        {errors.linkedin && touched.linkedin && (
          <div className="msjError">{errors.linkedin}</div>
        )}

        <button className="btnUpdate" type="submit">
          Actualizar
        </button>
      </form>
    </>
  );
}
export default Edit;
