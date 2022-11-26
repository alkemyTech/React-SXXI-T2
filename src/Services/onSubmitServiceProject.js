import axios from 'axios'

function onSubmitServiceProject(id, name, descripción, imageBase64, due_date, resetForm, setSubmitting) {
  if (id) {
    axios
    .put(`https://ongapi.alkemy.org/public/api/projects/${id}`, {
        name: name,
        descripción: descripción,
        image: imageBase64,
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
        name: name,
        descripción: descripción,
        imageBase64: imageBase64,
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