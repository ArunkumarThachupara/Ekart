import React from "react";
import {bt21} from "./data";
import "./Fashion.css";
function BT21({addToCart , addToWishList,wishListItems}){
    return <div>
        <div className="container">
        {bt21.map((item, index) => (
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
                </div>
            </div>
        ))} 
    </div>
    </div>
}

export default BT21;