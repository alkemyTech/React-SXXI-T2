import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ContactForm } from "../../Components/Contact/ContactForm";
import { FacebookFilled, LinkedinFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import logo from '../../Assets/logo-somos.png';
import '../../Components/FormStyles.css';
import { getOrgContactData } from "../../Services/publicApiService";

export const Contact = () => {
    const [contactData, setContactData] = useState({});
    const navigate = useNavigate();

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
                <a href={contactData.facebook_url}><FacebookFilled /></a>
                <a href={contactData.linkedin_url}><LinkedinFilled /></a>
                <a href={contactData.instagram_url}><InstagramFilled /></a>
                <a href={contactData.twitter_url}><TwitterSquareFilled /></a>
            </div>
            : null
        }
        <div id='contribuir' >
            <h1>¿Quieres contribuir?</h1> {/*Aca va el componente Title*/}
            <button className="submit-btn donar-btn" onClick={() => navigate("/donate")}>Contribuir</button>
            <h1>¡Contactate con nosotros!</h1>  {/*Aca va el componente Title*/}
        </div>
        <ContactForm />
    </div>
  )
}
