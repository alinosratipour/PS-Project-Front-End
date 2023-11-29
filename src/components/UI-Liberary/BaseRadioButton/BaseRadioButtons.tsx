import React, { useState } from "react";

interface BaseRadioButtonsProps {
  bases: { base: string; price: number }[];
  onBaseChange: (base: string, price: number) => void; // Pass both base and price
  selectedSize?: number;
  initialCheckedBase?: string | null | undefined;
}

const BaseRadioButtons: React.FC<BaseRadioButtonsProps> = ({
  bases,
  onBaseChange,
  initialCheckedBase,
}) => {
  const [selectedBase, setSelectedBase] = useState<string | undefined>(
    initialCheckedBase || undefined
  );

  return (
    <div>
      <h2>Select a base:</h2>
      {bases.map((base) => (
        <label key={base.base}>
          <input
            type="radio"
            name="base"
            value={base.base}
            onChange={() => {
              setSelectedBase(base.base);
              onBaseChange(base.base, base.price);
            }} // Pass both base and price
            checked={
              base.base === initialCheckedBase || base.base === selectedBase
            }
          />
          {base.base} £{base.price}
        </label>
      ))}
    </div>
  );
};

export default BaseRadioButtons;
