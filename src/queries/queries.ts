import gql from "graphql-tag";
import { gql } from "@apollo/client";

export const GET_ALL_SIZES_WITH_RELATED_BASES = gql`
  query {
    getAllSizesWithRelatedBases {
      size
      bases {
        base
        price
      }
    }
  }
`;