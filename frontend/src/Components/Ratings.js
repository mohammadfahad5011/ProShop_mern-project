import React from "react";
// import PropTypes from "prop-types";

const Ratings = ({ rating, text, color }) => {
  return (
    <>
      <div className="rating">
        {/* 1st start */}
        <span>
          <i
            style={{ color }}
            className={
              rating >= 1
                ? "fa-solid fa-star"
                : rating >= 0.5
                ? "fa-regular fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        {/* 2nd start */}
        <span>
          <i
            style={{ color }}
            className={
              rating >= 2
                ? "fa-solid fa-star"
                : rating >= 1.5
                ? "fa-regular fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        {/* 3rd start */}
        <span>
          <i
            style={{ color }}
            className={
              rating >= 3
                ? "fa-solid fa-star"
                : rating >= 2.5
                ? "fa-regular fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        {/* 4th start */}
        <span>
          <i
            style={{ color }}
            className={
              rating >= 4
                ? "fa-solid fa-star"
                : rating >= 3.5
                ? "fa-regular fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        {/* 5th start */}
        <span>
          <i
            style={{ color }}
            className={
              rating >= 5
                ? "fa-solid fa-star"
                : rating >= 4.5
                ? "fa-regular fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>{text ? `${text} reviews` : ""}</span>
      </div>
    </>
  );
};

Ratings.defaultProps = {
  color: "#f8e825",
};

// this is just for prop validation (!! optional !!)
// Ratings.prototype = {
//   review : PropTypes.number.isRequired,
//   text : PropTypes.string.isRequired,
//   color : PropTypes.string
// }

export default Ratings;
