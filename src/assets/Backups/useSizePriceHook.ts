
import { useState, Dispatch, SetStateAction } from "react";

interface UseSizePrice {
  selectedSizePrice: number | undefined;
  setSelectedSizePrice: Dispatch<SetStateAction<number | undefined>>;
}

const useSizePrice = (): UseSizePrice => {
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(
    undefined
  );

  return { selectedSizePrice, setSelectedSizePrice };
};

export default useSizePrice;
