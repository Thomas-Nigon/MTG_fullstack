//import { CardPromise } from "@/types-d";
import { gql } from "@apollo/client";

export const GET_ALL_CARDS = gql`
  query GetCardsWithQuery($data: CardQuery!, $size: Int!, $page: Int!) {
    getCardsWithQuery(data: $data, size: $size, page: $page) {
      cards {
        card_id
        name
        rarity
        image_uris {
          normal
        }
      }
      pageCount
      totalCount
    }
  }
`;
