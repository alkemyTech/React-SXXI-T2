import axios from 'axios';

const getToken = () => {
    return localStorage.getItem("token")
}

const getAuthorization = () => {
    const token = getToken();

    return token ? `Bearer ${token}` : null;
}

const config = {
    headers: {
        Authorization: getAuthorization(),
        accept: 'application/json', 
        'Content-Type': 'application/json',
        Group: parseInt('02', 8)
    }
}

const API_URL = "https://ongapi.alkemy.org/api/";

export const getData = async (route, id) => {
    let url = API_URL;

    id ? url = url + route + "/" + id : url = url + route;

    const { data } = await axios
        .get(url, config)
        .then((res) => res)
        .catch((err) => err);
    return data;

}


