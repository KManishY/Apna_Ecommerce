import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "./SinglePage.module.css";

const SinglePage = () => {
	const { id } = useParams();
	console.log("id: ", id);
	const { data } = useSelector(state => state.productReducer);
	// console.log("state: ", data);
	// console.log("params: ", params);

	const [product] = data.filter(el => el._id === id);
	console.log("product: ", product);

	return (
		<div>
			<div style={{marginLeft:"5rem",height:'2.5rem',marginTop:"1.5rem"}}>
				<button className={styled.back_btn}>Back</button>
			</div>
		<div className={styled.singlePage_main_div}>
			<div>
				<img
					className={styled.product_image}
					src={product.prod_image}
					alt="product imgae"
				/>
			</div>
			<div className={styled.product_info_div}>
				<h1 className={styled.product_name}>
					{product.prod_name}
				</h1>
				<p className={styled.product_description}>
					{product.prod_desc}
				</p>
				<p className={styled.all_p}>
					{" "}Product Type: {product.prod_cat}
				</p>
				<p className={styled.all_p}>
					Rating : {product.prod_rating}&#9733;
				</p>
				<p className={styled.all_p}>
					Discount : {product.prod_discount}%
				</p>
				<p className={styled.all_p}>
					Deal Price: {product.prod_price}
				</p>
			</div>
		</div>
		</div>
	);
};

export default SinglePage;
