"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.DeckResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_typeDefs_1 = require("../entities/user.typeDefs");
const deck_typeDefs_1 = require("../entities/deck.typeDefs");
const cardStack_typeDefs_1 = require("../entities/cardStack.typeDefs");
const cards_typeDefs_1 = require("../entities/cards.typeDefs");
let DeckResolver = class DeckResolver {
    /**
     * Retrieves all decks.
     * @returns {Promise<Deck[]>} A promise that resolves to an array of decks.
     */
    getDecks() {
        return __awaiter(this, void 0, void 0, function* () {
            const decks = yield deck_typeDefs_1.Deck.find();
            if (!decks)
                throw new Error("No decks found");
            return decks;
        });
    }
    /**
     * Creates a new deck.
     * @param {DeckInput} data - The input data for creating a deck, including card stacks, name, description, and owner ID.
     * @returns {Promise<Deck>} A promise that resolves to the newly created deck.
     * @throws {Error} Throws an error if no card stacks are provided or if there is an internal server error.
     */
    createDeck(_a) {
        return __awaiter(this, arguments, void 0, function* ({ cardStacks, name, description, ownerId }) {
            try {
                if (!cardStacks)
                    throw new Error("No deck provided");
                const newDeck = new deck_typeDefs_1.Deck();
                newDeck.name = name;
                newDeck.description = description;
                newDeck.ownerId = ownerId;
                //newDeck.cardStacks = cardStacks;
                const transformedCardStacks = yield Promise.all(cardStacks.map((cardStackInput) => __awaiter(this, void 0, void 0, function* () {
                    const card = yield cards_typeDefs_1.Card.findOneBy({
                        id: parseInt(cardStackInput.cardId),
                    });
                    if (!card) {
                        throw new Error(`Card with id ${cardStackInput.cardId} not found`);
                    }
                    // Create a new CardStack entity
                    const cardStack = new cardStack_typeDefs_1.CardStack();
                    cardStack.card = card; // Assign the found Card entity
                    cardStack.quantity = cardStackInput.quantity;
                    return cardStack;
                })));
                newDeck.cardStacks = transformedCardStacks;
                yield newDeck.save();
                return newDeck;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error creating deck:", error.message);
                    throw new Error(error.message);
                }
                else {
                    console.error("Error creating deck:", error);
                    throw new Error("Internal server error");
                }
            }
        });
    }
    /**
     * Retrieves all decks owned by a specific user.
     * @param {string} userId - The ID of the user whose decks are to be retrieved.
     * @returns {Promise<Deck[]>} A promise that resolves to an array of decks owned by the user.
     * @throws {Error} Throws an error if the user is not found or if no decks are found for the user.
     */
    getDecksByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_typeDefs_1.User.findOneBy({ id: userId });
            if (!user)
                throw new Error("No user found");
            const decks = yield deck_typeDefs_1.Deck.find({ where: { ownerId: user.id } });
            if (!decks)
                throw new Error("No decks found");
            return decks;
        });
    }
    /**
     * Deletes a deck by its ID.
     * @param {string} id - The ID of the deck to be deleted.
     * @returns {Promise<boolean>} A promise that resolves to true if the deck was successfully deleted, otherwise false.
     */
    deleteDeck(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield deck_typeDefs_1.Deck.delete(id);
            return result.affected === 1;
        });
    }
};
exports.DeckResolver = DeckResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [deck_typeDefs_1.Deck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "getDecks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => deck_typeDefs_1.Deck),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deck_typeDefs_1.DeckInput]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "createDeck", null);
__decorate([
    (0, type_graphql_1.Query)(() => [deck_typeDefs_1.Deck]),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "getDecksByUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "deleteDeck", null);
exports.DeckResolver = DeckResolver = __decorate([
    (0, type_graphql_1.Resolver)(deck_typeDefs_1.Deck)
], DeckResolver);
/*    const transformedCardStacks: CardStack[] = await Promise.all(
        cardStacks.map(async (input) => {
          const cardStack = new CardStack();
          cardStack.card = input.card;
          cardStack.quantity = input.quantity;
          await cardStack.save();
          return cardStack;
        })
      );
      newDeck.cardStacks = transformedCardStacks; */
// Transform CardStackInput to CardStack entities
/*      const transformedCardStacks = await Promise.all(
        cardStacks.map(async (cardStackInput) => {
          const card = await Card.findOneBy({
            id: parseInt(cardStackInput.card.id),
          });

          if (!card) {
            throw new Error(`Card with id ${cardStackInput.card.id} not found`);
          }

          // Create a new CardStack entity
          const cardStack = new CardStack();
          cardStack.card = card; // Assign the found Card entity
          cardStack.quantity = cardStackInput.quantity;

          return cardStack;
        })
      ); */
//newDeck.cardStacks = transformedCardStacks;
