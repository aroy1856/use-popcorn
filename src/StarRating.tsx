import { useState } from "react";
import Star from "./Star";

type StarRatingProps = {
  maxRating?: number;
  color?: string;
  size?: number;
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
};

const containerStyle = { display: "flex", alignItems: "center", gap: "16px" };
const starContainerStyle = { display: "flex" };

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  const textStyle = {
    margin: "0",
    lineHeight: "1",
    fontSize: `${size / 1.5}px`,
    color: color,
  };

  function handleSetRating(newRating: number) {
    setRating(newRating);
    onSetRating?.(newRating);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            color={color}
            size={size}
            full={hoverRating ? index < hoverRating : index < rating}
            onClick={() => handleSetRating(index + 1)}
            onHoverIn={() => setHoverRating(index + 1)}
            onHoverOut={() => setHoverRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{hoverRating || rating || ""}</p>
    </div>
  );
}
