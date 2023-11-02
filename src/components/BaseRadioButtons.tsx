import React from "react";

interface BaseRadioButtonsProps {

  bases: { base: string; price: number }[];
  onBaseChange: (base: string) => void;
}

const BaseRadioButtons: React.FC<BaseRadioButtonsProps> = ({ bases, onBaseChange }) => {
  return (
    <div>
      <h2>Select a base:</h2>
      {bases.map((base) => (
        <label key={base.base}>
          <input
            type="radio"
            name="base"
            value={base.base}
            onChange={(e) => onBaseChange(e.target.value)}
          />
           {base.base}£{base.price} 
        </label>
      ))}
    </div>
  );
};

export default BaseRadioButtons;
