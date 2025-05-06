import { gql } from "@apollo/client";

export const GET_RANDOM_CARDS = gql`
  query GetRandomCards($count: Int!) {
    getRandomCards(count: $count) {
      id
      card_id
      oracle_id
      name
      lang
      released_at
      image_uris {
        small
        normal
        png
        large
        border_crop
        id
      }
      mana_cost
      cmc
      type_line
      colors
      color_identity
      produced_mana
      set
      set_name
      rarity
      border_color
    }
  }
`;
