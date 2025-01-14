"use strict";
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
exports.getSets = exports.getCardByName = exports.getCardsTypes = exports.getCardsColors = exports.getCards = void 0;
const typeorm_1 = require("typeorm");
const cards_typeDefs_1 = require("../entities/cards.typeDefs");
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, rarity, colors, set } = req.query;
    let whereClause = {};
    if (rarity) {
        whereClause = Object.assign(Object.assign({}, whereClause), { rarity: rarity });
    }
    if (colors && colors !== "all") {
        whereClause = Object.assign(Object.assign({}, whereClause), { colors: colors });
    }
    if (rarity && rarity !== "all") {
        whereClause = Object.assign(Object.assign({}, whereClause), { rarity: rarity });
    }
    if (set) {
        whereClause = Object.assign(Object.assign({}, whereClause), { set: set });
    }
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(size, 10) || 10;
    try {
        const [cards, total] = yield cards_typeDefs_1.Card.findAndCount({
            where: whereClause,
            take: pageSize,
            skip: (pageNumber - 1) * pageSize,
            order: {
                name: "ASC",
            },
        });
        if (cards.length === 0) {
            res.status(404).send("No cards found");
        }
        else {
            res.json({
                data: cards,
                total,
                page,
                pageCount: Math.ceil(total / pageSize),
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error getting ads");
    }
});
exports.getCards = getCards;
const getCardsColors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield cards_typeDefs_1.Card.find({
            select: ["colors"],
        });
        const uniqueColors = [...new Set(colors.flatMap((color) => color.colors))];
        res.json(uniqueColors);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error getting colors");
    }
});
exports.getCardsColors = getCardsColors;
const getCardsTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type_line } = req.query;
    let whereClause = {};
    if (type_line) {
        whereClause = Object.assign(Object.assign({}, whereClause), { type_line: type_line });
    }
    try {
        const types = yield cards_typeDefs_1.Card.find({
            select: ["type_line"],
        });
        const uniqueTypes = [...new Set(types.flatMap((t) => t.type_line))];
        res.json(uniqueTypes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error getting colors");
    }
});
exports.getCardsTypes = getCardsTypes;
const getCardByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.cardName;
    try {
        const card = yield cards_typeDefs_1.Card.find({
            where: {
                name: (0, typeorm_1.Like)(`%${name}%`),
            },
            take: 10,
        });
        res.json(card);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error getting card");
    }
});
exports.getCardByName = getCardByName;
const getSets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sets = yield cards_typeDefs_1.Card.find({
            select: ["set_name", "set"],
            order: {
                released_at: "DESC",
            },
        });
        //const uniqueSets = [...new Set(sets.flatMap((set) => set.set_name))];
        const uniqueSets = [
            ...new Set(sets.map((set) => JSON.stringify({ name: set.set_name, value: set.set }))),
        ].map((set) => JSON.parse(set));
        res.json(uniqueSets);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error getting sets");
    }
});
exports.getSets = getSets;
