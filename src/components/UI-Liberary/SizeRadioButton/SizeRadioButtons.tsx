import React, { useState } from "react";
import { SizeType } from "../../SharedTypes";

interface SizeRadioButtonsProps {
  sizes: SizeType[];
  onSizeChange: (newSize: number, sizeName: string) => void;
  initialCheckedSize?: string | null | undefined;
}

const SizeRadioButtons: React.FC<SizeRadioButtonsProps> = ({
  sizes,
  onSizeChange,
  initialCheckedSize,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(initialCheckedSize || undefined);
  return (
    <div>
      <h2>Select Size:</h2>
      {sizes.map((sizeData) => (
        <label key={sizeData.id_size}>
          <input
            type="radio"
            name="size"
            value={sizeData.id_size.toString()}
            onChange={() => {
              setSelectedSize(sizeData.p_size);
              onSizeChange(sizeData.id_size, sizeData.p_size);
            }}
            checked={
              sizeData.p_size === initialCheckedSize ||
              sizeData.p_size === selectedSize
            }
          />
          {sizeData.p_size}
        </label>
      ))}
    </div>
  );
};

export default SizeRadioButtons;
