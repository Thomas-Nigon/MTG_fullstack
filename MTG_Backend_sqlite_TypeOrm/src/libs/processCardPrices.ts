import { CardPrice } from "../entities/CardPrice.entity";
import { Card } from "../entities/cards.entity";

export const processCardPrice = (cardObj: Card): CardPrice => {
  const cardPrice = new CardPrice();
  if (cardObj.prices && cardObj.prices.usd) {
    cardPrice.usd = cardObj.prices.usd;
  } else {
    cardPrice.usd = "no_price";
  }
  if (cardObj.prices && cardObj.prices.usd_foil) {
    cardPrice.usd_foil = cardObj.prices.usd_foil;
  } else {
    cardPrice.usd_foil = "no_price";
  }

  if (!cardObj.mana_cost) {
    cardObj.mana_cost = "no_mana";
  }
  return cardPrice;
};
