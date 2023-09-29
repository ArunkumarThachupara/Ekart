import React  from "react";
import "./WishList.css"; // Create a CSS file for styling the sidebar

  
  function WishList({ items,addToCart,removeFromWishList}) {
    return (
      <div>
      <h1 className="heading">Your Wish List</h1>
      {items.length===0? <h1 className="emptyWishlist">Wish List Empty</h1>:""}
      <div className="wishlist">
          {items.map((item, index) => (
            <div key={index} className="wishlist-items" >
              <img src={item.imgURL} alt={`Cart Item ${index}`} />
              <p>{item.itemName}</p>
              <p>{item.price}Rs</p>
              <div className="remove-wishlist-item" onClick={()=>{removeFromWishList(index)}}>
                    <img alt="remove" src="../assets/close.svg"/>
                    <span className="tooltip">Remove Item</span>
                </div>
              <div className="icons">
                    <div className="icon-background" onClick={() => addToCart(item)}>
                        <img alt="bag" src="../assets/bagblack.svg" />
                        <span className="tooltip" >Move to Cart</span>
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
    );
 
  }
  
  export default WishList;