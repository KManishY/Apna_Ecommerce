import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
// import { bannerData } from "../../Constants/data";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const bannerData = [
	{
		id: 1,
		url:
			"https://i.pinimg.com/originals/4e/b6/1e/4eb61e7b68123a3340539a2e50811a59.jpg"
	},
	{
		id: 2,
		url:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCIWPMDmy7GxsX55PbRZF7ZPsWx3HjHpKB9eVNnf6&s"
	},
	{
		id: 3,
		url: "https://cdn13.afydecor.com/Decor-banner.jpg"
	},
	{
		id: 4,
		url:
			"https://thumbs.dreamstime.com/z/home-decor-design-decoration-plants-banner-colored-different-pots-green-cabinet-against-pastel-wall-stylish-modern-185406630.jpg"
	}
];

const Image = styled("img")(({ theme }) => ({
	width: "100%",
	height: 280
	// [theme.breakpoints.down("md")]: {
	// 	objectFit: "cover",
	// 	height: 180
	// }
}));

const Banner = () => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};
	return (
		<Carousel
			responsive={responsive}
			swipeable={false}
			draggable={false}
			infinite={true}
			autoPlay={true}
			autoPlaySpeed={3000}
			keyBoardControl={true}
			slidesToSlide={1}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
			containerClass="carousel-container"
		>
			{bannerData.map((data, id) =>
				<Image src={data.url} alt="banner" key={id} />
			)}
		</Carousel>
	);
};

export default Banner;
