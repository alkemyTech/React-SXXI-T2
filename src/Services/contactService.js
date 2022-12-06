import axios from 'axios';
import { successAlert } from './alertService';
import { publicPostData } from './publicApiService';

const endPoint = 'https://ongapi.alkemy.org/api'

export const getOrgContactData = async () => {
    // cuando se apruebe el PR de publicGetData reemplazar
    try {
        const { data } = await axios.get(`${endPoint}/organization`)
        const orgContactData = {
            address: data.data.address, 
            phone:  data.data.phone, 
            facebook_url: data.data.facebook_url,
            linkedin_url: data.data.linkedin_url,
            instagram_url: data.data.instagram_url,
            twitter_url: data.data.twitter_url,
        }
        return orgContactData
    } catch (error) {
        console.error(error);
    }
}

export const onSubmitServicePOST = async (contactValues) => {
    publicPostData("/contacts", contactValues)
        .then( data => {
            if(data)
                successAlert("Enviado con éxito", "La información de contacto se envió exitosamente", "Volver")
        }) 
}
