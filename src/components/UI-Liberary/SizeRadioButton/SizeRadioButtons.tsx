import React, { useState } from "react";
import { SizeType } from "../../SharedTypes";
import "./SizeRadioButtons.scss";

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
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    initialCheckedSize || undefined
  );
  return (
    <div className="Container">
      {sizes.map((sizeData) => (
        <label key={sizeData.id_size} className="label">
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
            className="CustomRadio"
          />

          <span className="SizeName">{sizeData.p_size}</span>
        </label>
      ))}
    </div>
  );
};

export default SizeRadioButtons;
