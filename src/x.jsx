import React, { useState } from "react";
import './Fashion.css';
import './index.css';
import { btsFashion } from "./data";
import Cart from "./Cart";
import Navbar from "./Navbar";

function Fashion() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
        setIsCartOpen(true); // Open the cart when an item is added
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div>
            <Navbar openCart={toggleCart} /> {/* Pass the toggleCart function as a prop */}
            
            <div className="container">
                {btsFashion.map((item, index) => (
                    <div className="itemWrap" key={index}>
                        {/* ... Your item rendering code ... */}
                        <div className="icon-background" onClick={() => addToCart(item)}>
                            <img alt="bag" src="../assets/bagblack.svg" />
                            <span className="tooltip">Add to Cart</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="cart-toggle" onClick={toggleCart}>
                Open Cart
            </button>
            <Cart items={cartItems} toggleCart={toggleCart} isOpen={isCartOpen} />
        </div>
    );
}

export default Fashion;
