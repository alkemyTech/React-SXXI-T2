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


const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default Get