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


export  const GET_TOPPING_PRICES = gql`
query GetToppingPricesBySize($id_size: Int) {
  getToppingPricesBySize(id_size: $id_size) {
    id_size
    name
    price
  }
}
`;

export const GET_ALL_SIZES_WITH_RELATED_BASES = gql`
  {
   
    getSizesWithBases {
      size
      bases {
        base
        
      }
    }

  }
`;

// export const GET_TOPPING_PRICE_FOR_SIZES = gql`
//   {
//     getToppingPricesForSizes {
//       size
//       toppingPrices {
//         id_size
//         price_topping
//       }
//     }
//   }
// `;

// export const GET_TOPPING_PRICES_FOR_SIZES = gql`
//  {
//   getToppingPricesForSizes {
//     size
//     toppingPrices {
//       topping {
//         id
//         name  
        
//       }
//       price_topping
//     }
//   }
// }

// `


export const LIST_PIZZAS_WITH_TOPPINGS = gql`
  {
    listPizzasWithToppings {
      id_pizza
      name
      top_quantity
      toppingsOnPizza {
        id_pizza
        toppings {
          id
          name
        }
      }
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
