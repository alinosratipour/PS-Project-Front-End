import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, ApolloError } from "@apollo/client";
import { GET_ALL_PIZZAS_LIST } from "../../queries/queries";
import { Pizza } from "../SharedTypes";

interface PizzaContextProps {
  pizzaData: Pizza[];
  pizzaLoading: boolean;
  pizzaError?: ApolloError;
  selectedPizza: Pizza | null;
  setSelectedPizza: React.Dispatch<React.SetStateAction<Pizza | null>>;
}

interface PizzaProviderProps {
  children: ReactNode;
}

const PizzaContext = createContext<PizzaContextProps | undefined>(undefined);

export const usePizzaContext = (): PizzaContextProps => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error("usePizzaContext must be used within a PizzaProvider");
  }
  return context;
};

export const PizzaProvider: React.FC<PizzaProviderProps> = ({ children }) => {
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  const [pizzaLoading, setPizzaLoading] = useState(true);
  const [pizzaError, setPizzaError] = useState<ApolloError | undefined>(undefined);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const { error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST,
    {
      onCompleted: () => {
        setPizzaData(data?.getAllPizzasList || []);
        setPizzaLoading(false);
      },
      onError: (err) => {
        setPizzaError(err);
        setPizzaLoading(false);
      },
    }
  );

  useEffect(() => {
    if (data) {
      setPizzaData(data.getAllPizzasList);
    }
  }, [data]);

  

  const contextValue: PizzaContextProps = {
    pizzaData,
    pizzaLoading,
    pizzaError,
    selectedPizza,
    setSelectedPizza,
  };

  return (
    <PizzaContext.Provider value={contextValue}>
      {children}
    </PizzaContext.Provider>
  );
};
