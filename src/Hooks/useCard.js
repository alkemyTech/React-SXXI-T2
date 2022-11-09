import { useEffect } from "react"
import { useState } from "react"
import { types } from "../Components/Card"

export function useCard(type) {
    const [data, setData] = useState([])

    useEffect(() => {
        if(type === types.news){
            
        }
    }, [])
    return {

    }
}
