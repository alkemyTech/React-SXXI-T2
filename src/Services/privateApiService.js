import axios from 'axios';

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

const API_URL = "https://ongapi.alkemy.org/api/";

export const getData = async (route, id) => {

    const URL = id ? API_URL + route + "/" + id : API_URL + route;

    return await axios
        .get(URL, config)
        .then((res) => res.data.data)
        .catch((err) => err);
}
