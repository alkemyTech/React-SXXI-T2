import { Link } from "react-router-dom";
import { useCard } from "../../Hooks";
import { truncateText } from "../../utils";

export const types = {
    staff: 'staff',
    testimonial: 'testimonial',
    news: 'news'
}

export function Card({type}) {
    const cardType = type === types.news ? 'news' : type === types.staff ? 'staff' : 'testimonial'
    const { data } = useCard(type)


    return (
        <article className={`card-container card-container--${cardType}`}>
            {
                cardType === types.staff
                    ? (
                        <>
                            <img src={data[0]?.image} alt={data[0]?.name} />
                            <div className={'card-text'}>
                                <p>{data[0]?.name}</p>
                                <p>{data[0]?.description}</p>
                            </div>
                        </>
                    )
                    : cardType === types.testimonial
                    ? (
                        <>
                            <img src={data[4]?.image} alt={data[0]?.name} />
                            <div>
                                <h3>{data[0]?.name}</h3>
                                <p>{truncateText(data[4]?.description)}</p>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <img src={data[56]?.image} alt={data[56]?.name} />
                            <div>
                                <p>{truncateText(data[56]?.description)}</p>
                                <Link to='#'>Ver novedad</Link>
                            </div>
                        </>
                    )

            }
        </article>
    )
}
