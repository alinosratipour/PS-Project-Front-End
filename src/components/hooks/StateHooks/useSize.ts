import { useState, Dispatch, SetStateAction } from "react";

interface UseSize {
  selectedSize: string | undefined;
  setSelectedSize: Dispatch<SetStateAction<string | undefined>>;
}

const useSize = (): UseSize => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  return { selectedSize, setSelectedSize };
};

export default useSize;
