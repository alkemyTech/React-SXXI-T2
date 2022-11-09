import { useCard } from "../../Hooks";

export const types = {
    staff: 'staff',
    testimonial: 'testimonial',
    news: 'news'
}

export function Card({type}) {
    const cardType = type === types.news ? 'news' : type === types.staff ? 'staff' : 'testimonial'

    const { data } = useCard(type)

    console.log(data);

    return (
        <article className={`card-container card-container--${cardType}`}>
            {
                cardType === 'staff' 
                    ? (
                        <>
                            <img src={data[0].image} alt={data[0].name} />
                            <div className={'card-text'}>
                                <p>{data[0].name}</p>
                                <p>{data[0].description}</p>
                            </div>
                        </>
                    )
                    : cardType === 'news'
                    ? (
                        <>
                            <article className={`card card--${cardType}`}>
                            </article>
                        </>
                    )
                    : (
                        <article className={`card card--${cardType}`}>
                        </article>
                    )

            }
        </article>
    )
}
