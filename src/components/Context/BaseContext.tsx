import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { BaseWithPrice } from '../SharedTypes';

interface BaseContextProps {
  availableBases: BaseWithPrice[];
  setAvailableBases: Dispatch<SetStateAction<BaseWithPrice[]>>;
}

interface BaseProviderProps {
  children: ReactNode;
}

const BaseContext = createContext<BaseContextProps | undefined>(undefined);

export const useBaseContext = (): BaseContextProps => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBaseContext must be used within a BaseProvider');
  }
  return context;
};

export const BaseProvider: React.FC<BaseProviderProps> = ({ children }) => {
  const [availableBases, setAvailableBases] = useState<BaseWithPrice[]>([]);

  return (
    <BaseContext.Provider value={{ availableBases, setAvailableBases }}>
      {children}
    </BaseContext.Provider>
  );
};
