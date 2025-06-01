import { Arg, Int, Query, Resolver } from "type-graphql";
import { Card, CardQuery } from "../entities/cards.entity";
import { CardPaginationResponse } from "../typeDefs/pagination.typeDefs";
import { CardService } from "../services/card.service";

@Resolver(Card)
export class CardResolver {
  private cardService: CardService;

  constructor() {
    this.cardService = new CardService();
  }

  /**
   * Retrieves all cards from the database.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if no cards are found.
   */
  @Query(() => [Card])
  async getCards() {
    return this.cardService.getAllCards();
  }

  /**
   * Retrieves a paginated list of cards based on query parameters.
   * @param {number} page - The page number to retrieve.
   * @param {number} size - The number of cards per page.
   * @param {CardQuery} data - The query parameters for filtering cards.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if no cards are found or if there is an error retrieving cards.
   */
  @Query(() => CardPaginationResponse)
  async getCardsWithQuery(
    @Arg("page", () => Int) page: number,
    @Arg("size", () => Int) size: number,
    @Arg("data") data: CardQuery
  ): Promise<CardPaginationResponse> {
    return this.cardService.getCardsWithQuery(page, size, data);
  }

  /**
   * Retrieves a list of unique card colors.
   * @returns {Promise<string[]>} A promise that resolves to an array of unique card colors.
   * @throws Will throw an error if there is an issue retrieving card colors.
   */
  @Query(() => [String])
  async getCardsColors() {
    return this.cardService.getCardsColors();
  }

  /**
   * Retrieves a list of unique card types.
   * @param {string} type_line - The type line to filter card types.
   * @returns {Promise<string[]>} A promise that resolves to an array of unique card types.
   * @throws Will throw an error if there is an issue retrieving card types.
   */
  @Query(() => [String])
  async getCardsTypes(@Arg("type_line") type_line: string) {
    return this.cardService.getCardsTypes(type_line);
  }

  /**
   * Retrieves a list of 10 cards by autocomplete name.
   * @param {string} name - The name or partial name of the card to search for.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if there is an issue retrieving the card.
   */
  @Query(() => [Card])
  async getCardByName(@Arg("name") name: string) {
    return this.cardService.getCardByName(name);
  }

  /**
   * Retrieves an array of 5 random cards.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if there is an issue retrieving cards.
   */
  @Query(() => [Card])
  async getRandomCards(
    @Arg("count", () => Int, { defaultValue: 5 }) count: number
  ): Promise<Card[]> {
    return this.cardService.getRandomCards(count);
  }
}
