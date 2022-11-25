import { useEffect, useState  } from "react";
import { getOrganization } from "../../Services/OrganizationService/publicOrganization";
import background from "./../../Assets/img4.png";


export const About = () => {
    const [textAboutUs, setTextAboutUs] = useState("");

    useEffect(() => {
        getOrganization().then( data => {
            setTextAboutUs(data.long_description);
        });
    }, []);

  return (
    <div id="layout-about">
      <div id="container-about">
          <h1>Nosotros</h1>
          {textAboutUs ? <p id="textAboutUs">{textAboutUs}</p> : null}
      </div>
      <img src={background} alt="background-about" id="img-bg-about" />
    </div>
  )
}
