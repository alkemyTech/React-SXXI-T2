import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "../Slider";

export function WelcomeText() {

  const [home, setHome] = useState([]);

  useEffect(() => {

    axios.get("https://ongapi.alkemy.org/api/organization").then((res) => {
      const results = {
        id: res.data.data.id,
        name: res.data.data.name,
        logo: res.data.data.logo,
        shortDescription: res.data.data.short_description,
        welcomeText: res.data.data.welcome_text,
      }
      setHome(results);
    })

  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-subcontainer">
        <h1 className="welcome-title">{home.welcomeText}</h1>
        <p className="welcome-para">{home.shortDescription}</p>
        <Link to="/contact" className="welcome-contact">Contactanos</Link>
      </div>
      <Slider className="welcome-slider" />
    </div>
  )
}
