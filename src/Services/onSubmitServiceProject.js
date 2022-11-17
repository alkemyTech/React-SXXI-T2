import axios from 'axios'

function onSubmitServiceProject(id, title, descripción, image, due_date, resetForm, setSubmitting) {
  if (id) {
    axios
    .put(`https://ongapi.alkemy.org/public/api/projects/${id}`, {
        title: title,
        descripción: descripción,
        image: image,
        due_date: due_date
    })
    .then((res) => {
        alert('Modificación exitosa');
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        setSubmitting(false);
    })
  } else {
    axios
    .post(`https://ongapi.alkemy.org/public/api/projects`, {
        title: title,
        descripción: descripción,
        image: image,
        due_date: due_date
    })
    .then((res) => {
        alert('Creación exitosa');
        return resetForm();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        setSubmitting(false);
    })

  }
}

export default onSubmitServiceProject