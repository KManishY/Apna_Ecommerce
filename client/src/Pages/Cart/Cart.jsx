import {  Button, Heading, Text } from "@chakra-ui/react";
import style from "./cart.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartData, getCartData } from "../../Redux/AppReducer/action.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.getCartReducer);
  console.log("cart: ", cart);
  if (cart === "Please Login Again") {
    navigate("/login");
  } else if (cart) {
    const total_price = cart.reduce(
      (sum, item) => sum + Number(item.prod_price),
      0
    );
    const after_Discount_price = cart.reduce(
      (sum, item) =>
        sum +
        Number(item.prod_price) -
        (Number(item.prod_price) * Number(item.prod_discount)) / 100,
      0
    );
    const discount_rupee = total_price - after_Discount_price;
    console.log("discount_rupee: ", discount_rupee);
    console.log("price", total_price);
    console.log("after discount", after_Discount_price);
  }
  const [count, setCount] = useState(1);
  const handelincres = () => {
    setCount(count + 1);
  };
  const handeldec = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(count);
    }
  };

  const handleDelete = (item) => {
    const query = { params: item };
    dispatch(deleteCartData(query));
    dispatch(getCartData());
  };

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 100) : text}
        <span
          style={{ color: "brown" }}
          onClick={toggleReadMore}
          className="read-or-hide"
        >
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };
  //   console.log(cart);

  return (
    <div className={style.cart_div}>
      <div className={style.main}>
        {cart &&
          cart.map((el) => (
            <div key={el._id} className={style.main_div}>
              {/* <div> */}
              <img
                className={style.img}
                src={el.prod_image}
                alt={el.prod_name}
              />
              {/* </div> */}

              <div className={style.details}>
                {/* product name */}
                <div>
                  <Heading size="sm" className={style.product_name}>
                    {el.prod_name}
                  </Heading>
                </div>
                {/* product discription */}
                {/* <div>
									<p style={{ color: "gray" }}>
										Description:
									</p>
									<ReadMore
										style={{ color: "red" }}
										className={style.prod_description}
									>
										{el.prod_desc}
									</ReadMore>
								</div> */}
                <div className={style.price_main_div}>
                  {/* price */}

                  {/* discount */}
                  <div>
                    <Text color={"teal"}>
                      {" "}
                      Price: &#x20b9;
                      {el.prod_price * count}
                    </Text>
                    <Text>
                      {" "}
                      Discount:{" "}
                      <span className={style.discount}>
                        {el.prod_discount}%
                      </span>
                    </Text>
                  </div>
                  {/* <div className={style.inc_dec_main_div}>
									<div
										style={{ display: "flex", gap: "10px" }}
									>
										<button onClick={handelincres}>
											+
										</button>
										<p>{count}</p>
										<button onClick={handeldec}>-</button>
									</div>
								</div> */}
                </div>
                <Button
                  colorScheme="blue"
                  className={style.delete_btn}
                  onClick={() => handleDelete(el.prod_id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
      </div>
      <div className={style.side}>
        <div>
          <div className={style.all_paymet_div}>
            <div>
              <p>Amount</p>
            </div>
            <div>
              <p>&#x20b9; 9000</p>
            </div>
          </div>
          <div className={style.hr_div}>
            <hr />
          </div>
        </div>

        {/* CGST */}
        <div>
          <div className={style.all_paymet_div}>
            <div>
              <p>CGST 9%</p>
            </div>
            <div>
              <p>&#x20b9; 7000</p>
            </div>
          </div>
          <div className={style.hr_div}>
            <hr />
          </div>
        </div>
        <div>
          {/* SGST */}
          <div className={style.all_paymet_div}>
            <div>
              <p>SGST 9%</p>
            </div>
            <div>
              <p>&#x20b9; 6000</p>
            </div>
          </div>
          <div className={style.hr_div}>
            <hr />
          </div>
        </div>

        {/* Total */}
        <div className={style.all_paymet_div}>
          <div>
            <b>
              <h1>Total</h1>
            </b>
          </div>
          <div>
            <p>&#x20b9; 5000</p>
          </div>
        </div>
				{/* Coupon duv */}
        <div className={style.coupon_div}>
          <input
            className={style.coupon_input}
            type="text"
            name="" 
            id=""
            placeholder="Coupon Code"
          />
          <button className={style.coupon_btn}>Go</button>
        </div>
				{/* .checkout div */}
        <div className={style.checkout}>
          <button className={style.checkout_btn}>CHECKOUT</button>
        </div>
      </div>

      {/* <Button className={style.order_btn}>Order Now</Button> */}
    </div>
  );
};

export default Cart;
