import { useState } from "react";

function RatingStar({
  numberOfStars = 10,
  color = "#FFD700",
  size = 20,
  setIsRating,
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleStarRating(value) {
    setRating(value);
    setIsRating(value);
  }

  const containerStyle = { display: "flex", alignItems: "center", gap: "5px" };
  const starContainer = { display: "flex", alignItems: "center" };

  return (
    <div style={containerStyle}>
      <div style={starContainer}>
        {Array.from({ length: numberOfStars }, (_, i) => i + 1).map(
          (el, index) => (
            <Star
              handleStarRating={() => handleStarRating(index + 1)}
              isFilled={tempRating ? tempRating > index : rating > index}
              handleMouseEnter={() => setTempRating(index + 1)}
              handleMouseLeave={() => setTempRating(0)}
              color={color}
              size={size}
            />
          )
        )}
      </div>
      <span>{tempRating || rating || ""}</span>
    </div>
  );
}

export default RatingStar;

function Star({
  handleStarRating,
  isFilled,
  handleMouseEnter,
  handleMouseLeave,
  color,
  size,
}) {
  const svgContainer = {
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
  };
  return isFilled ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
      style={svgContainer}
      onClick={handleStarRating}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={"white"}
      viewBox="0 0 24 24"
      stroke={color}
      onClick={handleStarRating}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={svgContainer}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}
