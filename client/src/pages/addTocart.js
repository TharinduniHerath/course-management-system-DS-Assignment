import React, { useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addToCart = async (e) => {
  e.preventDefault();
  try {
    
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`http://localhost:8000/api/cart/addItem'`, {
        name: name,
        price: price,
        quantity: quantity,
      })
      .then((response) => {
        console.log(response.data);
        console.log("added to cart");
       
      })
    } catch (error) {
        console.error("Error adding to cart: ", error);
      };
  };

  return (
    <div>
      <h2>Cart Page</h2>
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default CartPage;
