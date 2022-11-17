import { SubscribeForm } from "../SubscribeForm/SubscribeForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

export function Footer() {
    const [ong, setOng] = useState([]);

    const API_URL = "https://ongapi.alkemy.org/api/";

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get(API_URL + "organization");
            const results = {
                name: data.data.name,
                logo: data.data.logo,
                instagram_url: data.data.instagram_url,
                facebook_url: data.data.facebook_url,
                linkedin_url: data.data.linkedin_url,
                twitter_url: data.data.twitter_url
            };

            setOng(results)
        }
        fetchData();
    }, []);

    return (
        <footer className="footer-container">

            <div className="logo-and-name-footer">
                <img src={ong.logo} alt={ong.name} className="footer-img" />
            </div>

            {localStorage.getItem("subscribeInfo") === null && <SubscribeForm className="subscribe-form" />}

            <div className="navigation-footer">
                <ul>
                    <li>
                        <Link to="/home" className="footer-link">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/nosotros" className="footer-link">
                            Nosotros
                        </Link>
                    </li>
                    <li>
                        <Link to="/novedades" className="footer-link">
                            Novedades
                        </Link>
                    </li>
                    <li>
                        <Link to="/testimonios" className="footer-link">
                            Testimonios
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacto" className="footer-link">
                            Contacto
                        </Link>
                    </li>
                    <li>
                        <Link to="/contribuye" className="footer-link">
                            Contribuye
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="social-networks-footer">
                <p className="p-social-networks">¡Únete a nuestras redes sociales!</p>
                <a href={ong.twitter_url} className="footer-link"><TwitterOutlined /></a>
                <a href={ong.facebook_url} className="footer-link"><FacebookOutlined /></a>
                <a href={ong.instagram_url} className="footer-link"><InstagramOutlined /></a>
                <a href={ong.linkedin_url} className="footer-link"><LinkedinOutlined /></a>
            </div>
        </footer>
    )
}