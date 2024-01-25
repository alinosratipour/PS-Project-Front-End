import React, { ReactNode } from "react";
import { BaseProvider } from "./BaseContext";
import { SizeProvider } from "./SizeContext";
import { LoadingProvider } from "./LoadingContext";
import { PizzaProvider } from "./PizzaContext";
import { ToppingsProvider } from "./selectedTopping";
import { BasketProvider } from "./BasketContext";

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => (
  <LoadingProvider>
    <BasketProvider>
      <ToppingsProvider>
        <BaseProvider>
          <SizeProvider>
            <PizzaProvider>{children}</PizzaProvider>
          </SizeProvider>
        </BaseProvider>
      </ToppingsProvider>
    </BasketProvider>
  </LoadingProvider>
);

export default ContextProvider;
