import axios from 'axios';

export const onSubmitService = ( id, name, description, imageBase64, order, resetForm, setSubmitting ) => {
    if ( id ) {

        axios.put(`https://ongapi.alkemy.org/api/slides/${id}`, {
            name: name,
            description: description,
            image: imageBase64,
            order: order
        })
            .then((res) => {
                console.log(res);
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setSubmitting(false);
            })
    } else {
        axios.post(`https://ongapi.alkemy.org/api/slides`, {
            name: name,
            description: description,
            image: imageBase64,
            order: order
        })
            .then((res) => {
                console.log(res);
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
