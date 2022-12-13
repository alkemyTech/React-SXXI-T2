import axios from 'axios';

export const onSubmitServicePUT = (id, name, description, image, order, updateImage) => {
    
    if ( updateImage === true ) {
        axios.put(`https://ongapi.alkemy.org/api/slides/${id}`, {
            name: name,
            description: description,
            image: image,
            order: order
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        axios.put(`https://ongapi.alkemy.org/api/slides/${id}`, {
            name: name,
            description: description,
            order: order
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const onSubmitServicePOST = (name, description, order, resetForm, image) => {

    axios.post(`https://ongapi.alkemy.org/api/slides`, {
        name: name,
        description: description,
        image: image,
        order: order
    })
        .then((res) => {
            alert('Alta exitosa');
            return resetForm();
        })
        .catch((error) => {
            console.log(error);
        })
}