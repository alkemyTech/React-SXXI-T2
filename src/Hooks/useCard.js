import { useEffect } from "react"
import { useState } from "react"
import { types } from "../Components/Card"
import { getMembersData, getNewsData, getTestimonialData } from "../Services/publicApiService"

export function useCard(type) {
    const [data, setData] = useState([])
    const [description, setDescription] = useState('')

    const fetchData = async () => {
        if(type === types.news){
            const fetchedNews = await getNewsData()
            setData(fetchedNews)
        }

        if(type === types.staff){
            const fetchedMembers = await getMembersData()
            const modifiedMembers = fetchedMembers.map(member => ({
                ...member,
                description: member.description.substring(3, member.description.length - 4)
            }))
            setData(modifiedMembers)
        }

        if(type === types.testimonial){
            const fetchedTestimonials = await getTestimonialData()
            setData(fetchedTestimonials)
        }
    }

    useEffect(() => {
        fetchData()
    }, [type])
    return {
        data
    }
}
