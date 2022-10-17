import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditProduct = () => {
	const { id } = useParams();
	const { productData } = useSelector((state) => state.productReducer);
	const [item] = productData.filter((el) => el._id === id);
	console.log("item: ", item);

	// return  <div classname="container">
	//     <div classname="form_div">
	//         <h1>Form Validation</h1>
	//         <form action="" id="form">
	//             <div classname="input_div">
	//                 <label for="name">Name</label><br>
	//                 <input type="text" name="name" id="" required>
	//             </div>
	//             <div classname="input_div">
	//                 <label for="email">Email</label><br>
	//                 <input classname="email" type="text" name="email" id=""
	//                     required><br>
	//                 <label id="message"></label>
	//             </div>
	//             <div classname="input_div">
	//                 <label
	//                 for="password">Paassword</label><br>
	//                 <input classname="password" type="password" name="password"
	//                 required>
	//                 <label id="passMessage"></label>
	//             </div>
	//             <div classname="input_div btn_div">
	//                 <input classname="submitBtn" type="submit"
	//                     value="validate"/ >
	//             </div>
	//         </form>
	//     </div>
	// </div>;
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