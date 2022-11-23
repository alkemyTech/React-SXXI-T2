import axios from 'axios';

const config = {
    headers: {
        Group: 02
    }
}

const API_URL = "https://ongapi.alkemy.org/api/";

export const getData = async (route, id) => {

    const URL = id ? API_URL + route + "/" + id : API_URL + route;

    return await axios
        .get(URL)
        .then((res) => res.data.data)
        .catch((err) => err);
}
