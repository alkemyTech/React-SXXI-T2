import { successAlert } from './alertService';
import { publicGetData, publicPostData } from './publicApiService';

export const getOrgContactData = async () => {
    let orgContactData
    await publicGetData(1 ,"/organization").then( data =>
        orgContactData = {
            address: data.data.address, 
            phone:  data.data.phone, 
            facebook_url: data.data.facebook_url,
            linkedin_url: data.data.linkedin_url,
            instagram_url: data.data.instagram_url,
            twitter_url: data.data.twitter_url,
        }
    )
    return orgContactData;
}

export const onSubmitServicePOST = async (contactValues) => {
    publicPostData("/contacts", contactValues)
        .then( data => {
            if(data)
                successAlert("Enviado con éxito", "La información de contacto se envió exitosamente", "Volver")
        }) 
}
