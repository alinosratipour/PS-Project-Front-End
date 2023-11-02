import React, { useState } from "react";

interface Option {
  value: any;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selectedValue: any;
  onOptionChange: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onOptionChange }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onOptionChange(selectedValue);
  };

  return (
    <select value={selectedValue} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
