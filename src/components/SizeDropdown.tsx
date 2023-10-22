
interface SizeType {
  id_size: number;
  p_size: string;
}

interface SizeDropdownProps {
  sizes: SizeType[];
  selectedSize: number;
  onSizeChange: (newSize: number) => void;
}

const SizeDropdown: React.FC<SizeDropdownProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div>
      <label>Select Size: </label>
      <select
        value={selectedSize}
        onChange={(e) => onSizeChange(Number(e.target.value))}
      >
        {sizes.map((sizeData) => (
          <option key={sizeData.id_size} value={sizeData.id_size}>
            {sizeData.p_size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeDropdown;
