import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ToppingType } from "../SharedTypes";
import { useQuery } from "@apollo/client";
import { GET_TOPPING_PRICES } from "../../queries/queries";

interface ToppingContextProps {
  availableToppings: ToppingType[];
  setAvailableToppings: Dispatch<SetStateAction<ToppingType[]>>;
  refetchToppings: (idSize: number) => Promise<void>;
  loading: boolean; // Include loading state in the context
}

interface ToppingProviderProps {
  children: ReactNode;
}

const ToppingContext = createContext<ToppingContextProps | undefined>(
  undefined
);

export const useToppingContext = (): ToppingContextProps => {
  const context = useContext(ToppingContext);
  if (!context) {
    throw new Error("useToppingContext must be used within a ToppingProvider");
  }
  return context;
};

export const ToppingProvider: React.FC<ToppingProviderProps> = ({
  children,
}) => {
  const [availableToppings, setAvailableToppings] = useState<ToppingType[]>([]);
  const [currentIdSize, setCurrentIdSize] = useState<number | null>(null);

  // Use the useQuery hook to fetch toppings
  const {
    loading,
    data,
    refetch: refetchToppingsQuery,
  } = useQuery<{
    getToppingPricesBySize: ToppingType[];
  }>(GET_TOPPING_PRICES);

  // Define the refetchToppings function
  const refetchToppings = async (idSize: number): Promise<void> => {
    try {
      await refetchToppingsQuery({ id_size: idSize });
      setCurrentIdSize(idSize);
    } catch (error) {
      console.error("Error refetching toppings:", error);
    }
  };

  // Update availableToppings when data changes and idSize is correct
  useEffect(() => {
    if (data && data.getToppingPricesBySize && currentIdSize !== null) {
      setAvailableToppings(data.getToppingPricesBySize);
    }
  }, [data, currentIdSize]);

  const contextValue: ToppingContextProps = {
    availableToppings,
    setAvailableToppings,
    refetchToppings,
    loading, // Include loading state in the context value
  };

  return (
    <ToppingContext.Provider value={contextValue}>
      {children}
    </ToppingContext.Provider>
  );
};
