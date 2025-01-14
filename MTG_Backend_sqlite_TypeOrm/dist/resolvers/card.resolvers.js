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
exports.CardResolver = void 0;
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
const cards_typeDefs_1 = require("../entities/cards.typeDefs");
const typeorm_1 = require("typeorm");
const pagination_typeDefs_1 = require("../entities/pagination.typeDefs");
class CardResolver {
    /**
     * Retrieves all cards from the database.
     * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
     * @throws Will throw an error if no cards are found.
     */
    getCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield cards_typeDefs_1.Card.find();
            if (!cards)
                throw new Error("No cards found");
            return cards;
        });
    }
    /**
     * Retrieves a paginated list of cards based on query parameters.
     * @param {number} page - The page number to retrieve.
     * @param {number} size - The number of cards per page.
     * @param {CardQuery} data - The query parameters for filtering cards.
     * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
     * @throws Will throw an error if no cards are found or if there is an error retrieving cards.
     */
    getCardsWithQuery(page, size, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let whereClause = {};
            if (data.rarity) {
                whereClause = Object.assign(Object.assign({}, whereClause), { rarity: data.rarity });
            }
            if (data.colors && data.colors !== "all") {
                whereClause = Object.assign(Object.assign({}, whereClause), { colors: data.colors });
            }
            if (data.set && data.set !== "all") {
                whereClause = Object.assign(Object.assign({}, whereClause), { set: data.set });
            }
            if (data.type && data.type !== "all") {
                whereClause = Object.assign(Object.assign({}, whereClause), { type_line: data.type });
            }
            try {
                const [cards, total] = yield cards_typeDefs_1.Card.findAndCount({
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
            }
            catch (error) {
                console.error(error);
                throw new Error("Error getting cards");
            }
        });
    }
    /**
     * Retrieves a list of unique card colors.
     * @returns {Promise<string[]>} A promise that resolves to an array of unique card colors.
     * @throws Will throw an error if there is an issue retrieving card colors.
     */
    getCardsColors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colors = yield cards_typeDefs_1.Card.find({
                    select: ["colors"],
                });
                const uniqueColors = [
                    ...new Set(colors.flatMap((color) => color.colors)),
                ];
                return uniqueColors;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error getting colors");
            }
        });
    }
    /**
     * Retrieves a list of unique card types.
     * @param {string} type_line - The type line to filter card types.
     * @returns {Promise<string[]>} A promise that resolves to an array of unique card types.
     * @throws Will throw an error if there is an issue retrieving card types.
     */
    getCardsTypes(type_line) {
        return __awaiter(this, void 0, void 0, function* () {
            let whereClause = {};
            if (type_line) {
                whereClause = Object.assign(Object.assign({}, whereClause), { type_line: type_line });
            }
            try {
                const types = yield cards_typeDefs_1.Card.find({
                    select: ["type_line"],
                });
                const uniqueTypes = [...new Set(types.flatMap((t) => t.type_line))];
                return uniqueTypes;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error getting types");
            }
        });
    }
    /**
     * Retrieves a list of 10 cards by autocomplete name.
     * @param {string} name - The name or partial name of the card to search for.
     * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
     * @throws Will throw an error if there is an issue retrieving the card.
     */
    getCardByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const card = yield cards_typeDefs_1.Card.find({
                    where: {
                        name: (0, typeorm_1.Like)(`%${name}%`),
                    },
                    take: 10,
                });
                return card;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error getting card");
            }
        });
    }
    getAllSets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sets = yield cards_typeDefs_1.Card.find({
                    select: ["set_name", "set"],
                    order: {
                        set_name: "ASC",
                    },
                });
                /*     const uniqueSets = [...new Set(sets.flatMap((set) => set.set_name))];
                return uniqueSets; */
                const uniqueSets = [
                    ...new Set(sets.map((set) => JSON.stringify({ name: set.set_name, value: set.set }))),
                ].map((set) => JSON.parse(set));
                return uniqueSets;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error getting sets");
            }
        });
    }
}
exports.CardResolver = CardResolver;
__decorate([
    (0, type_graphql_2.Query)(() => [cards_typeDefs_1.Card]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getCards", null);
__decorate([
    (0, type_graphql_2.Query)(() => pagination_typeDefs_1.CardPaginationResponse),
    __param(0, (0, type_graphql_1.Arg)("page", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("size", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, cards_typeDefs_1.CardQuery]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getCardsWithQuery", null);
__decorate([
    (0, type_graphql_2.Query)(() => [String]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getCardsColors", null);
__decorate([
    (0, type_graphql_2.Query)(() => [String]),
    __param(0, (0, type_graphql_1.Arg)("type_line")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getCardsTypes", null);
__decorate([
    (0, type_graphql_2.Query)(() => [cards_typeDefs_1.Card]),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getCardByName", null);
__decorate([
    (0, type_graphql_2.Query)(() => [cards_typeDefs_1.set]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getAllSets", null);
