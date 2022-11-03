import { Link } from "react-router-dom";


export function SectionCard({title, image, toLink}) {
    return (
        <article
            className="section-card"
        >
            <div>
                <h2>{title}</h2>
                { image() }
            </div>
            <Link to={`/backoffice/${toLink}}`}>Ir</Link>
        </article>
    )
} 