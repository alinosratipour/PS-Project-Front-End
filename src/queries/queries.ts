
import { gql } from "@apollo/client";

export const GET_PIZZAS_WITH_SIZES_AND_PRICES = gql`
  {
    pizzasWithSizesAndPrices {
      id_pizza
      sizesWithPrices {
        id_size
        p_size
        price
      }
    }
  }
`;

export const GET_ALL_SIZES_WITH_RELATED_BASES = gql`
  {
    getAllSizesWithRelatedBases {
      size
      bases {
        base
      }
    }
  }
`;

