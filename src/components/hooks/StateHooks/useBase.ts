import { useState, Dispatch, SetStateAction } from "react";

interface UseBase {
  selectedBase: string | undefined;
  setSelectedBase: Dispatch<SetStateAction<string | undefined>>;
}

const useBaseState = (): UseBase => {
  const [selectedBase, setSelectedBase] = useState<string | undefined>(
    undefined
  );

  return { selectedBase, setSelectedBase };
};

export default useBaseState;
