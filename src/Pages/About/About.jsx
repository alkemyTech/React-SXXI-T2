import { useEffect } from "react"
import { useState } from "react"
import { getOrganization } from "../../Services/OrganizationService/publicOrganization"


export const About = () => {
    const [textAboutUs, setTextAboutUs] = useState("")

    useEffect(() => {
        getOrganization().then( data => {
            setTextAboutUs(data.long_description)
        })
    }, [])

  return (
    <div id="container-about">
        <h1>Nosotros</h1>
        {textAboutUs ? <p id="textAboutUs">{textAboutUs}</p> : null}
    </div>
  )
}
