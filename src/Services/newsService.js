import axios from "axios"
import { errorAlert, successAlert } from "./alertService";

export const onSubmitServicePUT = (id, name, description, image, updateImage) => {

    if (updateImage === true) {
        axios.put(`https://ongapi.alkemy.org/api/news/${id}`, {
            name: name,
            description: description,
            image: image
        })
            .then((res) => {
                successAlert("¡Éxito!", "Modificación exitosa.", "¡Ok!");
            })
            .catch((error) => {
                errorAlert("¡Error!", "Modificación fallida.", "¡:(!");
            })
    } else {
        axios.put(`https://ongapi.alkemy.org/api/news/${id}`, {
            name: name,
            description: description
        })
            .then((res) => {
                successAlert("¡Éxito!", "Modificación exitosa.", "¡Ok!");
            })
            .catch((error) => {
                errorAlert("¡Error!", "Modificación fallida.", "¡:(!");
            })
    }
}

export const onSubmitServicePOST = (name, description, resetForm, image) => {

    axios.post(`https://ongapi.alkemy.org/api/news`, {
        name: name,
        description: description,
        image: image
    })
        .then((res) => {
            successAlert('¡Éxito', 'Alta exitosa', '¡Ok!');
            return resetForm();
        })
        .catch((error) => {
            errorAlert("¡Error!", "Alta fallida.", "¡:(!");
        })
}

export const getNews = async (path, id) => {
    try {
        if (id) {
            const { data } = await axios.get(`https://ongapi.alkemy.org/api/news/${id}`);
            return data;
        } else if(path) {
            const { data } = await axios.get(`https://ongapi.alkemy.org/api/news${path}`);
            return data;
        } else {
            const { data } = await axios.get(`https://ongapi.alkemy.org/api/news`);
            return data;
        }
    } catch (e) {
        errorAlert("¡Error!", "Petición de novedades fallida.", "¡:(!");
    }
}

export const deleteNews = async (id) => {
    try {
        axios.delete(`https://ongapi.alkemy.org/api/news/${id}`);
    } catch (e) {
        errorAlert("¡Error!", "Petición de novedades fallida.", "¡:(!");
    }
}