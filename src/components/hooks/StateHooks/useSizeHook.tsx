import { useState, Dispatch, SetStateAction } from 'react';
import { SizeType } from '../../SharedTypes';


interface SizeHookProps {
  availableSizes: SizeType[];
  setSizes: Dispatch<SetStateAction<SizeType[]>>;
}

const useSizeHook = (): SizeHookProps => {
  const [availableSizes, setAvailableSizes] = useState<SizeType[]>([]);

  const setSizes: SizeHookProps['setSizes'] = (sizes) => {
    setAvailableSizes(sizes);
  };

  return { availableSizes, setSizes };
};

export default useSizeHook;
