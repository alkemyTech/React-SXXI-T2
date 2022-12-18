import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../Assets/logo-somos.png'

export function Header({ isLoggedIn, setIsLoggedIn }) {

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState(" hidden");
    const [isMenuCliked, setIsMenuClicked] = useState(false);
    
    const path = useLocation();


    const updateMenu = () => {
        if (!isMenuCliked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass(" visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass(" hidden");
        }
        setIsMenuClicked(!isMenuCliked);
    }

    const datos = [
        { name: "Inicio", link: "/", linkClass: "" },
        { name: "Nosotros", link: "/about", linkClass: "" },
        { name: "Novedades", link: "/news", linkClass: "" },
        { name: "Testimonios", link: "/testimonios", linkClass: "" },
        { name: "Contacto", link: "/contact", linkClass: "" },
        { name: "Contribuye", link: "/contact", linkClass: "" },
    ];

    const logIn = () => {
        setIsLoggedIn(true);
        console.log("login: " + isLoggedIn)
    };
    const logOut = () => {
        setIsLoggedIn(false);
        console.log("logout: " + isLoggedIn)
    };

    return (
        <header className="header-container">
            <img src={logo} alt="logo somos mas" className="header-logo desk" />
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
                <div className={"menu" + menu_class}>
                    <ul className={"nav-links" + menu_class}>
                        {datos.map((obj) => {
                            const { name, link, linkClass } = obj;
                            return (
                                <li key={name}>
                                    <Link
                                        to={link}
                                        className=
                                        {path.pathname === link ? "resaltar header-link" + linkClass : "header-link" + linkClass}>
                                        {name}
                                    </Link>
                                </li>
                            )
                        })}
                        {isLoggedIn ? (
                            <p onClick={logOut} className="header-link login-btn" >fakeLogOut</p>
                        ) : (
                            <>
                                <p onClick={logIn} className="header-link login-btn" >fakeLogIn</p>
                                <Link 
                                    to="/login"
                                    className=
                                    {window.location.pathname === "/login" ? "resaltar header-link login-btn" : "header-link login-btn"}>Iniciar sesión</Link>
                                <Link to="/register"
                                    className=
                                    {window.location.pathname === "/register" ? "resaltar header-link register-btn" : "header-link register-btn"}>Registrate</Link>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <img src={logo} alt="logo somos mas" className={"header-logo mobile"} />
        </header>
    );
}