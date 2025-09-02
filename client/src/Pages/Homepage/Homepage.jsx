import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useSearchParams } from "react-router-dom";
import {
	getData,
} from "../../Redux/AppReducer/action.js";
import Banner from "./Banner.jsx";
import HomePageContainer from "./HomePageContainer.jsx";

const Homepage = () => {
	const { data, isLoading, isError } = useSelector(state => state.productReducer);
	const [retryCount, setRetryCount] = useState(0);
	const dispatch = useDispatch();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	
	
	const fetchProducts = () => {
		// Always fetch data when component mounts or search params change
		const category = searchParams.get("category");
		const sort = searchParams.get("sort");
		const sortByRating = searchParams.get("sortByRating");

		// Build clean query object without 'params' wrapper
		const query = {};
		if (category && category !== "all") query.category = category;
		if (sort) query.sort = sort;
		if (sortByRating) query.sortByRating = sortByRating;
		dispatch(getData(query));
	};
	
	useEffect(() => {
		fetchProducts();
	}, [location.search, dispatch]);

	// Retry mechanism for server errors
	useEffect(() => {
		if (isError && retryCount < 3) {
			const timer = setTimeout(() => {
				setRetryCount(prev => prev + 1);
				fetchProducts();
			}, 2000 * (retryCount + 1)); // Exponential backoff
			
			return () => clearTimeout(timer);
		}
	}, [isError, retryCount]);
	return (
		<div>
			<Banner />
			{isLoading ? (
				<div style={{ 
					padding: "40px", 
					textAlign: "center", 
					backgroundColor: "#f8f9fa",
					margin: "20px",
					borderRadius: "8px",
					border: "1px solid #dee2e6"
				}}>
					<div style={{ 
						width: "40px", 
						height: "40px", 
						border: "4px solid #f3f3f3",
						borderTop: "4px solid #007bff",
						borderRadius: "50%",
						animation: "spin 1s linear infinite",
						margin: "0 auto 20px"
					}}></div>
					<h3>Loading products...</h3>
					<p>Please wait while we fetch the latest products for you.</p>
					<style>{`
						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
					`}</style>
				</div>
			) : isError && retryCount >= 3 ? (
				<div style={{ 
					padding: "20px", 
					textAlign: "center", 
					backgroundColor: "#f8f9fa",
					margin: "20px",
					borderRadius: "8px",
					border: "1px solid #dee2e6"
				}}>
					<h3>Unable to load products</h3>
					<p>The server might be temporarily unavailable. Please try refreshing the page.</p>
					<button 
						onClick={() => {
							setRetryCount(0);
							fetchProducts();
						}}
						style={{
							padding: "10px 20px",
							backgroundColor: "#007bff",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer"
						}}
					>
						Retry
					</button>
				</div>
			) : (
				<HomePageContainer data={data} />
			)}
		</div>
	);
};

export default Homepage;