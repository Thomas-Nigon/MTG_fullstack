import { dataSource } from "../config/db";
import { CardImageUris } from "../entities/cardImageUris.typeDefs";
import * as fs from "fs";
import { CardPrice } from "../entities/CardPrice.typeDefs";
import { Card } from "../entities/cards.typeDefs";
import { CardStack } from "../entities/cardStack.typeDefs";
import { Deck } from "../entities/deck.typeDefs";
import { processCardImageUris } from "./processCardUris";
import { processCardPrice } from "./processCardPrices";

/**
 * Populates the database with card data from a JSON file.
 * Clears existing data in the Card, CardImageUris, CardPrice, CardStack, and Deck tables.
 * Reads card data from a JSON file and inserts it into the database.
 *
 * @throws Will throw an error if there is an issue reading the file or inserting data into the database.
 */
export async function populateDatabase() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    // Read the JSON file containing the card array
    const cardsJson = fs.readFileSync("./src/scripts/chunk_0.json", "utf-8");
    const cardsArray = JSON.parse(cardsJson);
    // Clear the card database
    await dataSource.manager.delete(Deck, {});
    await dataSource.manager.delete(CardStack, {});
    await dataSource.manager.delete(Card, {});
    await dataSource.manager.delete(CardImageUris, {});
    await dataSource.manager.delete(CardPrice, {});

    // Iterate through each card object in the array
    for (const cardObj of cardsArray) {
      const imageUris = processCardImageUris(cardObj);
      const cardPrice = processCardPrice(cardObj);

      // Create the Card entity
      const card = new Card();
      card.card_id = cardObj.id || "no_card_id";
      card.oracle_id = cardObj.oracle_id || "no_oracle_id";
      card.name = cardObj.name || "no_name";
      card.lang = cardObj.lang || "no_lang";
      card.released_at = cardObj.released_at || "no_released_at";
      card.image_uris = imageUris;
      card.mana_cost = cardObj.mana_cost || "no_mana_cost";
      card.cmc = cardObj.cmc || 0;
      card.type_line = cardObj.type_line || "no_type_line";
      card.colors = cardObj.colors ? cardObj.colors : ["none"];
      card.color_identity = cardObj.color_identity.length
        ? cardObj.color_identity
        : ["none"];
      card.produced_mana = cardObj.produced_mana
        ? cardObj.produced_mana
        : ["none"];
      card.set = cardObj.set || "no_set";
      card.set_name = cardObj.set_name || "no_set_name";
      card.rarity = cardObj.rarity || "no_rarity";
      card.border_color = cardObj.border_color || "no_border_color";
      card.prices = cardPrice;

      // Save the card entity (this will also save the related ImageUris entity)
      await dataSource.manager.save(card);
    }
    console.log("Database populated with cards!");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    // Close the connection when done
    // await dataSource.destroy();
  }
}
