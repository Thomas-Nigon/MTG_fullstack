import { dataSource } from "../config/db";
import { CardImageUris } from "../entities/cardImageUris.typeDefs";
import * as fs from "fs";
import { CardPrice } from "../entities/CardPrice.typeDefs";
import { Card } from "../entities/cards.typeDefs";

export async function populateDatabase() {
  try {
    await dataSource.initialize();
    // Read the JSON file containing the card array
    const cardsJson = fs.readFileSync("./src/scripts/chunk_0.json", "utf-8");
    const cardsArray = JSON.parse(cardsJson);

    // Iterate through each card object in the array
    for (const cardObj of cardsArray) {
      console.log(cardObj.image_uris);
      const imageUris = new CardImageUris();
      if (cardObj.image_uris && cardObj.image_uris.small) {
        imageUris.small = cardObj.image_uris.small;
      } else {
        imageUris.small = "no_image";
      }
      if (cardObj.image_uris && cardObj.image_uris.normal) {
        imageUris.normal = cardObj.image_uris.normal;
      } else {
        imageUris.normal = "no_image";
      }
      console.log("MYCARD URLS", imageUris);

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
      console.log("MYCARD PRICE", cardPrice);
      // Create the Card entity
      const card = new Card();
      card.card_id = cardObj.id;
      card.oracle_id = cardObj.oracle_id;
      card.name = cardObj.name;
      card.lang = cardObj.lang;
      card.released_at = cardObj.released_at;
      card.image_uris = imageUris;
      card.mana_cost = cardObj.mana_cost;
      card.cmc = cardObj.cmc;
      card.type_line = cardObj.type_line;
      card.colors = cardObj.colors;
      card.color_identity = cardObj.color_identity;
      card.produced_mana = cardObj.produced_mana;
      card.set = cardObj.set;
      card.set_name = cardObj.set_name;
      card.rarity = cardObj.rarity;
      card.border_color = cardObj.border_color;
      card.prices = cardObj.prices;

      //console.log("Saving card entity:", card);
      // Save the card entity (this will also save the related ImageUris entity)
      await dataSource.manager.save(card);
    }

    console.log("Database populated with cards!");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    // Close the connection when done
    await dataSource.destroy();
  }
}

populateDatabase();
