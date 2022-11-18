import axios from 'axios';
import { notification, message } from 'antd';

const endPoint = 'https://ongapi.alkemy.org/api'

const config = {
    headers: {
        Group: 2             
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