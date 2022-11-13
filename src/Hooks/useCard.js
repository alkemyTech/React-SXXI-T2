import { useEffect } from "react"
import { useState } from "react"
import { types } from "../Components/Card"
import { getMembersData, getNewsData, getTestimonialData } from "../Services/publicApiService"
import { cleanDescription } from "../utils"

export function useCard(type) {
    const [data, setData] = useState([])


    const fetchData = async () => {
        if(!type) {
            throw new Error('No se ha proporcionado ningun type')
        }

        if(type === types.news){
            const fetchedNews = await getNewsData()
            const modifiedNews = fetchedNews.map(neww => ({
                ...neww,
                description: cleanDescription(neww.content)
            }))
            setData(modifiedNews)
        }

        if(type === types.staff){
            const fetchedMembers = await getMembersData()
            const modifiedMembers = fetchedMembers.map(member => ({
                ...member,
                description: cleanDescription(member.description)
            }))

            setData(modifiedMembers)
        }

        if(type === types.testimonial){
            const fetchedTestimonials = await getTestimonialData()
            const modifiedTestimonials = fetchedTestimonials.map(testimonial => ({
                ...testimonial,
                description: cleanDescription(testimonial.description)
            }))
            setData(modifiedTestimonials)
        }
    }

    useEffect(() => {
        fetchData()
    }, [type])

    return {
        data,
    }
}
