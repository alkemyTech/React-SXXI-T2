import { useRef, useEffect, useState } from "react";
import { onSubmitServicePUTCreate } from "./servicesActivitiesEdit";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";
import axios from "axios";

function ActivitiesEdit() {
  const date = new Date();
  const [urlImage, setUrlImage] = useState("");
  const [file, setFile] = useState("");
  const [dat, setDat] = useState([]);
  const [newID, setNewID] = useState(0);
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
    image: Yup.string()
      .matches(jpgRegExp, {
        message: "La imagen debe ser un archivo .jpg o .png",
        excludeEmptyString: true,
      })
      .required(msjError),
    description: Yup.string().required(msjError),
  });

  const onSubmit = (values) => {
    try {
      onSubmitServicePUTCreate(
        newID,
        values.name,
        values.description,
        file,
        date
      );
      resetForm();
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
    resetForm,
  } = formik;

  useEffect(() => {
    if (values.image) convertToBase64();
  }, [values.image]);

  useEffect(() => {
    axios.get(`https://ongapi.alkemy.org/api/activities`).then((res) => {
      setDat(res.data.data);
    });
  }, []);

  useEffect(() => {
    const numb = dat.map((n) => n.id);
    const valor = numb.pop();
    setNewID(valor + 1);
  }, [dat]);

  useEffect(() => {
    setUrlImage(values.image);
  }, [values.image]);

  return (
    <>
      <form className="frmEdit" onSubmit={handleSubmit}>
        <label>Actividad</label>
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
          Crear Actividad
        </button>
      </form>
    </>
  );
}

export default ActivitiesEdit;
