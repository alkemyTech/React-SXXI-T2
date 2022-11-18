import axios from 'axios';

export const onSubmitService = ( id, name, description, imageBase64, resetForm, setSubmitting ) => {
    if ( id ) {

        axios.put(`https://ongapi.alkemy.org/api/categories/${id}`, {
            name: name,
            description: description,
            image: imageBase64
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
        axios.post(`https://ongapi.alkemy.org/api/categories`, {
            name: name,
            description: description,
            image: imageBase64
        })
            .then((res) => {
                alert('Alta exitosa');
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