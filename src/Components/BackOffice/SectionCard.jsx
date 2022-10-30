import { Link } from "react-router-dom";


export function SectionCard({title, image}) {
    return (
        <article
            className="section-card"
        >
            {/* //todo: modificar la etiqueta <h2></h2> por un component <Title /> */}
            <div>
                <h2>{title}</h2>
                { image() }
            </div>
            <Link to={`/backoffice/${title.toLowerCase()}`}>Ir</Link>
        </article>
    )
} 