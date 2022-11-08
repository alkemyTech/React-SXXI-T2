import { faComments, faImage, faNewspaper, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faListCheck, faSitemap, faUserPen, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackOfficeLayout, SectionCard } from '../../Components/BackOffice'
import { BackOfficeNavbar } from "../../Components/BackOffice/BackOfficeNavbar";

export function BackOfficeDashboard() {

	return (
		<BackOfficeLayout>
			<BackOfficeNavbar />
			<SectionCard
				title={'Productos'}
				image={() => <FontAwesomeIcon icon={faNewspaper} size="6x" />}
				linkTo={'novedades'}
			/>
			<SectionCard
				title={'Actividades'}
				image={() => <FontAwesomeIcon icon={faListCheck} size="6x" />}
				linkTo={'activities'}
			/>
			<SectionCard
				title={'Categorias'}
				image={() => (
					<FontAwesomeIcon icon={faRectangleList} size="6x" />
				)}
				linkTo={'categories'}
			/>
			<SectionCard
				title={'Testimonios'}
				image={() => <FontAwesomeIcon icon={faComments} size="6x" />}
				linkTo={'testimonials'}
			/>
			<SectionCard
				title={'Organizacion'}
				image={() => <FontAwesomeIcon icon={faSitemap} size="6x" />}
				linkTo={'organization'}
			/>
			<SectionCard
				title={'Slides'}
				image={() => <FontAwesomeIcon icon={faImage} size="6x" />}
				linkTo={'slides'}
			/>
			<SectionCard
				title={'Usuarios'}
				image={() => <FontAwesomeIcon icon={faUsers} size="6x" />}
				linkTo={'users'}
			/>
			<SectionCard
				title={'Miembros'}
				image={() => <FontAwesomeIcon icon={faUserPen} size="6x" />}
				linkTo={'members'}
			/>
		</BackOfficeLayout>
	)
}
