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

export const postNewUser = async ( userValues ) => {
    try {
        const values = { ...userValues, role_id: parseInt(userValues.role_id) }
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
