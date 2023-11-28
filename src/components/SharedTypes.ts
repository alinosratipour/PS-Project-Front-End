// SharedTypes.ts (create a file for shared types)
export interface Pizza {
  id_pizza: number;
  name: string;
  description?: string;
  top_quantity?:number  
  image?: string;
}
export interface CustomizablePizza extends Pizza {
  size?: string;
  base?: string;
}
export interface SizePriceProps {
  selectedSizePrice: number | undefined;
  size: string; // Add the 'size' property
}


export interface SizeType {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
  bases: {
    id_base: number;
    price: number;
    base: string;
  }[];
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
  availableSizes?: SizeType[]; 
  toppingsTotal?: number;
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
export interface SizeWithPrice {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
}
