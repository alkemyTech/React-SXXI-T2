import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo-somos.png";
import { publicGetData } from "../../Services/publicApiService";
import { logout } from "../../Store/Reducers/authReducer";
import { setInBackOffice } from "../../Store/Reducers/headerReducer";

export function Header() {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState(" hidden");
  const [isMenuCliked, setIsMenuClicked] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const path = useLocation();
  const { isLogged, userName, userId, userRole } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateMenu = () => {
    if (!isMenuCliked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass(" visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass(" hidden");
    }
    setIsMenuClicked(!isMenuCliked);
  };

  const datos = [
    { name: "Inicio", link: "/", linkClass: "" },
    { name: "Nosotros", link: "/about", linkClass: "" },
    { name: "Novedades", link: "/news", linkClass: "" },
    { name: "Contacto", link: "/contact", linkClass: "" },
  ];

  useEffect(() => {
    if (isLogged)
      publicGetData(userId, "/users").then((res) => {
        if (res.data.profile_image) setUserImg(res.data.profile_image);
      });
  }, [isLogged, userId]);

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
                    className={
                      path.pathname === link
                        ? "resaltar header-link" + linkClass
                        : "header-link" + linkClass
                    }
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                className="header-link"
                onClick={() => navigate("/thanks")}
                href="https://mpago.la/1S5hkjd"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuye
              </a>
            </li>
            {isLogged ? (
              <>
                <li>
                  <Link
                    to="/"
                    className={"header-link login-btn"}
                    onClick={() => dispatch(logout())}
                  >
                    Cerrar sesión
                  </Link>
                </li>
                <li className="user-header">
                  {userImg ? (
                    <img
                      src={userImg}
                      alt="user-img-header"
                      id="user-img-header"
                    />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )}
                  {userRole === 1 ? (
                    <Link
                      to="/backoffice"
                      className={"header-link"}
                      onClick={() => dispatch(setInBackOffice())}
                    >
                      {userName}
                    </Link>
                  ) : (
                    <p>{userName}</p>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className={"header-link login-btn"}>
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={"header-link register-btn"}>
                    Registrate
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <img src={logo} alt="logo somos mas" className={"header-logo mobile"} />
    </header>
  );
}
