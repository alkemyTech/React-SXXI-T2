import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function LazyImage(props) {
    return (
        <LazyLoadImage className={props.imgClass} src={props.imgSrc} alt={props.imgAlt} />
    )
}
