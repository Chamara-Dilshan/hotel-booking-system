import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import './StarRating.css';

/**
 * StarRating Component
 *
 * @param {number} rating - Current rating value (0-5)
 * @param {number} maxStars - Maximum number of stars (default: 5)
 * @param {function} onChange - Callback for interactive rating (optional)
 * @param {boolean} interactive - Whether stars are clickable (default: false)
 * @param {string} size - Size of stars: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} color - Color theme: 'gold', 'blue' (default: 'gold')
 * @param {boolean} showValue - Show numeric rating value (default: false)
 */
const StarRating = ({
  rating = 0,
  maxStars = 5,
  onChange,
  interactive = false,
  size = 'md',
  color = 'gold',
  showValue = false
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (value) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    const currentRating = hoverRating || rating;
    const difference = currentRating - index;

    let icon;
    if (difference >= 1) {
      icon = faStar; // Full star
    } else if (difference >= 0.5) {
      icon = faStarHalfAlt; // Half star
    } else {
      icon = faStarEmpty; // Empty star
    }

    const isActive = difference > 0;

    return (
      <span
        key={index}
        className={`star-icon ${isActive ? 'active' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
      >
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  };

  return (
    <div className={`star-rating star-rating--${size} star-rating--${color}`}>
      <div className="star-rating__stars">
        {[...Array(maxStars)].map((_, index) => renderStar(index))}
      </div>
      {showValue && (
        <span className="star-rating__value">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
