import { Link } from "react-router-dom";
import { truncateText } from "../../utils";

export const types = {
    staff: 'staff',
    testimonial: 'testimonial',
    news: 'news'
}

export function Card({type, item}) {
    const cardType = type === types.news ? 'news' : type === types.staff ? 'staff' : 'testimonial'

    return (
        <article className={`card-container card-container--${cardType}`}>
            {
                cardType === types.staff
                    ? (
                        <>
                            <img src={item?.image} alt={item?.name} />
                            <div className={'card-text'}>
                                <p>{item?.name}</p>
                                <p>{item?.description}</p>
                            </div>
                        </>
                    )
                    : cardType === types.testimonial
                    ? (
                        <>
                            <img src={item?.image} alt={item?.name} />
                            <div>
                                <h3>{item?.name}</h3>
                                <p>{truncateText(item?.description)}</p>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <img src={item?.image} alt={item?.name} />
                            <div>
                                <p>{truncateText(item?.description)}</p>
                                <Link to='#'>Ver novedad</Link>
                            </div>
                        </>
                    )

            }
        </article>
    )
}
