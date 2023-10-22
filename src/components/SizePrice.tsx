interface SizePriceProps {
    selectedSizePrice: number | undefined;
  }
  
  function SizePrice({ selectedSizePrice }: SizePriceProps) {
    return (
      <div>
        <p>£{selectedSizePrice || 0}</p>
      </div>
    );
  }
  
  export default SizePrice;
  