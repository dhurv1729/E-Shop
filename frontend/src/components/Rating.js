import React from 'react';

const Rating = ({ value, text }) => {
  return (
    <div>
      <span>
        <i style={{color:"#e9a018"}} className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        <i style={{color:"#e9a018"}} className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        <i style={{color:"#e9a018"}} className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        <i style={{color:"#e9a018"}} className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        <i style={{color:"#e9a018"}} className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      &nbsp; 
      <span style={{"font-size": "0.9rem"}}>{text} Reviews</span>
    </div>
  );
}

export default Rating;