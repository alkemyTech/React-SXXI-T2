import axios from 'axios';

const endPoint = 'https://ongapi.alkemy.org/api'

const config = {
    headers: {
        Group: 2             
    }
}


const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export const getOrganizationData = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/organization`, config)
        const organizationData = {
            logo: data.data.logo,
            name: data.data.name,
            shortDescription: data.data.short_description,
        }
        return organizationData
    } catch (error) {
        console.error(error);
    }
}

export const getSliderImages = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/slides`)
        const images = [...data.data]
        return images
    } catch (error) {
        console.log(error);
    }
}

export default Get