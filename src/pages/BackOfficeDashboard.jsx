import { faComments, faImage, faNewspaper, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faListCheck, faSitemap, faUserPen, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackOfficeLayout, SectionCard } from '../Components/BackOffice'
import { MenuOutlined  } from '@ant-design/icons'
import { Drawer } from 'antd';
import { useState } from "react";
import { Link } from "react-router-dom";

export function BackOfficeDashboard() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}
	return (
		<BackOfficeLayout>
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
                    <Link to={`/backoffice/usuarios`}>
                        Cerrar sesion
                    </Link>
                    <Link to={`/backoffice/usuarios`}>
                        Ir al sitio
                    </Link>
                </div>
			</Drawer>
			<SectionCard
				title={'Productos'}
				image={() => <FontAwesomeIcon icon={faNewspaper} size="6x" />}
			/>
			<SectionCard
				title={'Actividades'}
				image={() => <FontAwesomeIcon icon={faListCheck} size="6x" />}
			/>
			<SectionCard
				title={'Categorias'}
				image={() => (
					<FontAwesomeIcon icon={faRectangleList} size="6x" />
				)}
			/>
			<SectionCard
				title={'Testimonios'}
				image={() => <FontAwesomeIcon icon={faComments} size="6x" />}
			/>
			<SectionCard
				title={'Organizacion'}
				image={() => <FontAwesomeIcon icon={faSitemap} size="6x" />}
			/>
			<SectionCard
				title={'Slides'}
				image={() => <FontAwesomeIcon icon={faImage} size="6x" />}
			/>
			<SectionCard
				title={'Usuarios'}
				image={() => <FontAwesomeIcon icon={faUsers} size="6x" />}
			/>
			<SectionCard
				title={'Miembros'}
				image={() => <FontAwesomeIcon icon={faUserPen} size="6x" />}
			/>
		</BackOfficeLayout>
	)
}
