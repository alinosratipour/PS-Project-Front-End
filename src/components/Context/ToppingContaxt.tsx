import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { ToppingType } from '../SharedTypes';
import { useQuery } from '@apollo/client';
import { GET_TOPPING_PRICES } from '../../queries/queries';

interface ToppingContextProps {
  availableToppings: ToppingType[];
  setAvailableToppings: Dispatch<SetStateAction<ToppingType[]>>;
  refetchToppings: (idSize: number) => Promise<void>;
}

interface ToppingProviderProps {
  children: ReactNode;
}

const ToppingContext = createContext<ToppingContextProps | undefined>(undefined);

export const useToppingContext = (): ToppingContextProps => {
  const context = useContext(ToppingContext);
  if (!context) {
    throw new Error('useToppingContext must be used within a ToppingProvider');
  }
  return context;
};

export const ToppingProvider: React.FC<ToppingProviderProps> = ({ children }) => {
  const [availableToppings, setAvailableToppings] = useState<ToppingType[]>([]);
 
  // Use the useQuery hook to fetch toppings
  const { loading, error, data, refetch: refetchToppingsQuery } = useQuery<{
    getToppingPricesBySize: ToppingType[];
  }>(GET_TOPPING_PRICES);

  // Define the refetchToppings function
  const refetchToppings = async (idSize: number): Promise<void> => {
    try {
      await refetchToppingsQuery({ id_size: idSize });
    } catch (error) {
      console.error("Error refetching toppings:", error);
    }
  };

  // Update availableToppings when data changes
  useEffect(() => {
    if (data && data.getToppingPricesBySize) {
      setAvailableToppings(data.getToppingPricesBySize);
    }
  }, [data]);

  // Wait until the loading state is false before rendering children
  if (loading) {
    return <div>Loading toppings...</div>;
  }

  if (error) {
    console.error("Error fetching toppings:", error);
    return <div>Error loading toppings. Please try again.</div>;
  }

  return (
    <ToppingContext.Provider value={{ availableToppings, setAvailableToppings, refetchToppings }}>
      {children}
    </ToppingContext.Provider>
  );
};
