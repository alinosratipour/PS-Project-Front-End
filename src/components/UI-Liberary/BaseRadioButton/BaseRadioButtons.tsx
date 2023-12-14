import React, { useState } from "react";
import "./BaseRadioButtons.scss";
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
    <div className="Container">
      {bases.map((base) => (
        <label key={base.base} className="label">
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
            className="BaseCustomRadio"
          />
          <span className="BaseName">
            {base.base} { base.price !== 0 &&  `£${base.price}`}
          </span>
        </label>
      ))}
    </div>
  );
};

export default BaseRadioButtons;
