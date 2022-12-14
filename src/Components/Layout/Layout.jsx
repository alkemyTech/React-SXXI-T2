import { Footer } from "./Footer"
import { Header } from "./Header"
import { BackOfficeNavbar } from "../BackOffice"

export function Layout(props) {

    return (
        window.location.pathname.startsWith('/backoffice') ?
            <div className="layout">
                <BackOfficeNavbar />
                {props.children}
            </div>
            :
            <div className="layout">
                <Header />
                {props.children}
                <Footer />
            </div>

    )
}
