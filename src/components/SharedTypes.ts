// SharedTypes.ts (create a file for shared types)
export interface Pizza {
  id_pizza: number;
  name: string;
  description: string;
  image: string;
 
}

export interface SizePriceProps {
  selectedSizePrice: number | undefined;
}
