import { MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'
import { useDrawer } from '../../Hooks'


export function BackOfficeNavbar({ setInBackOffice }) {
    const {open, showDrawer, onClose} = useDrawer()

	const goToSite = () => {
		onClose();
		setInBackOffice(false);
	}

	const logOut = () => {
		//cerrar sesion
		onClose();
		setInBackOffice(false);
	}

	const datos = [
        { name: "Panel", 		 link: "/backoffice" },
        { name: "Novedades", 	 link: "/backoffice/news" },
        { name: "Testimonios", 	 link: "/backoffice/testimonials" },
        { name: "Actividades", 	 link: "/backoffice/activities" },
        { name: "Categorías", 	 link: "/backoffice/categories" },
        { name: "Organización",  link: "/backoffice/organization" },
        { name: "Slides", 		 link: "/backoffice/slides" },
        { name: "Usuarios", 	 link: "/backoffice/users" },
        { name: "Miembros", 	 link: "/backoffice/members" },
    ];


	return (
		<>
			<nav className="backoffice-navbar">
				<MenuOutlined
					style={{
						fontSize: '2rem',
						cursor: 'pointer',
					}}
					onClick={showDrawer}
				/>
			</nav>
			<Drawer
				title="Somos más ❤"
				placement={'left'}
				width={'13rem'}
				onClose={onClose}
				open={open}
				style={{
					fontSize: '1.5rem', 
					zIndex: '1111',
				}}
			>
				<div className="drawer-links">
					<Link to={`/`} onClick={goToSite}>Ir al inicio</Link>
					{datos.map( ({ name, link }) => <Link to={link} onClick={onClose} key={name}>{name}</Link> )}
					<Link to={`/login`} onClick={logOut}>Cerrar sesion</Link>
				</div>
			</Drawer>
		</>
	)
}
