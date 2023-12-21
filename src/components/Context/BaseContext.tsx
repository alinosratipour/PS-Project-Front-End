import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { BaseWithPrice } from "../SharedTypes";
import { useQuery } from "@apollo/client";
import { GET_ALL_SIZES_WITH_RELATED_BASES } from "../../queries/queries";

interface PizzaBaseContextProps {
  availableBases: BaseWithPrice[];
  setAvailableBases: Dispatch<SetStateAction<BaseWithPrice[]>>;
  refetchBases: (idSize: number) => Promise<void>;
}

interface PizzaBaseProviderProps {
  children: ReactNode;
}

const BaseContext = createContext<PizzaBaseContextProps | undefined>(undefined);

export const useBaseContext = (): PizzaBaseContextProps => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error("useBaseContext must be used within a BaseProvider");
  }
  return context;
};

export const BaseProvider: React.FC<PizzaBaseProviderProps> = ({ children }) => {
  const [availableBases, setAvailableBases] = useState<BaseWithPrice[]>([]);
  const { data, refetch: refetchBasesQuery } = useQuery<{
    getBasesPricesBySize: BaseWithPrice[];
  }>(GET_ALL_SIZES_WITH_RELATED_BASES);

  const availablePizzaBasesData = data?.getBasesPricesBySize ?? [];

  const refetchBases = useMemo(
    () => async (idSize: number): Promise<void> => {
      try {
        const { data } = await refetchBasesQuery({ id_size: idSize });

        if (data && data.getBasesPricesBySize) {
          setAvailableBases(data.getBasesPricesBySize);
        }
      } catch (error) {
        console.error("Error while refetching bases:", error);
      }
    },
    [refetchBasesQuery]
  );

  useEffect(() => {
    if (availablePizzaBasesData) {
      setAvailableBases(availablePizzaBasesData);
    }
  }, [availablePizzaBasesData]);

  return (
    <BaseContext.Provider
      value={{ availableBases, setAvailableBases, refetchBases }}
    >
      {children}
    </BaseContext.Provider>
  );
};
