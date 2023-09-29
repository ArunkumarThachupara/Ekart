import React from "react";
import { btsAlbums} from "./data";
import "./Fashion.css";
import Footer from "./Footer";
function Albums(){
    return <div>
        <div className="container">
        {btsAlbums.map((item, index) => (
            <div className="itemWrap">
                <img key={index} src={item.imgURL} alt={`BTS Fashion ${index}`} />
                <p>{item.itemName}</p>
                <p>{item.price}Rs</p>
                <div className="heartIcon">
                    <img  alt="wishlist" src="../assets/heartb.svg"></img>
                    <span className="wishlisttooltip">Add to Wish list</span>
                </div>
                <div className="icons">
                    <div className="icon-background">
                        <img alt="bag" src="../assets/bagblack.svg" />
                        <span className="tooltip">Add to Cart</span>
                    </div>
                    <div className="icon-background">
                        <img alt="bag" src="../assets/view.svg" />
                        <span className="tooltip">View Details</span>
                        <span>
                        </span>
                    </div>
                </div>  
            </div>
        ))} 
    </div>
    <Footer></Footer>
    </div>
}

export default Albums;