import axios from 'axios';
import { notification, message } from 'antd';

const endPoint = 'https://ongapi.alkemy.org/api'

const config = {
    headers: {
        Group: 2             
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
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

export default Get