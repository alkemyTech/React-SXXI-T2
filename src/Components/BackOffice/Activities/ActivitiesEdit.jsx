import "./ActivitiesStyles.css";
import { BackOfficeNavbar } from "../BackOfficeNavbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { onSubmitServicePUT } from "./ServicesEdit.js";
import axios from "axios";

const initialValues = {
  name: "",
  img: "",
  description: "",
};

const jpgRegExp = /\.(jpe?g|png)$/i;
const msjError = "*Campo obligatorio.";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(msjError),
  description: Yup.string().required(msjError),
  img: Yup.string()
    .matches(jpgRegExp, {
      message: "La imagen debe ser un archivo .jpg o .png",
      excludeEmptyString: true,
    })
    .required(msjError),
});

function Edit() {
  const onSubmit = (values) => {
    onSubmitServicePUT(
      id,
      values.name,
      values.description,
      values.img,
    );
    console.log("Paso las validaciones");
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

  const { id } = useParams();
  const imageRef = useRef();

  const convertToBase64 = (image = imageRef.current.files[0]) => {
    const file = image;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (values.img) convertToBase64();
  }, [values]);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://ongapi.alkemy.org/api/activities/${id}`)
        .then((res) => {
          setValues((previousValues) => {
            return {
              ...previousValues,
              name: res.data.data.name,
              description: res.data.data.description,
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
        <label>Descripción</label>
        <CKEditor
          editor={ClassicEditor}
          data={values.description}
          config={{ placeholder: "Escriba una Descripción" }}
          onfocus={(event, editor) => {
            editor.setData(values.description);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setFieldValue("description", data);
          }}
          onBlur={(event, editor) => {
            setFieldTouched("description");
          }}
        />
        {errors.description && touched.description && (
          <div className="msjError">{errors.description}</div>
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

        <button className="btnUpdate" type="submit">
          Actualizar
        </button>
      </form>
    </>
  );
}
export default Edit;
