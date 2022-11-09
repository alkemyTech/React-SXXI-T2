
export const types = {
    staff: 'staff',
    testimonial: 'testimonial',
    news: 'news'
}

export function Card({type}) {
    const cardType = type === types.news ? 'news' : type === types.staff ? 'staff' : 'testimonial'

    return (
        <div className={`card-container card-container--${cardType}`}>

        </div>
    )
}
