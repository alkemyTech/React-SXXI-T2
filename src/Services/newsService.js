import axios from 'axios';

export const onSubmitServicePUT = (id, name, content, category_id, image, updateImage) => {

    if ( updateImage === true ) {
        axios.put(`https://ongapi.alkemy.org/api/news/${id}`, {
            name: name,
            content: content,
            image: image,
            category_id: category_id
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        axios.put(`https://ongapi.alkemy.org/api/news/${id}`, {
            name: name,
            content: content,
            category_id: category_id
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const onSubmitServicePOST = (name, content, category_id, resetForm, image) => {
    
    axios.post(`https://ongapi.alkemy.org/api/news`, {
        name: name,
        content: content,
        image: image,
        category_id: category_id
        
    })
        .then((res) => {
            console.log(res)
            alert('Alta exitosa');
            return resetForm();
        })
        .catch((error) => {
            console.log(error);
        })
}
