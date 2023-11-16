// SizeContext.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { SizeType } from '../SharedTypes';



interface SizeContextProps {
  availableSizes: SizeType[];
  setSizes: Dispatch<SetStateAction<SizeType[]>>;
}

interface SizeProviderProps {
  children: ReactNode;
}

const SizeContext = createContext<SizeContextProps | undefined>(undefined);

export const SizeProvider: React.FC<SizeProviderProps> = ({ children }) => {
  const [availableSizes, setAvailableSizes] = useState<SizeType[]>([]);

  const setSizes: SizeContextProps['setSizes'] = (sizes) => {
    setAvailableSizes(sizes);
  };

  return (
    <SizeContext.Provider value={{ availableSizes, setSizes }}>
      {children}
    </SizeContext.Provider>
  );
};

export const useSizeContext = (): SizeContextProps => {
  const context = useContext(SizeContext);

  if (!context) {
    throw new Error('useSizeContext must be used within a SizeProvider');
  }

  return context;
};
