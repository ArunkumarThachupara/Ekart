import React, { useState, useEffect,useContext }  from "react";
import "./Cart.css"; // Create a CSS file for styling the sidebar
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { UserAuthContext } from './UserAuth';
function Cart({ items, removeFromCart, isAuthenticated}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderSummary, setShowOrderSummary] = useState(false); // State to control order summary visibility
  const [orderPlaced, setOrderPlaced] = useState(false); // State to show order placed message
  const navigate = useNavigate();
  const { currentUser} = useContext(UserAuthContext); // Get currentUser and isAuthenticated from context

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  }, [items]);

  const handleRemoveItem = (index)=>{
    removeFromCart(index);
  }

  const handleCheckout = async () => {
    console.log("isAuthenticated: ",isAuthenticated);
    console.log("current User: ",currentUser);
    if (isAuthenticated) {
      const userId = currentUser.email; // Assuming your currentUser object has an 'id' field

      const orderData = {
        email: userId,
        items: items,
        total_price: totalPrice,
      };

      const headers = {
        'X-CSRFToken': getCookie('csrftoken'),
      };

      try {
        const response = await axios.post('http://localhost:8000/api/orders/create/', orderData, { headers });

        if (response.status === 201) {
          setShowOrderSummary(false);
          setOrderPlaced(true);
        } else {
          alert('Order placement failed. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert('Error occurred while placing the order');
      }
    } else {
      if (window.confirm("Please log in before proceeding to checkout.")) {
        navigate("/login");
      }
    }
  };
    return (
      <div className="cart">
          <h1>Shopping Bag</h1>
          {items.length===0? <h1>Bag Empty</h1> : ""}
          {items.map((item, index) => (
            <div key={index} className="cart-items" >
                <img src={item.imgURL} alt={`Cart Item ${index}`} />
                <div className="item-info">
                <p>{item.itemName}</p>
                <p>{item.price}Rs</p>
                </div>
                <div className="remove-item" onClick={() => handleRemoveItem(index)}>
                        <img alt="remove" src="../assets/close.svg"/>
                        <span className="tooltip">Remove Item</span>
                </div>
            </div>
          ))}
          <div className="total-price">
            {items.length!==0 ?(
                <div>
                    <h3>Subtotal: Rs. {totalPrice} </h3>
                    <div className="checkout">
                    <button onClick={() => setShowOrderSummary(true)}>Checkout</button>
                    </div>
                  </div>
                ):(
                  ""
                )}
          </div>
          {showOrderSummary && (
        <div className="order-summary">
          {/* Display order summary here */}
          <p>Order Summary:</p>
          {/* Include item names, images, prices, and expected delivery date */}
          {/* Add a button to proceed to pay */}
          <button onClick={handleCheckout}>Proceed to Pay</button>
        </div>
      )}

      {orderPlaced && (
        <div className="order-placed">
          <p>Order placed successfully!</p>
          {/* Display order ID and expected delivery date */}
          <p>Order ID: 1234567</p>
          <p>Expected Delivery Date: {new Date().toLocaleDateString()}</p>
        </div>
      )}
      </div>
    );
  }
  
  export default Cart;