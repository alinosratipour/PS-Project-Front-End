import React from "react";

type SizeAndPriceMap = Record<string, { price: number }>;

type PizzaSizeDropdownProps = {
  sizes: string[];
  selectedSize: string | null;
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sizeAndPriceMap: SizeAndPriceMap;
};

const PizzaSizeDropdown: React.FC<PizzaSizeDropdownProps> = ({
  sizes,
  selectedSize,
  handleSizeChange,
  sizeAndPriceMap,
}) => {
  return (
    <div>
      <label>Select Size:</label>
      <select value={selectedSize || ""} onChange={handleSizeChange}>
        <option value="">Select a size</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size} - Price: {sizeAndPriceMap[size].price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PizzaSizeDropdown;
