import { Link } from "react-router-dom";
import logo from '../../Assets/logo-somos.png'

export function Header() {

    const datos = [
        {name: "Inicio", link: "/home", linkClass: ""},
        {name: "Nosotros", link: "/nosotros", linkClass: ""},
        {name: "Novedades", link: "/novedades", linkClass: ""},
        {name: "Testimonios", link: "/testimonios", linkClass: ""},
        {name: "Contacto", link: "/contacto", linkClass: ""},
        {name: "Contribuye", link: "/contribuye", linkClass: ""},
        {name: "Log In", link: "/login", linkClass: " login-btn"},
        {name: "Registrate", link: "/register", linkClass: " register-btn"},
    ];

    return (
        <header className="header-container">
            <img src={logo} alt="logo somos mas" className="header-logo"/>
            <ul className="nav-links">
                {datos.map((obj) => {
                    const {name, link, linkClass} = obj;
                    return (
                        <li key={name}>
                            <Link 
                                to={link} 
                                className=
                                {window.location.pathname === link ? "resaltar header-link" + linkClass : "header-link" + linkClass}>
                                {name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </header>
    );
}