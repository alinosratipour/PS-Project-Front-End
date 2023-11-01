import React from "react";

interface SizeType {
  id_size: number;
  p_size: string;
}

interface SizeDropdownProps {
  sizes: SizeType[];
  selectedSize: number;
  onSizeChange: (newSize: number) => void;
  initialMessage: string;
}




const SizeDropdown: React.FC<SizeDropdownProps> = ({
  sizes,
  onSizeChange,
  initialMessage,
}) => {
  return (
    <div>
      <label>Select Size: </label>
      <select
      
        onChange={(e) => onSizeChange(Number(e.target.value))}
      >
        <option value=""  selected>
          {initialMessage}
        </option>
        {sizes.map((sizeData) => (
          <option key={sizeData.id_size} value={sizeData.id_size.toString()}>
            {sizeData.p_size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeDropdown;
