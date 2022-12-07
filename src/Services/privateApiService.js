import axios from 'axios';
import { errorAlert } from './alertService';

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
        Group: 2,
        Authorization: getBearerToken()
    }
}

export const postData = async ( destinationPath, body ) => {
    try {
        const { data } = await axios.post( `${PATH}${destinationPath}`, body, setting );
        return data;
    } catch (err){
        errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
        console.log(err.message);
    }
}


export const getData = async (destinationPath, id) => {
    try {
        if(id) {
            const { data } = await axios
            .get(`${PATH}${destinationPath}/${id}`, setting);
            return data;
        } else{
            const { data } = await axios
                .get(`${PATH}${destinationPath}`, setting);
                return data;
        }
    } catch (err) {
        errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
        console.log(err.message);
    }

}


export const deleteData = async ( destinationPath, id ) => {
    try {
        const data = await axios.delete(`${PATH}${destinationPath}/${id}`, setting);
        return data;
    } catch (err) {
        errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
        console.log(err.message);
    }
}
