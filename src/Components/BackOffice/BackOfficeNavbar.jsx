import { MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'
import { useDrawer } from '../../Hooks'


export function BackOfficeNavbar() {
    const {open, showDrawer, onClose} = useDrawer()
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
				title="Somos Mas ❤"
				placement={'right'}
				width={500}
				onClose={onClose}
				open={open}
				style={{
					fontSize: '1.5rem', 
					zIndex: '1111',
				}}
			>
				<div className="drawer-links">
					<Link to={`/login`}>Cerrar sesion</Link>
					<Link to={`/`}>Ir al sitio</Link>
				</div>
			</Drawer>
		</>
	)
}
