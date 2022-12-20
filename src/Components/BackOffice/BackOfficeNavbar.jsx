import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { useDrawer } from "../../Hooks";
import { useDispatch, useSelector } from "react-redux";
import { setInSite } from "../../Store/Reducers/headerReducer";
import { logout } from "../../Store/Reducers/authReducer";

export function BackOfficeNavbar() {
  const { open, showDrawer, onClose } = useDrawer();
  const { userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const goToSite = () => {
    onClose();
    dispatch(setInSite());
  };

  const logOut = () => {
    dispatch(logout());
    onClose();
    dispatch(setInSite());
  };

  const datos = [
    { name: "Panel", link: "/backoffice" },
    { name: "Novedades", link: "/backoffice/news" },
    { name: "Inicio", link: "/backoffice/home" },
    { name: "Categorías", link: "/backoffice/categories" },
    { name: "Testimonios", link: "/backoffice/create-testimonials" },
    { name: "Organización", link: "/backoffice/organization" },
    { name: "Slides", link: "/backoffice/slides" },
    { name: "Usuarios", link: "/backoffice/users" },
    { name: "Miembros", link: "/backoffice/members" },
  ];

  return (
    <>
      <nav className="backoffice-navbar">
        <MenuOutlined
          style={{
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={showDrawer}
        />
        <p>{userName}</p>
      </nav>
      <Drawer
        title="Somos más ❤"
        placement={"left"}
        width={"13rem"}
        onClose={onClose}
        open={open}
        style={{
          fontSize: "1.5rem",
          zIndex: "1111",
        }}
      >
        <div className="drawer-links">
          <Link to={`/`} onClick={goToSite}>
            Ir al inicio
          </Link>
          {datos.map(({ name, link }) => (
            <Link to={link} onClick={onClose} key={name}>
              {name}
            </Link>
          ))}
          <Link to={`/`} onClick={logOut}>
            Cerrar sesion
          </Link>
        </div>
      </Drawer>
    </>
  );
}
