import { query, Request, Response } from "express";
import { Like } from "typeorm";
import { Card } from "../entities/cards.typeDefs";

export const getCards = async (req: Request, res: Response) => {
  const { page, size, rarity, colors, set } = req.query;
  let whereClause = {};
  if (rarity) {
    whereClause = { ...whereClause, rarity: rarity as string };
  }
  if (colors && colors !== "all") {
    whereClause = { ...whereClause, colors: colors as string };
  }
  if (rarity && rarity !== "all") {
    whereClause = { ...whereClause, rarity: rarity as string };
  }
  if (set) {
    whereClause = { ...whereClause, set: set as string };
  }
  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(size as string, 10) || 10;

  try {
    const [cards, total] = await Card.findAndCount({
      where: whereClause,
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      order: {
        name: "ASC",
      },
    });
    if (cards.length === 0) {
      res.status(404).send("No cards found");
    } else {
      res.json({
        data: cards,
        total,
        page,
        pageCount: Math.ceil(total / pageSize),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting ads");
  }
};

export const getCardsColors = async (req: Request, res: Response) => {
  try {
    const colors = await Card.find({
      select: ["colors"],
    });
    const uniqueColors = [...new Set(colors.flatMap((color) => color.colors))];
    res.json(uniqueColors);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting colors");
  }
};
export const getCardsTypes = async (req: Request, res: Response) => {
  const { type_line } = req.query;
  let whereClause = {};
  if (type_line) {
    whereClause = { ...whereClause, type_line: type_line as string };
  }
  try {
    const types = await Card.find({
      select: ["type_line"],
    });
    const uniqueTypes = [...new Set(types.flatMap((t) => t.type_line))];
    res.json(uniqueTypes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting colors");
  }
};

export const getCardByName = async (req: Request, res: Response) => {
  const name = req.body.cardName;
  try {
    const card = await Card.find({
      where: {
        name: Like(`%${name}%`),
      },
      take: 10,
    });
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting card");
  }
};

export const getSets = async (req: Request, res: Response) => {
  try {
    const sets = await Card.find({
      select: ["set_name", "set"],
      order: {
        released_at: "DESC",
      },
    });
    //const uniqueSets = [...new Set(sets.flatMap((set) => set.set_name))];
    const uniqueSets = [
      ...new Set(
        sets.map((set) =>
          JSON.stringify({ name: set.set_name, value: set.set })
        )
      ),
    ].map((set) => JSON.parse(set));
    res.json(uniqueSets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting sets");
  }
};
