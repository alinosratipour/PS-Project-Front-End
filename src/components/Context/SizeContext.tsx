// SizeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQuery, ApolloQueryResult } from "@apollo/client";
import { SizeType, SizeWithPrice, SizesData } from "../SharedTypes";
import { GET_PIZZAS_WITH_SIZES_AND_PRICES } from "../../queries/queries";
export interface SizeContextProps {
  availableSizes: SizeWithPrice[]; // Update this to match the type in the GraphQL response
  setSizes: React.Dispatch<React.SetStateAction<SizeWithPrice[]>>;
  sizesLoading: boolean;
  sizesData?: SizesData;
  refetch: () => Promise<ApolloQueryResult<SizesData>>;
}
interface SizeProviderProps {
  children: ReactNode;
}

const SizeContext = createContext<SizeContextProps | undefined>(undefined);

export const SizeProvider: React.FC<SizeProviderProps> = ({ children }) => {
  const [availableSizes, setAvailableSizes] = useState<SizeType[]>([]);
  const {
    loading: sizesLoading,
    data: sizesData,
    refetch,
  } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);

  useEffect(() => {
    if (sizesData && sizesData.pizzas && Array.isArray(sizesData.pizzas)) {
      // Assuming sizes are present in sizesData, adjust this based on your GraphQL response structure
      const sizes = sizesData.pizzas.map((pizza: any) => pizza.size);

      setAvailableSizes(sizes);
    }
  }, [sizesData]);

  const setSizes: SizeContextProps["setSizes"] = (sizes) => {
    setAvailableSizes(sizes as SizeType[]);
  };

  const contextValue: SizeContextProps = {
    availableSizes,
    setSizes,
    sizesLoading,
    sizesData,
    refetch,
  };

  return (
    <SizeContext.Provider value={contextValue}>{children}</SizeContext.Provider>
  );
};

export const useSizeContext = (): SizeContextProps => {
  const context = useContext(SizeContext);

  if (!context) {
    throw new Error("useSizeContext must be used within a SizeProvider");
  }

  return context;
};

// // SizeContext.tsx
// import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
// import { SizeType } from '../SharedTypes';

// interface SizeContextProps {
//   availableSizes: SizeType[];
//   setSizes: Dispatch<SetStateAction<SizeType[]>>;
// }

// interface SizeProviderProps {
//   children: ReactNode;
// }

// const SizeContext = createContext<SizeContextProps | undefined>(undefined);

// export const SizeProvider: React.FC<SizeProviderProps> = ({ children }) => {
//   const [availableSizes, setAvailableSizes] = useState<SizeType[]>([]);

//   const setSizes: SizeContextProps['setSizes'] = (sizes) => {
//     setAvailableSizes(sizes);
//   };

//   return (
//     <SizeContext.Provider value={{ availableSizes, setSizes }}>
//       {children}
//     </SizeContext.Provider>
//   );
// };

// export const useSizeContext = (): SizeContextProps => {
//   const context = useContext(SizeContext);

//   if (!context) {
//     throw new Error('useSizeContext must be used within a SizeProvider');
//   }

//   return context;
// };

// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
//   useCallback,
// } from "react";
// import { SizeType } from "../SharedTypes";
// import { useQuery } from "@apollo/client";
// import { GET_PIZZAS_WITH_SIZES_AND_PRICES } from "../../queries/queries"; // Adjust the path accordingly

// interface SizeContextProps {
//   availableSizes: SizeType[];
//   setSizes: Dispatch<SetStateAction<SizeType[]>>;
//   refetchSizes: () => void;
// }

// interface SizeProviderProps {
//   children: ReactNode;
// }

// const SizeContext = createContext<SizeContextProps | undefined>(undefined);

// export const SizeProvider: React.FC<SizeProviderProps> = ({ children }) => {
//   const [availableSizes, setAvailableSizes] = useState<SizeType[]>([]);
//   const { refetch: refetchSizesData } = useQuery(
//     GET_PIZZAS_WITH_SIZES_AND_PRICES
//   );

//   const setSizes: SizeContextProps["setSizes"] = (sizes) => {
//     setAvailableSizes(sizes);
//   };

//   const refetchSizes = useCallback(async () => {
//     const { data, loading } = await refetchSizesData();

//     if (!loading && data) {
//       const sizes = data.getpizzasWithSizesAndPrices[0]?.sizesWithPrices || [];
//       setSizes(sizes);

//     }
//   }, [refetchSizesData, setSizes]);

//   return (
//     <SizeContext.Provider value={{ availableSizes, setSizes, refetchSizes }}>
//       {children}
//     </SizeContext.Provider>
//   );
// };

// export const useSizeContext = (): SizeContextProps => {
//   const context = useContext(SizeContext);

//   if (!context) {
//     throw new Error("useSizeContext must be used within a SizeProvider");
//   }

//   return context;
// };
