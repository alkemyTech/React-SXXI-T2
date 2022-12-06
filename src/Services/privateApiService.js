import { message } from 'antd';
import axios from 'axios';

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
        message.error("Ha ocurrido un error")
        console.log(err.message);
    }
}


export const getData = async (destinationPath, id) => {
    try {
        if(id) {
            const { data } = await axios
            .get(`${PATH}${destinationPath}${'/'}${id}`, setting);
            console.log(data);
            return data;
        } else{
            const { data } = await axios
                .get(`${PATH}${destinationPath}`, setting);
                console.log(data);
                return data;
        }
    } catch (err) {
        message.error('Ha ocurrido un error');
        console.log(err.message);
    }

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
