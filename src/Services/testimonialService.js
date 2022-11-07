import axios from "axios"

export const onSubmitService = ( id, name, description, imageBase64, resetForm, setSubmitting ) => {

    if ( id ) {
        axios.put(`https://ongapi.alkemy.org/api/testimonials/${id}`, {
            name: name,
            description: description,
            image: imageBase64
        })
            .then((res) => {
                console.log(res);
                alert('Acción exitosa.')
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setSubmitting(false);
            })
    } else {
        axios.post(`https://ongapi.alkemy.org/api/testimonials/${id}`, {
            name: name,
            description: description,
            image: imageBase64
        })
            .then((res) => {
                console.log(res);
                alert('Acción exitosa.')
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
