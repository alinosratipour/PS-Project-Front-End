import React, { ReactNode } from "react";
import { BaseProvider } from "./BaseContext";
import { SizeProvider } from "./SizeContext";
import { LoadingProvider } from "./LoadingContext";
import { PizzaProvider } from "./PizzaContext";
import { ToppingsProvider } from "./selectedTopping";


interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => (
  <LoadingProvider>
  <ToppingsProvider>
    <BaseProvider>
      <SizeProvider>
        <PizzaProvider>{children}</PizzaProvider>
      </SizeProvider>
    </BaseProvider>
  </ToppingsProvider>
    
   
  </LoadingProvider>
);

export default ContextProvider;
