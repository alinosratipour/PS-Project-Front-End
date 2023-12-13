import React from "react";
import classNames from "classnames";
import "./Button.scss";

interface ButtonType {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  colorscheme?: string | null;
  size?: string | null;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: string;
  fontSize?: string | null;
}

const Button: React.FC<ButtonType> = ({
  children,
  colorscheme,
  size,
  disabled,
  icon,
  iconPosition,
  fontSize, 
  onClick,
  ...otherProps
}) => {
  const buttonClasses = classNames("button", {
    "button--small": size === "sm",
    "button--medium": size === "md",
    "button--large": size === "lg",
    "button--primary": colorscheme === "primary",
    "button--secondery": colorscheme === "secondery",
    "button--gost": colorscheme === "gost",
    "button--disabled": disabled === true,
  });
  
  
  const iconClasses = classNames("icon", {
    "iconcenter": iconPosition === "right",
    "iconLeft": iconPosition === "left",
  });
  const style: React.CSSProperties = {
    fontSize: fontSize || undefined, // Set fontSize if provided
  };
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      style={style} 
    >
      <span className={iconClasses}>
        {icon && iconPosition === "left" && icon} {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </button>
  );
};

export default Button;
