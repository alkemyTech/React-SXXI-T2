import axios from 'axios';

export const onSubmitServicePUT = (id, name, description, image, updateImage) => {

    if ( updateImage === true ) {
        console.log('UPDATEA IMAGE')
        axios.put(`https://ongapi.alkemy.org/api/categories/${id}`, {
            name: name,
            description: description,
            image: image
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        console.log('NO UPDATEA IMAGE')
        axios.put(`https://ongapi.alkemy.org/api/categories/${id}`, {
            name: name,
            description: description
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const onSubmitServicePOST = (name, description, resetForm, image) => {

    axios.post(`https://ongapi.alkemy.org/api/categories`, {
        name: name,
        description: description,
        image: image
    })
        .then((res) => {
            alert('Alta exitosa');
            return resetForm();
        })
        .catch((error) => {
            console.log(error);
        })
}
