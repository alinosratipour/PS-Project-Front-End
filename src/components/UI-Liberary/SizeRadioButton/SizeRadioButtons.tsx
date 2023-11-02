import React from "react";


interface SizeType {
    id_size: number;
    p_size: string;
    price_topping: number;
    price: number;
  }
  
interface SizeRadioButtonsProps {
  sizes: SizeType[];
  onSizeChange: (newSize: number) => void;
}

const SizeRadioButtons: React.FC<SizeRadioButtonsProps> = ({
  sizes,
  onSizeChange,
 
}) => {
  return (
    <div>
      <h2>Select Size:</h2>
      {sizes.map((sizeData) => (
        <label key={sizeData.id_size}>
          <input
            type="radio"
            name="size"
            value={sizeData.id_size.toString()}
            onChange={() => onSizeChange(sizeData.id_size)}
          />
          {sizeData.p_size}
        </label>
      ))}
    </div>
  );
};

export default SizeRadioButtons;
