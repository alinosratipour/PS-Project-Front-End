import React, { ReactNode } from "react";
import { BaseProvider } from "./BaseContext";
import { SizeProvider } from "./SizeContext";
import { LoadingProvider } from "./LoadingContext";
import { PizzaProvider } from "./PizzaContext";


interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => (
  <LoadingProvider>
  
    <BaseProvider>
      <SizeProvider>
        <PizzaProvider>{children}</PizzaProvider>
      </SizeProvider>
    </BaseProvider>
   
  </LoadingProvider>
);

export default ContextProvider;
