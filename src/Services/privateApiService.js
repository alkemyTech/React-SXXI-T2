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

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default Get