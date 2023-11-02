import React from "react";

interface BaseRadioButtonsProps {
  bases: string[];

  onBaseChange: (base: string) => void;
}

const BaseRadioButtons: React.FC<BaseRadioButtonsProps> = ({ bases, selectedBase, onBaseChange }) => {
  return (
    <div>
      <h2>Select a base:</h2>
      {bases.map((base) => (
        <label key={base}>
          <input
            type="radio"
            name="base"
            value={base}
            onChange={(e) => onBaseChange(e.target.value)}
          />
          {base}
        </label>
      ))}
    </div>
  );
};

export default BaseRadioButtons;
