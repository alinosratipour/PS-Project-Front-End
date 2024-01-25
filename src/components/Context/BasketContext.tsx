import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { BasketItem } from "../SharedTypes";


interface BasketContextType {
  basket: BasketItem[];
  setBasket: Dispatch<SetStateAction<BasketItem[]>>;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

interface BasketProviderProps {
  children: ReactNode;
}

const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const value: BasketContextType = {
    basket,
    setBasket,
  };

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
};

const useBasketContext = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasketContext must be used within a BasketProvider");
  }
  return context;
};

export { BasketProvider, useBasketContext };
