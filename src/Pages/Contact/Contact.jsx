import { useEffect, useState } from "react";
import { ContactForm } from "../../Components/Contact/ContactForm";
import { FacebookFilled, LinkedinFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import logo from '../../Assets/logo-somos.png';
import '../../Components/FormStyles.css';
import { getOrgContactData } from "../../Services/publicApiService";
import { Donations } from "../../Components/Contact/Donations";

export const Contact = () => {
    const [contactData, setContactData] = useState({});

    useEffect(() => {
        getOrgContactData().then(data =>
            setContactData({ 
                address: data.address, 
                phone:  data.phone, 
                facebook_url: data.facebook_url,
                linkedin_url: data.linkedin_url,
                instagram_url: data.instagram_url,
                twitter_url: data.twitter_url,
            })
        )
    }, [])

  return (
    <div className='container'>
        <img src={logo} alt='logo' className='contact-logo' />
        { Object.keys(contactData).length ? 
            <div className="contact-data">
                <h1>Datos de contacto:</h1>
                <h3>Direccion: {contactData.address}</h3>
                <h3>Telefono: {contactData.phone}</h3>
                <a href={contactData.facebook_url} target="_blank" rel="noopener noreferrer"><FacebookFilled /></a>
                <a href={contactData.linkedin_url} target="_blank" rel="noopener noreferrer"><LinkedinFilled /></a>
                <a href={contactData.instagram_url} target="_blank" rel="noopener noreferrer"><InstagramFilled /></a>
                <a href={contactData.twitter_url} target="_blank" rel="noopener noreferrer"><TwitterSquareFilled /></a>
            </div>
            : null
        }
        <Donations />
        <ContactForm />
    </div>
  )
}
