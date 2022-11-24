import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1440 },
		items: 5,
		slidesToSlide: 1, // optional, default to 1.
	},
    laptop: {
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
		breakpoint: { max: 450, min: 0 },
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
			autoPlay={true}
			autoPlaySpeed={5000}
			keyBoardControl={true}
			transitionDuration={500}
			containerClass="carousel-container"
			removeArrowOnDeviceType={['tablet', 'mobile']}
		>
            {children}
		</ReactCarousel>
	)
}
