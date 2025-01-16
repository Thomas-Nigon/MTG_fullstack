import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query GetCardByName($name: String!) {
    getCardByName(name: $name) {
      id
      name
      image_uris {
        normal
      }
    }
  }
`;
