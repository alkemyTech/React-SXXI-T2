import axios from 'axios';
import { message } from 'antd';

const PATH = "https://ongapi.alkemy.org/api";

const getBearerToken = () => {
    const token = localStorage.getItem("token");
    return token 
            ? `Bearer ${token}` 
            : null
}

const setting = {
    headers: {
        accept: 'application/json', 
        'Content-Type': 'application/json',
        Group: 2 ,
        Authorization: getBearerToken()
    }
}

export const postData = async ( destinationPath, body ) => {
    try {
        const { data } = await axios.post( `${PATH}${destinationPath}`, body, setting );
        return data;
    } catch (err){
        message.error("Ha ocurrido un error")
        console.log(err.message);
    }
}

const config = {
    headers: getHeaderAuthorization()
}


const getToken = () => {
    return localStorage.getItem("token")
}

const getHeaderAuthorization = () => {
    const token = getToken();

    return token ? { 'Authorization': 'Bearer' + token, Group: 02 } : { error: 'Token no found' }
}


export const deleteData = async ( id, destinationPath ) => {
    try {
        axios.delete(`${PATH}/${destinationPath}/${id}`)
            .then(() => message.success('Acción realizada Exitosamente.') )
    } catch (err) {
        message.error('Ha ocurrido un Error.');
        console.log(err.message);
    }
}
