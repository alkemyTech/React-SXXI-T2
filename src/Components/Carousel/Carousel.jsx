import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1440 },
		items: 4,
		slidesToSlide: 1, // optional, default to 1.
	},
    desktop: {
		breakpoint: { max: 1440, min: 1024 },
		items: 3,
		slidesToSlide: 1, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 1, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
}

export function Carousel({children}) {
    return (
		<ReactCarousel
            centerMode={true}
			swipeable={true}
			draggable={true}
			showDots={false}
			responsive={responsive}
			infinite={true}
			autoPlaySpeed={5000}
			keyBoardControl={true}
			customTransition="all .5s ease-in-out"
			transitionDuration={500}
			containerClass="carousel-container"
			removeArrowOnDeviceType={['tablet', 'mobile']}
			itemClass="carousel-item-padding-40-px"
		>
            {children}
		</ReactCarousel>
	)
}
