import axios from 'axios';

const verifyToken = () => {
    const token = localStorage.getItem("token");
    return token && { headers: {Authorization: `Bearer ${token}`}}
}

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