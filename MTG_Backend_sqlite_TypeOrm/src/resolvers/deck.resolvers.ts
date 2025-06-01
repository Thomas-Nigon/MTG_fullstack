import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user.entity";
import { Deck, DeckInput } from "../entities/deck.entity";
import { CardStack } from "../entities/cardStack.entity";
import { Card } from "../entities/cards.entity";

@Resolver(Deck)
export class DeckResolver {
  /**
   * Retrieves all decks.
   * @returns {Promise<Deck[]>} A promise that resolves to an array of decks.
   */
  @Query(() => [Deck])
  async getDecks() {
    const decks = await Deck.find();
    if (!decks) throw new Error("No decks found");
    return decks;
  }

  /**
   * Creates a new deck.
   * @param {DeckInput} data - The input data for creating a deck, including card stacks, name, description, and owner ID.
   * @returns {Promise<Deck>} A promise that resolves to the newly created deck.
   * @throws {Error} Throws an error if no card stacks are provided or if there is an internal server error.
   */
  @Mutation(() => Deck)
  async createDeck(
    @Arg("data") { cardStacks, name, description, ownerId }: DeckInput
  ) {
    try {
      if (!cardStacks) throw new Error("No deck provided");

      const newDeck = new Deck();
      newDeck.name = name;
      newDeck.description = description;
      newDeck.ownerId = ownerId;
      //newDeck.cardStacks = cardStacks;
      const transformedCardStacks = await Promise.all(
        cardStacks.map(async (cardStackInput) => {
          const card = await Card.findOneBy({
            id: parseInt(cardStackInput.cardId),
          });

          if (!card) {
            throw new Error(`Card with id ${cardStackInput.cardId} not found`);
          }

          // Create a new CardStack entity
          const cardStack = new CardStack();
          cardStack.card = card; // Assign the found Card entity
          cardStack.quantity = cardStackInput.quantity;

          return cardStack;
        })
      );

      newDeck.cardStacks = transformedCardStacks;

      await newDeck.save();
      return newDeck;
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error creating deck:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Error creating deck:", error);
        throw new Error("Internal server error");
      }
    }
  }

  /**
   * Retrieves all decks owned by a specific user.
   * @param {string} userId - The ID of the user whose decks are to be retrieved.
   * @returns {Promise<Deck[]>} A promise that resolves to an array of decks owned by the user.
   * @throws {Error} Throws an error if the user is not found or if no decks are found for the user.
   */
  @Query(() => [Deck])
  async getDecksByUser(@Arg("userId") userId: string) {
    const user = await User.findOneBy({ id: userId });
    if (!user) throw new Error("No user found");
    const decks = await Deck.find({ where: { ownerId: user.id } });

    if (!decks) throw new Error("No decks found");
    return decks;
  }

  /**
   * Deletes a deck by its ID.
   * @param {string} id - The ID of the deck to be deleted.
   * @returns {Promise<boolean>} A promise that resolves to true if the deck was successfully deleted, otherwise false.
   */
  @Mutation(() => Boolean)
  async deleteDeck(@Arg("id") id: string) {
    const result = await Deck.delete(id);
    return result.affected === 1;
  }
}
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
