import { Card, CardQuery, set } from "../entities/cards.entity";
import { Like } from "typeorm";
import { CardPaginationResponse } from "../typeDefs/pagination.typeDefs";
import { dataSource } from "../config/db";

export class CardService {
  /**
   * Retrieves all cards from the database.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if no cards are found.
   */
  async getAllCards(): Promise<Card[]> {
    try {
      const cards = await Card.find();

      if (!cards) throw new Error("No cards found");

      return cards;
    } catch (error) {
      throw new Error("Error getting cards");
    }
  }

  /**
   * Retrieves a paginated list of cards based on query parameters.
   * @param {number} page - The page number to retrieve.
   * @param {number} size - The number of cards per page.
   * @param {CardQuery} data - The query parameters for filtering cards.
   * @returns {Promise<CardPaginationResponse>} A promise that resolves to a paginated response of Card objects.
   * @throws Will throw an error if no cards are found or if there is an error retrieving cards.
   */
  async getCardsWithQuery(
    page: number,
    size: number,
    data: CardQuery
  ): Promise<CardPaginationResponse> {
    let whereClause = {};
    if (data.rarity) {
      whereClause = { ...whereClause, rarity: data.rarity as string };
    }
    if (data.colors && data.colors !== "all") {
      whereClause = { ...whereClause, colors: data.colors as string };
    }
    if (data.set && data.set !== "all") {
      whereClause = { ...whereClause, set: data.set as string };
    }
    if (data.type && data.type !== "all") {
      whereClause = { ...whereClause, type_line: data.type as string };
    }

    try {
      const [cards, total] = await Card.findAndCount({
        where: whereClause,
        take: size,
        skip: (page - 1) * size,
        order: {
          name: "ASC",
        },
      });
      if (cards.length === 0) {
        throw new Error("No cards found");
      }
      return {
        cards,
        totalCount: total,
        pageCount: Math.ceil(total / size),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error getting cards");
    }
  }

  /**
   * Retrieves a list of unique card colors.
   * @returns {Promise<string[]>} A promise that resolves to an array of unique card colors.
   * @throws Will throw an error if there is an issue retrieving card colors.
   */
  async getCardsColors(): Promise<string[]> {
    try {
      const colors = await Card.find({
        select: ["colors"],
      });
      const uniqueColors = [
        ...new Set(colors.flatMap((color) => color.colors)),
      ];
      return uniqueColors;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting colors");
    }
  }

  /**
   * Retrieves a list of unique card types.
   * @param {string} type_line - The type line to filter card types.
   * @returns {Promise<string[]>} A promise that resolves to an array of unique card types.
   * @throws Will throw an error if there is an issue retrieving card types.
   */
  async getCardsTypes(type_line: string): Promise<string[]> {
    let whereClause = {};
    if (type_line) {
      whereClause = { ...whereClause, type_line: type_line as string };
    }
    try {
      const types = await Card.find({
        select: ["type_line"],
      });
      const uniqueTypes = [...new Set(types.flatMap((t) => t.type_line))];
      return uniqueTypes;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting types");
    }
  }

  /**
   * Retrieves a list of cards by autocomplete name.
   * @param {string} name - The name or partial name of the card to search for.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if there is an issue retrieving the card.
   */
  async getCardByName(name: string): Promise<Card[]> {
    try {
      const card = await Card.find({
        where: {
          name: Like(`%${name}%`),
        },
        take: 100,
      });
      return card;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting card");
    }
  }

  /**
   * Retrieves all unique card sets.
   * @returns {Promise<set[]>} A promise that resolves to an array of set objects.
   * @throws Will throw an error if there is an issue retrieving sets.
   */
  async getAllSets(): Promise<set[]> {
    try {
      const sets = await Card.find({
        select: ["set_name", "set"],
        order: {
          set_name: "ASC",
        },
      });
      const uniqueSets = [
        ...new Set(
          sets.map((set) =>
            JSON.stringify({ name: set.set_name, value: set.set })
          )
        ),
      ].map((set) => JSON.parse(set));
      return uniqueSets;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting sets");
    }
  }

  /**
   * Retrieves an array of random cards.
   * @param {number} count - The number of random cards to retrieve.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if there is an issue retrieving cards.
   */
  async getRandomCards(count: number = 5): Promise<Card[]> {
    try {
      const cards = await dataSource
        .getRepository(Card)
        .createQueryBuilder("card")
        .leftJoinAndSelect("card.image_uris", "image_uris")
        .orderBy("RANDOM()")
        .limit(count)
        .getMany();
      return cards;
    } catch (error) {
      console.error("Error getting random cards:", error);
      throw new Error("Error getting random cards");
    }
  }
}
