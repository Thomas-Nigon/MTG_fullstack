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
exports.CardStack = exports.CardStackInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const deck_typeDefs_1 = require("./deck.typeDefs");
const cards_typeDefs_1 = require("./cards.typeDefs");
let CardStackInput = class CardStackInput {
};
exports.CardStackInput = CardStackInput;
__decorate([
    (0, type_graphql_1.Field)() // ID of the Card being referenced
    ,
    __metadata("design:type", String)
], CardStackInput.prototype, "cardId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int) // Quantity of the card in this stack
    ,
    __metadata("design:type", Number)
], CardStackInput.prototype, "quantity", void 0);
exports.CardStackInput = CardStackInput = __decorate([
    (0, type_graphql_1.InputType)()
], CardStackInput);
let CardStack = class CardStack extends typeorm_1.BaseEntity {
};
exports.CardStack = CardStack;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], CardStack.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cards_typeDefs_1.Card),
    (0, typeorm_1.ManyToOne)(() => cards_typeDefs_1.Card, (card) => card.cardStacks, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", cards_typeDefs_1.Card)
], CardStack.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CardStack.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => deck_typeDefs_1.Deck),
    (0, typeorm_1.ManyToOne)(() => deck_typeDefs_1.Deck, (deck) => deck.cardStacks),
    __metadata("design:type", deck_typeDefs_1.Deck)
], CardStack.prototype, "deck", void 0);
exports.CardStack = CardStack = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], CardStack);
