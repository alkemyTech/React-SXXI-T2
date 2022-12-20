import axios from 'axios';
import { message } from 'antd';

const endPoint = 'https://ongapi.alkemy.org/api';
const config = {
    header: { 
        accept: 'application/json', 
        'Content-Type': 'application/json' 
    } 
}

export const getOrganization = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/organization`, config);
        return data.data;
    } catch (error) {
        message.error("Ha ocurrido un error")
        console.error(error);
    }
}