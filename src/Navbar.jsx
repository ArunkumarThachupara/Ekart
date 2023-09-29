import './navbar.css';
import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuthContext  } from "./UserAuth";
function Navbar({ cartItemCount , wishListItemCount}){
    const { currentUser, logoutUser } = useContext(UserAuthContext);
    console.log("currentUser:", currentUser);
    return ( <div>
        <div className='navbar'>
            <h3>A2ZBTS</h3>
            <Link to="/btsfashion">BTS Fashion</Link>
            <Link to="/btsalbums">BTS Albums</Link>
            <Link to="/bt21collection">BT21 Collection</Link>
            {currentUser ? (<span style={{ color: "red" }}>Hello, {currentUser.firstName}!</span>) : ""}
            <div>
                <img className="searchIcon" alt="search" src="../assets/search.svg" ></img>

                {currentUser ? (<Link to="/account"><img className="searchIcon" alt="account" src="../assets/account.svg" ></img></Link>)
                 : (<Link to="/register"><img className="searchIcon" alt="account" src="../assets/account.svg" ></img></Link>)
                }
                <Link to="/wishlist">
                    <img className="searchIcon wishlist-icon" alt="wishlist" src="../assets/heart.svg" ></img>
                </Link>
                <Link to="/cart">
                    <img className="searchIcon" alt="cart" src="../assets/bag.svg"></img>
                    {cartItemCount > 0 && (
                        <div className="cart-badge">{cartItemCount}</div>
                    )}
                </Link>
            </div>
        </div>
    </div>
    )

}

export default Navbar;