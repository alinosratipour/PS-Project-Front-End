export interface Pizza {
  id_pizza: number;
  name: string;
  description?: string;
  top_quantity?: number;
  image?: string;
}

export type SizesData = {
  getpizzasWithSizesAndPrices: PizzaWithSizesAndPrices[];
};

export type PizzaWithSizesAndPrices = {
  id_pizza: number;
  sizesWithPrices: SizeWithPrice[];
};

export interface SizePriceProps {
  selectedSizePrice: number | undefined;
  size: string;
}

export interface SizeType {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
  bases: BaseWithPrice[];
}

export interface BasketItem {
  id_pizza: number;
  name: string;
  price: number | undefined;
  quantity: number;
  size?: string;
  base: string | undefined;
  basePrice: number | undefined;
  toppings?: ToppingType[];
  availableSizes?: SizeType[];
  toppingsTotal?: number;
  removedToppings?: ToppingType[];
//  size_id?: number; 
}

export type BaseWithPrice = {
  id_base: number;
  price: number;
  base: string;
};

export interface ToppingType {
  id?: number;
  id_size: number;
  name: string;
  price: number;
  quantity: number;
  toppings?: {
    __typename: string;
    pizzas: null;
    id: number;
    name: string;
    toppingPrice: {
      __typename: string;
      id: number;
      id_size: number;
      price_topping: number;
    }[];
  };
}


export interface ToppingsData {
  getToppingsOnPizza: ToppingOnPizza[];
}

export interface SizeWithPrice {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
}

export interface ToppingOnPizza {
  id: number;
  id_pizza: number;
  toppings: ToppingType;
}
