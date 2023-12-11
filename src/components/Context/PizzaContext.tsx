import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery, ApolloError } from "@apollo/client";
import { GET_ALL_PIZZAS_LIST } from "../../queries/queries";
import { Pizza } from "../SharedTypes";
import { useLoadingContext } from "./LoadingContext";

interface PizzaContextProps {
  pizzaData: Pizza[];
  pizzaError?: ApolloError;
  selectedPizza: Pizza | null;
  setSelectedPizza: React.Dispatch<React.SetStateAction<Pizza | null>>;
  globalLoading:boolean;
  localLoading:boolean;
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
  const [pizzaError, setPizzaError] = useState<ApolloError | undefined>(
    undefined
  );
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const { loading: globalLoading, setLoading } = useLoadingContext();
  const [localLoading, setLocalLoading] = useState(true);
  const { data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST,
    {
      onCompleted: () => {
        //setPizzaData(data?.getAllPizzasList || []);
        setLocalLoading(false);
       setLoading(false)
      },
      onError: (err) => {
        setLocalLoading(false);
        setPizzaError(err);
        setLoading(false)
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
    globalLoading,
    pizzaError,
    selectedPizza,
    setSelectedPizza,
    localLoading
  };

  return (
    <PizzaContext.Provider value={contextValue}>
      {children}
    </PizzaContext.Provider>
  );
};
