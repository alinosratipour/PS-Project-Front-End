import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { ToppingType } from "../SharedTypes";


// Define the context
interface ToppingsContextType {
  selectedToppings: ToppingType[];
  setSelectedToppings: Dispatch<SetStateAction<ToppingType[]>>;
  toppingsTotal: number;
  setToppingsTotal: Dispatch<SetStateAction<number>>;
}

const ToppingsContext = createContext<ToppingsContextType | undefined>(undefined);

// Define a provider component
interface ToppingsProviderProps {
  children: React.ReactNode;
}

const ToppingsProvider: React.FC<ToppingsProviderProps> = ({ children }) => {
  const [selectedToppings, setSelectedToppings] = useState<ToppingType[]>([]);
  const [toppingsTotal, setToppingsTotal] = useState<number>(0);

  const value: ToppingsContextType = {
    selectedToppings,
    setSelectedToppings,
    toppingsTotal,
    setToppingsTotal,
  };

  return (
    <ToppingsContext.Provider value={value}>
      {children}
    </ToppingsContext.Provider>
  );
};

// Custom hook to use the toppings context
const useToppings = (): ToppingsContextType => {
  const context = useContext(ToppingsContext);
  if (!context) {
    throw new Error("useToppings must be used within a ToppingsProvider");
  }
  return context;
};

export { ToppingsProvider, useToppings };
