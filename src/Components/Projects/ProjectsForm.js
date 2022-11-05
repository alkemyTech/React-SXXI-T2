import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const ProjectsForm = () => {
  const { admin, userName } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    img: '',
    due_date: ''
  })

  const validationSchema = yup.object().shape({
    title: yup.string().required("Titulo es requerido"),
    status: yup.string().required("Estado es requerido"),
    priority: yup.string().required("Prioridad es requerido"),
    description: yup.string().required("Descripcion es requerido"),
  });

  const handleChange = (e) => {
    if(e.target.name === 'title'){
      setInitialValues({...initialValues, title: e.target.value})
    } if(e.target.name === 'description'){
      setInitialValues({...initialValues, description: e.target.value})
    }
  }

  const onSubmit = () => {
    const postProyect = async () => {
      await axios.post(process.env.REACT_APP_API_TASKS, {
        ...values,
        dateTime: new Date(),
        creator: userName,
        admin,
      });
    };
    postTask();
  };

  // eslint-disable-next-line no-undef
  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = formik;

  return (

    <>
      <section className="task-form">
        <h2>Crear tarea</h2>
        <p>Crea tus tareas</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="text"
                name="title"
                value={initialValues.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Titulo"
                className={errors.title && touched.title ? "error" : ""}
              />
              {errors.title && touched.title && <div>{errors.title}</div>}
            </div>
            <div>
            <input
                type="text"
                name="description"
                value={initialValues.description} 
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write some description"
                className={errors.title && touched.title ? "error" : ""}
              />
              {errors.title && touched.title && <div>{errors.title}</div>}
            </div>
          <button className="submit-btn" type="submit">Send</button>
          </div>
        </form>
      </section>
    </>
  );
}
 
export default ProjectsForm;