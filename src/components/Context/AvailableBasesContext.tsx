import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for context data
export interface AvailableBasesContextType {
  availableBases: {
    id_base: number;
    base: string;
    price: number;
  }[];
  setAvailableBases: (bases: {
    id_base: number;
    base: string;
    price: number;
  }[]) => void;
}

const AvailableBasesContext = createContext<AvailableBasesContextType | undefined>(undefined);

export const useAvailableBases = (): AvailableBasesContextType => {
  const context = useContext(AvailableBasesContext);
  if (!context) {
    throw new Error("useAvailableBases must be used within an AvailableBasesProvider");
  }
  return context;
};

interface AvailableBasesProviderProps {
  children: ReactNode;
}

export const AvailableBasesProvider: React.FC<AvailableBasesProviderProps> = ({ children }) => {
  const [availableBases, setAvailableBases] = useState<{
    id_base: number;
    base: string;
    price: number;
  }[]>([]);

  return (
    <AvailableBasesContext.Provider value={{ availableBases, setAvailableBases }}>
      {children}
    </AvailableBasesContext.Provider>
  );
};
