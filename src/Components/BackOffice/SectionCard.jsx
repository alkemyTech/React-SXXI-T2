import { Button } from "antd";
import { Link } from "react-router-dom";


export function SectionCard({title, image}) {
    return (
        <article
            className="section-card"
        >
            <div>
                <h2>{title}</h2>
                { image() }
            </div>
            <Link to={`/backoffice/${title.toLowerCase()}`}>
                Ir
            </Link>
        </article>
    )
} 