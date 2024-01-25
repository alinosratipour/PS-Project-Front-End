// Card.tsx

import React, { ReactNode } from "react";
import classNames from "classnames";
import "./Card.scss";

interface CardProps {
  title?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  fixedHeight?: number;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  imageSrc,
  imageWidth,
  imageHeight,
  fixedHeight,
  children,
}) => {
  const hasImage = !!imageSrc;
  const cardClasses = classNames("card", {
    "has-image": hasImage,
  });

  const imageStyles = {
    width: imageWidth ? `${imageWidth}px` : "100%",
    height: imageHeight ? `${imageHeight}px` : "auto",
    borderRadius: "8px",
  };
  const cardStyles = {
    minHeight: fixedHeight ? `${fixedHeight}px` : "400px", // Use fixedHeight if provided, otherwise default to 400px
  };
  return (
    <div className={cardClasses} style={cardStyles}>
      {hasImage ? (
        <img
          className="card__image"
          src={imageSrc}
          alt={title}
          style={imageStyles}
        />
      ) : (
        <div className="card__placeholder"></div>
      )}
      {title && <h2 className="card__title">{title}</h2>}
      {children && <div className="card__content">{children}</div>}
    </div>
  );
};

export default Card;
