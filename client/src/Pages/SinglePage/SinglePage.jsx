import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from './SinglePage.module.css'

const SinglePage = () => {
	const { id } = useParams();
	const { data } = useSelector((state) => state.productReducer);
	// console.log("state: ", data);
	// console.log("params: ", params);

	const [product] = data.filter((el) => el._id === id);
	console.log("product: ", product);

	return <div className={styled.singlePage_main_div}>

<div >
	<img className={styled.product_image} src={product.prod_image} alt="product imgae" />
</div>
<div className={styled.product_info_div}>
	<h1 className={styled.product_name}>{product.prod_name}</h1>
	<p className={styled.all_p}> Product Type: {product.prod_cat}</p>
	<p>{product.prod_rating}</p>
	<p className={styled.all_p}>List Price : {product.prod_discount}</p>
	<p className={styled.all_p}>Deal Price: {product.prod_price}</p>
	<p className={styled.all_p}>You Save: {product.prod_price}-{product.prod_discount}</p>
	<p className={styled.product_description}>{product.prod_desc}</p>
</div>

	</div>;
};

export default SinglePage;
