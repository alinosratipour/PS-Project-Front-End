import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { BaseWithPrice } from '../SharedTypes';
import { useQuery } from '@apollo/client';
import { GET_ALL_SIZES_WITH_RELATED_BASES } from '../../queries/queries';

interface BaseContextProps {
  availableBases: BaseWithPrice[];
  setAvailableBases: Dispatch<SetStateAction<BaseWithPrice[]>>;
  refetchBases: (idSize: number) => Promise<void>;
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

  // Use the useQuery hook to fetch bases
  const { refetch: refetchBasesQuery } = useQuery<{
    getBasesPricesBySize: BaseWithPrice[];
  }>(GET_ALL_SIZES_WITH_RELATED_BASES);

  // Define the refetchBases function
  const refetchBases = async (idSize: number): Promise<void> => {
    const { data } = await refetchBasesQuery({ id_size: idSize });
    if (data && data.getBasesPricesBySize) {
      setAvailableBases(data.getBasesPricesBySize);
    }
    return Promise.resolve();
  };

  return (
    <BaseContext.Provider value={{ availableBases, setAvailableBases, refetchBases }}>
      {children}
    </BaseContext.Provider>
  );
};
