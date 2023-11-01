// SharedTypes.ts (create a file for shared types)
export interface Pizza {
  id_pizza: number;
  name: string;
  description: string;
  image: string;
 
}

export interface SizePriceProps {
  selectedSizePrice: number | undefined;
  size: string; // Add the 'size' property
}



 export interface BasketItem {
 // id: string; // Add a unique identifier
  id_pizza: number;
  name: string;
  price: number | undefined;
  quantity: number;
  size?: string; // Add the 'size' property
}
