import React from 'react';
import './Fashion.css';
import './index.css';
function SearchResults({ searchResults,addToCart,addToWishList ,wishListItems }) {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="container">
      {searchResults && searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          searchResults.map((result,index) => (
            <div  key={result.id} className='itemWrap'>
              <img key={index} src={result.imgURL} alt={result.itemName} />
              <p>{result.itemName}</p>
              <p>Price: {result.price} Rs</p>
              <div className="heartIcon" onClick={()=>{addToWishList(result)}}>
                    {wishListItems.includes(result) ? 
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
                    <div className="icon-background" onClick={() => {console.log("result",result);addToCart(result)}}>
                        <img alt="bag" src="../assets/bagblack.svg" />
                        <span className="tooltip" >Add to Cart</span>
                    </div>
                    <div className="icon-background">
                        <img alt="bag" src="../assets/view.svg" />
                        <span className="tooltip">View Details</span>
                    </div>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchResults;
