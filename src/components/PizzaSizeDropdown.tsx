import React from 'react';

type PizzaSizeDropdownProps = {
  sizes: string[];
  selectedSize: string | null;
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sizeAndPriceMap: Record<string, number>;
};

const PizzaSizeDropdown: React.FC<PizzaSizeDropdownProps> = ({
  sizes,
  selectedSize,
  handleSizeChange,
  sizeAndPriceMap,
}) => {
  return (
    <div>
      <label>Select Pizza Size:</label>
      <select onChange={handleSizeChange} value={selectedSize || ''}>
        <option value="">Select a Size</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size} - {sizeAndPriceMap[size]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PizzaSizeDropdown;
