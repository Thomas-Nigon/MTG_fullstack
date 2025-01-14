"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDatabase = populateDatabase;
const db_1 = require("../config/db");
const cardImageUris_typeDefs_1 = require("../entities/cardImageUris.typeDefs");
const fs = __importStar(require("fs"));
const cardPrice_typeDefs_1 = require("../entities/cardPrice.typeDefs");
const cards_typeDefs_1 = require("../entities/cards.typeDefs");
function populateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!db_1.dataSource.isInitialized) {
                yield db_1.dataSource.initialize();
            }
            // await dataSource.initialize();
            // Read the JSON file containing the card array
            const cardsJson = fs.readFileSync("./src/scripts/chunk_0.json", "utf-8");
            const cardsArray = JSON.parse(cardsJson);
            // Iterate through each card object in the array
            for (const cardObj of cardsArray) {
                // check if card is already in the database
                const currentCard = yield db_1.dataSource.manager.findOne(cards_typeDefs_1.Card, {
                    where: { card_id: cardObj.id },
                });
                if (!currentCard) {
                    const imageUris = new cardImageUris_typeDefs_1.CardImageUris();
                    if (cardObj.image_uris && cardObj.image_uris.small) {
                        imageUris.small = cardObj.image_uris.small;
                    }
                    else {
                        imageUris.small = "no_image";
                    }
                    if (cardObj.image_uris && cardObj.image_uris.normal) {
                        imageUris.normal = cardObj.image_uris.normal;
                    }
                    else {
                        imageUris.normal = "no_image";
                    }
                    const cardPrice = new cardPrice_typeDefs_1.CardPrice();
                    if (cardObj.prices && cardObj.prices.usd) {
                        cardPrice.usd = cardObj.prices.usd;
                    }
                    else {
                        cardPrice.usd = "no_price";
                    }
                    if (cardObj.prices && cardObj.prices.usd_foil) {
                        cardPrice.usd_foil = cardObj.prices.usd_foil;
                    }
                    else {
                        cardPrice.usd_foil = "no_price";
                    }
                    if (!cardObj.mana_cost) {
                        cardObj.mana_cost = "no_mana";
                    }
                    // Create the Card entity
                    const card = new cards_typeDefs_1.Card();
                    card.card_id = cardObj.id;
                    card.oracle_id = cardObj.oracle_id;
                    card.name = cardObj.name;
                    card.lang = cardObj.lang;
                    card.released_at = cardObj.released_at;
                    card.image_uris = imageUris;
                    card.mana_cost = cardObj.mana_cost;
                    card.cmc = cardObj.cmc;
                    card.type_line = cardObj.type_line;
                    card.colors = cardObj.colors ? cardObj.colors : ["none"];
                    card.color_identity = cardObj.color_identity.length
                        ? cardObj.color_identity
                        : ["none"];
                    card.produced_mana = cardObj.produced_mana
                        ? cardObj.produced_mana
                        : ["none"];
                    card.set = cardObj.set;
                    card.set_name = cardObj.set_name;
                    card.rarity = cardObj.rarity;
                    card.border_color = cardObj.border_color;
                    card.prices = cardPrice;
                    // Save the card entity (this will also save the related ImageUris entity)
                    yield db_1.dataSource.manager.save(card);
                }
            }
            console.log("Database populated with cards!");
        }
        catch (error) {
            console.error("Error populating database:", error);
        }
        finally {
            // Close the connection when done
            // await dataSource.destroy();
        }
    });
}
