import { Link } from "react-router-dom";


export function SectionCard({title, image, linkTo}) {
    return (
        <article
            className="section-card"
        >
            <div>
                <h2>{title}</h2>
                { image() }
            </div>
            <Link to={`/backoffice/${linkTo}}`}>Ir</Link>
        </article>
    )
} 