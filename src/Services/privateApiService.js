import axios from 'axios';

const getToken = () => {
    return localStorage.getItem("token")
}

const getHeaderAuthorization = () => {
    const token = getToken();

    if (token) {
        return { 'Authorization': 'Bearer' + token, Group: parseInt('02', 8) };
    } else {
        return { error: 'Token not found' };
    }
}

const config = {
    headers: getHeaderAuthorization()
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


