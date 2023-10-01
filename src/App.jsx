import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Fashion from './Fashion';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState,useEffect } from "react";
import Albums from './Albums';
import BT21 from './BT21';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import WishList from './WishList';
import { UserAuthProvider } from './UserAuth';
import PrivateRoute from './PrivateRoute';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import SearchResults from './SearchResults';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems,setWishListeItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add isAuthenticated state
  const [searchPerformed, setSearchPerformed] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Clear searchResults when navigating away from the search results page
    if (location.pathname !== '/search') {
      setSearchResults([]);
      setSearchPerformed(false);
    }
  }, [location]);

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

  const handleSearch = (query) => {
    // Make an API request here to your search API endpoint
    // You can use fetch or a library like Axios to perform the request
    axios
      .get(`http://localhost:8000/api/btsmerch/search/?query=${query}`)
      .then((response) => {
        const data = response.data;
        setSearchResults(data); // Update the search results state with the API response
        setSearchPerformed(true); // Set searchPerformed to true
      })
      .catch((error) => {
        console.error('Error searching:', error);
      })
      .finally(() => {
        // Use <Navigate> to navigate to the search results
        // This assumes you have a "search" route defined in your <Routes>
        return <Navigate to="/search" />;
      });
  };
  
  

  return (
    <div>
    <UserAuthProvider setIsAuthenticated={setIsAuthenticated}> {/* Pass setIsAuthenticated */}
    {/* <Router> */}
      <Navbar cartItemCount={cartItems.length} wishListItemCount={wishListItems.length}  onSearch={handleSearch}></Navbar>
      { searchPerformed ? (
          <div className="search-results">
            <SearchResults searchResults={searchResults} addToCart={addToCart}
              addToWishList={addToWishList}
              wishListItems={wishListItems}></SearchResults>
          </div>
        ) : (
          <Routes>
        {/* <Route
            path="/btsfashion"
            element={<Fashion addToCart={addToCart} addToWishList={addToWishList} wishListItems={wishListItems}/>}
          /> */}
        <Route path="/" element={<Navigate to="/btsFashion" />}/>
        <Route path="/search" element={<SearchResults searchResults={searchResults} />} />
        <Route path="/btsalbums" element={<Albums addToCart={addToCart}
              addToWishList={addToWishList} wishListItems={wishListItems}/>}/>
        <Route path="/bt21Collection" element={<BT21 addToCart={addToCart}
              addToWishList={addToWishList} wishListItems={wishListItems}/>}/>
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
        
      </Routes>)}
    {/* </Router> */}
    </UserAuthProvider>
    </div>
);
}
export default App;
