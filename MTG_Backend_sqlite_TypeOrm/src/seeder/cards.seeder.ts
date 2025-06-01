import { dataSource } from "../config/db";
import { CardImageUris } from "../entities/cardImageUris.entity";
import * as fs from "fs";
import * as path from "path";
import { CardPrice } from "../entities/CardPrice.entity";
import { Card } from "../entities/cards.entity";
import { CardStack } from "../entities/cardStack.entity";
import { Deck } from "../entities/deck.entity";
import { processCardImageUris } from "../libs/processCardUris";
import { processCardPrice } from "../libs/processCardPrices";
import { EntityManager } from "typeorm";

/**
 * Populates the database with card data from all JSON files in the cards directory.
 * Clears existing data in the Card, CardImageUris, CardPrice, CardStack, and Deck tables.
 * Reads card data from JSON files and inserts it into the database.
 *
 * @throws Will throw an error if there is an issue reading the files or inserting data into the database.
 */
export async function cardsSeeder(manager: EntityManager) {
  try {
    const cardsDirectory = "./src/seeder/data/cards";

    // Clear the card database
    await dataSource.manager.delete(Deck, {});
    await dataSource.manager.delete(CardStack, {});
    await dataSource.manager.delete(Card, {});
    await dataSource.manager.delete(CardImageUris, {});
    await dataSource.manager.delete(CardPrice, {});

    // Get all JSON files from the directory
    const files = fs
      .readdirSync(cardsDirectory)
      .filter((file) => file.endsWith(".json"));

    console.log(`Found ${files.length} JSON files to process`);

    // Process each file
    for (const file of files) {
      try {
        console.log(`Processing file: ${file}`);
        const filePath = path.join(cardsDirectory, file);
        const cardsJson = fs.readFileSync(filePath, "utf-8");
        const cardsArray = JSON.parse(cardsJson);

        console.log(`Found ${cardsArray.length} cards in ${file}`);

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
          card.color_identity = cardObj.color_identity?.length
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

          // Save the card entity
          await manager.save(card);
        }
        console.log(`Successfully processed ${file}`);
      } catch (fileError) {
        console.error(`Error processing file ${file}:`, fileError);
        // Continue with next file even if one fails
        continue;
      }
    }
    console.log("Database populated with cards from all files!");
  } catch (error) {
    console.error("Error populating database:", error);
  }
}
