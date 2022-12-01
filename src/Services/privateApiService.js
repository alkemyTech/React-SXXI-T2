import axios from 'axios';
import { message } from 'antd';

const PATH = "https://ongapi.alkemy.org/api";
const getToken = () => {
    const token = localStorage.getItem("token");
    return token 
            ? `Bearer ${token}` 
            : null
}

const config = {
    headers: {
        accept: 'application/json', 
        'Content-Type': 'application/json',
        Group: 2 ,
        Authorization: getToken()
    }
}

export const postData = async ( destinationPath, body ) => {
    try {
        const { data } = await axios.post( `${PATH}${destinationPath}`, body, config );
        return data;
    } catch (err){
        message.error("Ha ocurrido un error")
        console.log(err.message);
    }
}
