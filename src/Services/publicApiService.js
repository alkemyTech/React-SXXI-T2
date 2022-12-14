import axios from 'axios';
import { notification, message } from 'antd';
import { errorAlert } from './alertService';

const endPoint = 'https://ongapi.alkemy.org/api'

const config = {
    headers: {
        accept: 'application/json', 
        'Content-Type': 'application/json',
        Group: 2 ,
    }
}

export const publicGetData = async ( id, destinationPath ) => {
    let url = endPoint;

    id
        ? url = url + destinationPath + '/' + id
        : url = url + destinationPath;

    try {
        const { data } = await axios.get(url, config)
        return data;
    } catch (err) {
        errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
        console.log(err.message);
    }

}

export const publicPostData = async ( destinationPath, body ) => {
    try {
        const { data } = await axios.post( `${endPoint}${destinationPath}`, body, config );
        return data;
    } catch (err){
        errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
        console.log(err.message);
    }
}

export const postNewUser = async ( userValues ) => {
    try {
        const values = { ...userValues, role_id: parseInt(userValues.role_id) }
        if (!userValues.profile_image)
            delete values.profile_image;
        const config = { 
            header: { 
                accept: 'application/json', 
                'Content-Type': 'application/json' 
            } 
        };
        const { data } = await axios.post(`${endPoint}/users`, values, config);
        notification['success']({
            message: '¡Creacion exitosa!',
            description: `El usuario "${data.data.name}" fue creado con exito`,
            duration: 7,
          });
    } catch (err){
        message.error("Ha ocurrido un error")
        console.log(err.message);
    }
}

export const putUser = async ( userValues, id ) => {
    try {
        const values = { ...userValues, role_id: parseInt(userValues.role_id) }
        if (!userValues.profile_image)
            delete values.profile_image;
        const config = { 
            header: { 
                accept: 'application/json', 
                'Content-Type': 'application/json' 
            } 
        };
        const { data } = await axios.put(`${endPoint}/users/${id}`, values, config);
        notification['success']({
            message: '¡Modificacion exitosa!',
            description: `El usuario "${data.data.name}" fue modificado con exito`,
            duration: 7,
          });
    } catch (err){
        message.error("Ha ocurrido un error")
        console.log(err.message);
    }
}

export const getUser = async (id) => {
    try {
        const { data } = await axios.get(`${endPoint}/users/${id}`);
        const userData = {
            name: data.data.name,
            email: data.data.email,
            role_id: data.data.role_id,
            profile_image: data.data.profile_image,
            password: data.data.password,
            group_id: data.data.group_id,
        }
        return userData
    } catch (error) {
        console.error(error);
    }
}

export const getOrganizationData = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/organization`, config)
        const organizationData = {
            logo: data.data.logo,
            name: data.data.name,
            shortDescription: data.data.short_description,
        }
        return organizationData
    } catch (error) {
        console.error(error);
    }
}

export const getOrgContactData = async () => {
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

export const postContactValues = async (contactValues) => {
    try {
        let api = `${endPoint}/contacts`;
        const config = { 
            header: { 
                accept: 'application/json', 
                'Content-Type': 'application/json' 
            } 
        };
        const { data } = await axios.post(api, contactValues, config);
        notification['success']({
            message: 'Enviado',
            description: `La informacion del contacto ${data.data.name} ha sido enviada correctamente.`,
            duration: 7,
        });
    } catch (err){
        message.error("Ha ocurrido un error")
    }
}

export const getSliderImages = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/slides`)
        const images = [...data.data]
        return images
    } catch (error) {
        console.log(error);
    }
}

export const putWelcomeText = async (organizationData) => {
    try {
        let api = `${endPoint}/organization/${organizationData.id}`;
        const dataToUpdate = { 
            welcome_text: organizationData.welcome_text, 
            group_id: organizationData.group_id, 
            name: organizationData.name,
        };
        const config = { 
            header: { 
                accept: 'application/json', 
                'Content-Type': 'application/json' 
            } 
        };
        const { data } = await axios.put(api, dataToUpdate, config);
        notification['success']({
            message: 'Texto de bienvenida actualizado',
            description:
            `El texto de bienvenida fue actualizado a: 
            "${data.data.welcome_text}"`,
            duration: 7,
        });
    } catch (err){
        message.error("Ha ocurrido un error")
    }
}

export const putSlidesHome = async (slides, slidesChanged) => {
    try {
        const config = { 
            header: { 
                accept: 'application/json', 
                'Content-Type': 'application/json' 
            } 
        };

        if (slidesChanged.firstSlide) {
            const api = `${endPoint}/slides/${slides.firstSlideId}`;
            const dataToUpdate = { 
                name: slides.firstSlideText, 
                image: slides.firstSlideImg, 
            };
            await axios.put(api, dataToUpdate, config);
        }

        if (slidesChanged.secondSlide) {
            const api = `${endPoint}/slides/${slides.secondSlideId}`;
            const dataToUpdate = { 
                name: slides.secondSlideText, 
                image: slides.secondSlideImg, 
            };
            await axios.put(api, dataToUpdate, config);
        }

        if (slidesChanged.thirdSlide) {
            const api = `${endPoint}/slides/${slides.thirdSlideId}`;
            const dataToUpdate = { 
                name: slides.thirdSlideText, 
                image: slides.thirdSlideImg, 
            };
            await axios.put(api, dataToUpdate, config);
        }

        notification['success']({
            message: 'Slides actualizados con exito',
            duration: 7,
        });
    } catch (e){
        message.error("Ha ocurrido un error")
        console.log(e.message);
    }
}

export const getOrganization = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/organization`);
        const organizationData = { 
            name: data.data.name, 
            welcome_text:  data.data.welcome_text, 
            id: data.data.id
        }
        return organizationData
    } catch (e) {
        message.error("Ha ocurrido un error");
        console.log(e.message);
    }
}

export const getSlides = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/slides`);
        return data.data
    } catch (e) {
        message.error("Ha ocurrido un error");
        console.log(e.message);
    }
}
