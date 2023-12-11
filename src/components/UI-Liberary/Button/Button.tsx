import React from "react";
import classNames from "classnames";
import "./Button.scss";

interface ButtonType {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  colorscheme?: string | null;
  size?: string | null;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: string;
  fontSize?: string | null;
}

const NewButton: React.FC<ButtonType> = ({
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
    "button--whatsApp": colorscheme === "whatsApp",
    "button--disabled": disabled === true,
  });
  const iconClasses = classNames("div", {
    "iconright": iconPosition === "right",
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
      <div className={iconClasses}>
        {icon && iconPosition === "left" && icon} {children}
        {icon && iconPosition === "right" && icon}
      </div>
    </button>
  );
};

export default NewButton;
