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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = exports.DeckInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_typeDefs_1 = require("./user.typeDefs");
const cardStack_typeDefs_1 = require("./cardStack.typeDefs");
let DeckInput = class DeckInput extends typeorm_1.BaseEntity {
};
exports.DeckInput = DeckInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeckInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeckInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeckInput.prototype, "img_url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeckInput.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cardStack_typeDefs_1.CardStackInput]),
    __metadata("design:type", Array)
], DeckInput.prototype, "cardStacks", void 0);
exports.DeckInput = DeckInput = __decorate([
    (0, type_graphql_1.InputType)()
], DeckInput);
let Deck = class Deck extends typeorm_1.BaseEntity {
};
exports.Deck = Deck;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Deck.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Deck.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Deck.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, default: "https://via.placeholder.com/150" }),
    __metadata("design:type", String)
], Deck.prototype, "img_url", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_typeDefs_1.User),
    (0, typeorm_1.ManyToOne)(() => user_typeDefs_1.User, (user) => user.decks),
    __metadata("design:type", String)
], Deck.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cardStack_typeDefs_1.CardStack]),
    (0, typeorm_1.OneToMany)(() => cardStack_typeDefs_1.CardStack, (cardStack) => cardStack.deck, { cascade: true }),
    __metadata("design:type", Array)
], Deck.prototype, "cardStacks", void 0);
exports.Deck = Deck = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Deck);
