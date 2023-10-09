import React from 'react';

type PizzaBaseDropdownProps = {
  bases: string[];
  selectedBase: string | null;
  handleBaseChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PizzaBaseDropdown: React.FC<PizzaBaseDropdownProps> = ({
  bases,
  selectedBase,
  handleBaseChange,
}) => {
  return (
    <div>
      <label>Select Pizza Base:</label>
      <select onChange={handleBaseChange} value={selectedBase || ''}>
        <option value="">Select a Base</option>
        {bases.map((base) => (
          <option key={base} value={base}>
            {base}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PizzaBaseDropdown;
