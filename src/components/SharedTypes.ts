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
  id_pizza: number;
  name: string;
  price: number | undefined;
  quantity: number;
  size?: string; // Add the 'size' property
  base: string | undefined;
  basePrice: number | undefined;
  toppings?: ToppingType[];
}

export type BaseWithPrice = {
  id_base: number;
  price: number;
  base: string;
};
export interface ToppingType {
  id_size:number;
  name: string;
  price: number;
  quantity:number;
}