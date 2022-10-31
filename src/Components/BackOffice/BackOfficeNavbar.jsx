import React from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'
import { useDrawer } from '../../hooks'


export default function BackOfficeNavbar() {
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
				title="Asi somos ❤"
				placement={'right'}
				width={500}
				onClose={onClose}
				open={open}
				style={{
					fontSize: '1.5rem', 
				}}
			>
				<div className="drawer-links">
					<Link to={`/backoffice/usuarios`}>Cerrar sesion</Link>
					<Link to={`/backoffice/usuarios`}>Ir al sitio</Link>
				</div>
			</Drawer>
		</>
	)
}
