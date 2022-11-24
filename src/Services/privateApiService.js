import axios from 'axios';

const verifyToken = () => {
    const token = localStorage.getItem("token");
    return token && { headers: {Authorization: `Bearer ${token}`}}
}

/*const config = {
    headers: {
        verifyToken;
    }
}

export const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
} */

export const Patch = (section, values) => {

    const config = {
        verifyToken,
    };

    axios
    .patch(`https://ongapi.alkemy.org/public/api/${section}`, {data: {values}}, config)
    .then((res) => {
        console.log(res);
        alert('Modificación exitosa');
    })
    .catch((error) => {
        console.log(error);
    })
  } 