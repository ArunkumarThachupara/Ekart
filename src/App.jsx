import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Fashion from './Fashion';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Albums from './Albums';
import BT21 from './BT21';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import WishList from './WishList';
import { UserAuthProvider } from './UserAuth';
import PrivateRoute from './PrivateRoute';
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems,setWishListeItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add isAuthenticated state

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

   // Function to add an item to the wishlist
  const addToWishList = (item) => {
    if(!wishListItems.includes(item)){
    setWishListeItems([...wishListItems,item]);
    }
  };

  //Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };
  //Function to remove an item from the wishlist
  const removeFromWishList = (index) => {
    const updatedWishListItems = [...wishListItems];
    updatedWishListItems.splice(index, 1);
    setWishListeItems(updatedWishListItems);
  };

  return (
    <div>
    <UserAuthProvider setIsAuthenticated={setIsAuthenticated}> {/* Pass setIsAuthenticated */}
    <BrowserRouter>
      <Navbar cartItemCount={cartItems.length} wishListItemCount={wishListItems.length}></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route
            path="/btsfashion"
            element={<Fashion addToCart={addToCart} addToWishList={addToWishList} wishListItems={wishListItems}/>}
          /> */}
        <Route path="/btsalbums" element={<Albums/>}/>
        <Route path="/bt21Collection" element={<BT21/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={
          <Cart 
            items={cartItems} 
            removeFromCart = {removeFromCart} 
            isAuthenticated = {isAuthenticated}
          />
          }
        />
        <Route path="/btsfashion" element={ 
            <Fashion
              addToCart={addToCart}
              addToWishList={addToWishList}
              wishListItems={wishListItems}
              removeFromWishList={removeFromWishList}
            />
          }
        />
        <Route path="/wishlist" element={
          <WishList 
            items={wishListItems} 
            addToCart={addToCart} 
            removeFromWishList={removeFromWishList}
          />
          }
        />
      </Routes>
    </BrowserRouter>
    </UserAuthProvider>
    </div>
  );
}

export default App;
