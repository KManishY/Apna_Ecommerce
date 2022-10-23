import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditProduct = () => {
	const { id } = useParams();
	const { productData } = useSelector((state) => state.productReducer);
	const [item] = productData.filter((el) => el._id === id);
	console.log("item: ", item);


	return <div>EditProduct</div>;
};

export default EditProduct;



// prod_cat: "Lamp";
// prod_desc: "An eccentric human figure floor lamp that instantly lifts up the mood. A fun and creative designer wooden lamp which could be the best addition to the living room as well as bedroom. The best part is, it is movable and adjustable, therefore you can change it's position and stance as according to the way you want";
// prod_discount: "25";
// prod_image: "https://raw.githubusercontent.com/KManishY/product_image/main/iMAGE/Playful%20Figurine%20Wooden%20Floor%20Lamp.webp";
// prod_name: "Playful Figurine Wooden Floor Lamp";
// prod_price: 4999;
// prod_rating: "5";
// prod_tag: "Lamp And Lights";
// _id: "633db02a355685f9d7cdcad2";