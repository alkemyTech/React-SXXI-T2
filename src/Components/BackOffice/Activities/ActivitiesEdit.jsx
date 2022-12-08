import { useRef, useEffect, useState } from "react";
import { onSubmitServicePUTEdit } from "./servicesActivitiesEdit";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";
import axios from "axios";

function ActivitiesEdit() {
  const [urlImage, setUrlImage] = useState("");
  const [file, setFile] = useState("");
  const { id } = useParams();
  const jpgRegExp = /\.(jpe?g|png)$/i;
  const msjError = "*Campo obligatorio.";
  const imageRef = useRef();

  const initialValues = {
    name: "",
    image: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(msjError),
    image: urlImage
      ? Yup.string().matches(jpgRegExp, {
          message: "La imagen debe ser un archivo .jpg o .png",
          excludeEmptyString: true,
        })
      : Yup.string()
          .matches(jpgRegExp, {
            message: "La imagen debe ser un archivo .jpg o .png",
            excludeEmptyString: true,
          })
          .required(msjError),
    description: Yup.string().required(msjError),
  });

  const onSubmit = (values) => {
    try {
      onSubmitServicePUTEdit(id, values.name, file, values.description);
    } catch (error) {
      console.log(error);
    }
  };

  const convertToBase64 = () => {
    const file = imageRef.current.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = function (event) {
      let base64 = fileReader.result;
      setFile(base64);
      setUrlImage(base64);
    };
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

  useEffect(() => {
    if (values.image) convertToBase64();
  }, [values.image]);

  useEffect(() => {
    axios.get(`https://ongapi.alkemy.org/api/activities/${id}`).then((res) => {
      const url = res.data.data.image;
      setUrlImage(url);
      setValues((previousValues) => {
        return {
          ...previousValues,
          name: res.data.data.name,
          description: res.data.data.description,
        };
      });
    });
  }, [id, setValues]);

  useEffect(() => {
    setUrlImage(values.image);
  }, [values.image]);

  return (
    <>
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
          name="image"
          ref={imageRef}
          value={values.image}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.image && touched.image && (
          <div className="msjError">{errors.image}</div>
        )}
        <label>Vista previa de imagen actual</label>
        <img src={urlImage ? urlImage : null} alt="" />

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

        <button className="btnUpdate" type="submit">
          Actualizar
        </button>
      </form>
    </>
  );
}

export default ActivitiesEdit;
