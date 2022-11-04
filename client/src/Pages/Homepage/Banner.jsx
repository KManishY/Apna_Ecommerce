// import { styled } from "@mui/material";
// import { useEffect } from "react";
// import Carousel from "react-multi-carousel";
// // import { bannerData } from "../../Constants/data";
// import "react-multi-carousel/lib/styles.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getData } from "../../Redux/AppReducer/action.js";

// const Image = styled("img")(({ theme }) => ({
// 	width: "100%",
// 	height: 280,
// 	[theme.breakpoints.down("md")]: {
// 		objectFit: "cover",
// 		height: 180
// 	}
// }));

// const Banner = () => {
// 	const responsive = {
// 		desktop: {
// 			breakpoint: { max: 3000, min: 1024 },
// 			items: 1
// 		},
// 		tablet: {
// 			breakpoint: { max: 1024, min: 464 },
// 			items: 1
// 		},
// 		mobile: {
// 			breakpoint: { max: 464, min: 0 },
// 			items: 1
// 		}
// 	};

// 	return (
// 		<Carousel
// 			responsive={responsive}
// 			swipeable={false}
// 			draggable={false}
// 			infinite={true}
// 			autoPlay={true}
// 			autoPlaySpeed={3000}
// 			keyBoardControl={true}
// 			slidesToSlide={1}
// 			dotListClass="custom-dot-list-style"
// 			itemClass="carousel-item-padding-40-px"
// 			containerClass="carousel-container"
// 		>
// 			{/* {state &&
// 				prod_image.map((data, id) =>
// 					<Image src={data.url} alt="banner" key={id} />
// 				)} */}
// 		</Carousel>
// 	);
// };

// export default Banner;