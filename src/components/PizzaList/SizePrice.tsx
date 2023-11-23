import { SizePriceProps } from "../SharedTypes"; // Import the shared type

function SizePrice({ selectedSizePrice }: SizePriceProps) {
  return (
    <div>
      <p>£{selectedSizePrice || 0}</p>
    </div>
  );
}

export default SizePrice;
