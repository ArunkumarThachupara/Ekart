import React, { useState, useEffect }from "react";
import './Fashion.css';
import './index.css';
import { btsFashion } from "./data";
import axios from "axios";
function Fashion({addToCart , addToWishList ,wishListItems}){
    const [btsFashionData, setBtsFashionData] = useState([]);
    useEffect(() => {
        // Make an HTTP GET request to your Django API endpoint
        axios.get('http://localhost:8000/api/btsmerch/btsfashion/')  // Replace with your actual API endpoint URL
            .then(response => {
                setBtsFashionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Run this effect once when the component mounts

    return <div>
    <div className="container">
        {btsFashionData.map((item, index) => (
            <div className="itemWrap">
                <img key={index} src={item.imgURL} alt={`BTS Fashion ${index}`} />
                <p>{item.itemName}</p>
                <p>{item.price}Rs</p>
                <div className="heartIcon" onClick={()=>{addToWishList(item)}}>
                    {wishListItems.includes(item) ? 
                    (<div>
                        <img alt="wishlist" src="../assets/red-heart.svg" />
                        <span className="wishlisttooltip">Added To Wish List</span>
                    </div>) : 
                    (<div>
                        <img alt="wishlist" src="../assets/heart.svg" />
                        <span className="wishlisttooltip">Add to Wish List</span>
                    </div>)}
                </div>
                <div className="icons">
                    <div className="icon-background" onClick={() => addToCart(item)}>
                        <img alt="bag" src="../assets/bagblack.svg" />
                        <span className="tooltip" >Add to Cart</span>
                    </div>
                    <div className="icon-background">
                        <img alt="bag" src="../assets/view.svg" />
                        <span className="tooltip">View Details</span>
                    </div>
                </div>
            </div>
        ))} 
    </div>
    </div>
}

export default Fashion;