/*import React, { useEffect, useState } from "react";
import "./cartstyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);
  console.log(carts);

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Remove From Your Cart");
  };

  // remove single item
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e));
  };

  // empty cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    toast.success("Your Cart is Empty");
  };

  // count total price
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setPrice(totalprice);
  };

  // count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PDUJALI9JETbgsVyMH3Agw9CgPVs4Op1sKxOfkDBTA9CkjWpv9Ngd0IPcfatvAsO5haomouAtqPkccPqNjdNeQf00Nbx7YiNa"
    );

    const body = {
      products: carts,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8080/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={emptycart}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>EmptyCart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        {" "}
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <tr>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => handleDecrement(data.id)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.imgdata} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="product-name">
                              <p>{data.dish}</p>
                            </div>
                          </td>
                          <td>{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={
                                  data.qnty <= 1
                                    ? () => handleDecrement(data.id)
                                    : () => handleSingleDecrement(data)
                                }
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                              <input
                                type="text"
                                className="qty-input-box"
                                value={data.qnty}
                                disabled
                                name=""
                                id=""
                              />
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={() => handleIncrement(data)}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            ₹ {data.qnty * data.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalquantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">₹ {totalprice}</span>
                      </th>
                      <th className="text-right">
                        <button
                          className="btn btn-success"
                          onClick={makePayment}
                          type="button"
                        >
                          Checkout
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
*/
import React, { useState, useEffect } from "react";
import "./cartstyle.css";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CartDetails = () => {
  const [cartData, setCartData] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userProfileResponse = await axios.get(
          "http://localhost:8000/api/user/current",
          config
        );
        setUserProfile(userProfileResponse.data);

        if (userProfileResponse.data) {
          const userId = userProfileResponse.data._id;

          const response = await axios.get(
            `http://localhost:8000/api/cart/getItem/${userId}`
          );
          setCartData(response.data);
          console.log(userId);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  /* add to cart
  const handleIncrement = (item) => {
    setCartData((prevCartData) =>
      prevCartData.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qnty: cartItem.qnty + 1 }
          : cartItem
      )
    );
  };
*/
const handleEnroll = async () => {
  try {
    //await axios.post(`http://localhost:8000/api/enroll/${userId}/${courseId}`);
    alert("Enrollment successful!");
  } catch (error) {
    // Handle error
   // if (error.response && error.response.data && error.response.data.error) {
     // setEnrollmentError(error.response.data.error);
    //} else {
      //setEnrollmentError("An error occurred while enrolling in the course");
    }
  }






  // remove to cart
  const handleDecrement = (id) => {
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item.id !== id)
    );
    toast.success("Item Removed From Your Cart");
  };

  // empty cart
  const emptyCart = () => {
    setCartData([]);
    toast.success("Your Cart is Empty");
  };

  // count total price and quantity
  useEffect(() => {
    let totalPrice = "";
    let totalQuantity = cartData.length;
    cartData &&
      cartData.forEach((item) => {
        totalPrice += item.courseId.price;
      });
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [cartData]);

  // payment integration
  /*const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PDUJALI9JETbgsVyMH3Agw9CgPVs4Op1sKxOfkDBTA9CkjWpv9Ngd0IPcfatvAsO5haomouAtqPkccPqNjdNeQf00Nbx7YiNa"
    );

    const body = {
      products: cartData,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };
*/
  //const CheckoutButton = ({ amount, currency }) => {

  //pk_test_51PFmXUSCOFMCLlCHODGmMCzl38KwlnKGmTuXkfrRUOnApepBDjAS14Emsc2bHJu0z4S7yGOBB5KbAWmrGnMSkfD6007MeM9AkI
  //
  const handleClick = async ({ cartData }) => {
    try {
      console.log(cartData);
      const stripe = await loadStripe(
        "pk_test_51PFmXUSCOFMCLlCHODGmMCzl38KwlnKGmTuXkfrRUOnApepBDjAS14Emsc2bHJu0z4S7yGOBB5KbAWmrGnMSkfD6007MeM9AkI"
      );

      const response = await axios.post(
        "http://localhost:8000/api/create-checkout-session",
        {
          cartData: cartData.map((course) => ({
            userId:course.userId,
            courseId: course.courseId, // Assuming courseId is needed
            price: course.courseId.price, 
           title:course.courseId.title,
           
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
console.log("workin 2");
      const { sessionId } = response.data;

      console.log(sessionId);
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Error redirecting to checkout:", result.error);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation
                  {cartData && cartData.length > 0
                    ? `(${cartData.length})`
                    : ""}
                </h5>
                {cartData && cartData.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={emptyCart}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>Empty Cart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {cartData && cartData.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Course Title</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData &&
                      cartData.map((course) => (
                        <tr key={course._id}>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => handleDecrement(course._id)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-title">
                              <p>
                                {course.courseId
                                  ? course.courseId.title
                                  : "Title Not Available"}
                              </p>
                            </div>
                          </td>

                          <td>
                            <div className="product-price">
                              <p>
                                {course.courseId
                                  ? course.courseId.price
                                  : "Price Not Available"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalQuantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger"> {totalPrice}</span>
                      </th>
                      <th className="text-right">
                        {/*<button
                          className="btn btn-success"
                          onClick={makePayment}
                          type="button"
                        >
                          Checkout
                    </button>*/}
                        <button
                          onClick={() => handleClick({ cartData: cartData })}
                        >
                          Checkout
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
//54jr8n(z3C(SL.f