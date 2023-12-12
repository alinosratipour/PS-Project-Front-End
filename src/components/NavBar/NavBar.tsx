// NavBar.tsx
import React, { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

import "./NavBar.scss";

interface TopNavBarProps {
  // You can define any additional props you need
}

const TopNavBar: React.FC<TopNavBarProps> = () => {
  
  return (
    <div className="top-navbar">
      <h1 className="brand">Pizza Shop</h1>
      <FaShoppingBasket className="basket-icon" />
    </div>
  );
};

export default TopNavBar;
