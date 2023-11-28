import { gql } from "@apollo/client";

export const GET_PIZZAS_WITH_SIZES_AND_PRICES = gql`
  {
    getpizzasWithSizesAndPrices {
      id_pizza
      sizesWithPrices {
        id_size
        p_size
        price_topping
        price
      }
    }
  }
`;

export const GET_TOPPING_PRICES = gql`
  query GetToppingPricesBySize($id_size: Int) {
    getToppingPricesBySize(id_size: $id_size) {
      id_size
      name
      price
    }
  }
`;

export const GET_ALL_SIZES_WITH_RELATED_BASES = gql`
  query GetBasesPricesBySize($id_size: Int) {
    getBasesPricesBySize(id_size: $id_size) {
      id_base
      base
      price
    }
  }
`;

export const GET_ALL_PIZZAS_LIST = gql`
  {
    getAllPizzasList {
      id_pizza
      name
      top_quantity
      description
      image
    }
  }
`;
export const GET_TOPPINGS_ON_PIZZA = gql`
  query GetToppingsOnPizza($pizzaId: Int) {
    getToppingsOnPizza(pizzaId: $pizzaId) {
      id
      id_pizza
      toppings {
        id
        name
        toppingPrice {
          id
          id_size
          price_topping
        }
      }
    }
  }
`;