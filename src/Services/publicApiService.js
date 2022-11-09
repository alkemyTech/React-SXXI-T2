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

export const getTestimonialData = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/testimonials`)
        const biasedTestimonials = [...data.data].map(testimonial => ({
            name: testimonial.name,
            image: testimonial.image,
            description: testimonial.description,
        }))

        return biasedTestimonials
    } catch (error) {
        console.error(error);
    }
}

export const getMembersData = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/members`)
        const biasedMembers = [...data.data].map(member => ({
            name: member.name,
            image: member.image,
            description: member.description,
        }))

        return biasedMembers
    } catch (error) {
        console.error(error);
    }
}

export const getNewsData = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/news`)
        const biasedNews = [...data.data].map(neww => ({
            name: neww.name,
            image: neww.image,
            content: neww.content,
        }))

        return biasedNews
    } catch (error) {
        console.error(error);
    }
}


export default Get