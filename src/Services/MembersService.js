import axios from 'axios';
import { postData } from './privateApiService';
import { successAlert } from "./alertService";

export const onSubmitServicePUT = (id, name, description, image, facebookURL, linkedinURL, updateImage) => {

    if ( updateImage === true ) {
        axios.put(`https://ongapi.alkemy.org/api/members/${id}`, {
            name: name,
            description: description,
            image: image,
            facebookUrl: facebookURL,
            linkedinUrl: linkedinURL
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        axios.put(`https://ongapi.alkemy.org/api/members/${id}`, {
            name: name,
            description: description,
            facebookUrl: facebookURL,
            linkedinUrl: linkedinURL
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const onSubmitServicePOST = (name, description, resetForm, image, facebookURL, linkedinURL) => {

    let body = {
        name: name,
        description: description,
        image: image,
        facebookUrl: facebookURL,
        linkedinUrl: linkedinURL
    }

    postData( '/members', body )
        .then((res) =>{
            successAlert("¡Éxito!", "Modificación exitosa.", "¡Ok!");
            return resetForm();
        })

}