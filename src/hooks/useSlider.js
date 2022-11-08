import { useEffect } from "react"
import { useState } from "react"
import { getSliderImages } from "../Services/publicApiService"

export function useSlider() {
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState({})
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchData = async () => {
        const fetchedImages = await getSliderImages()
        setImages(fetchedImages)
        setSelectedImage(fetchedImages[0])
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() =>{
        const interval = setInterval(() =>{
            next()
        }, 5000)

        return () => clearInterval(interval)
    })

    const previous = () => {
        setIsLoaded(false)
        setTimeout(() => {
            const condition = selectedIndex > 0 
            const nextIndex = condition ? selectedIndex - 1 : images.length - 1
            setSelectedIndex(nextIndex)
            setSelectedImage(images[nextIndex])
        }, 500)
    }

    const next = () => {
        setIsLoaded(false)
        setTimeout(() =>{
            const condition = selectedIndex < images.length - 1
            const nextIndex = condition ? selectedIndex + 1 : 0
            setSelectedIndex(nextIndex)
            setSelectedImage(images[nextIndex])
        }, 500)
    }
    
    return {
        selectedImage,
        previous,
        next,
        isLoaded,
        setIsLoaded
    }

}
