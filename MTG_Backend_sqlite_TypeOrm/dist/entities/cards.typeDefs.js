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
exports.set = exports.Card = exports.CardInput = exports.CardQuery = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cardStack_typeDefs_1 = require("./cardStack.typeDefs");
const cardImageUris_typeDefs_1 = require("./cardImageUris.typeDefs");
const cardPrice_typeDefs_1 = require("./cardPrice.typeDefs");
let CardQuery = class CardQuery {
};
exports.CardQuery = CardQuery;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardQuery.prototype, "rarity", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardQuery.prototype, "colors", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardQuery.prototype, "set", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CardQuery.prototype, "currentPage", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CardQuery.prototype, "size", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardQuery.prototype, "type", void 0);
exports.CardQuery = CardQuery = __decorate([
    (0, type_graphql_1.InputType)()
], CardQuery);
let CardInput = class CardInput {
};
exports.CardInput = CardInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CardInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CardInput.prototype, "card_id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "oracle_id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "lang", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "released_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cardImageUris_typeDefs_1.CardImageUrisInput, { nullable: true }),
    __metadata("design:type", cardImageUris_typeDefs_1.CardImageUrisInput)
], CardInput.prototype, "image_uris", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "mana_cost", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CardInput.prototype, "cmc", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "type_line", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CardInput.prototype, "colors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CardInput.prototype, "color_identity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CardInput.prototype, "produced_mana", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "set", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "set_name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "rarity", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CardInput.prototype, "border_color", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cardPrice_typeDefs_1.CardPriceInput, { nullable: true }),
    __metadata("design:type", cardPrice_typeDefs_1.CardPriceInput)
], CardInput.prototype, "prices", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cardStack_typeDefs_1.CardStackInput]),
    __metadata("design:type", Array)
], CardInput.prototype, "cardStacks", void 0);
exports.CardInput = CardInput = __decorate([
    (0, type_graphql_1.InputType)()
], CardInput);
let Card = class Card extends typeorm_1.BaseEntity {
};
exports.Card = Card;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Card.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "card_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "oracle_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 64, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "lang", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "released_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cardImageUris_typeDefs_1.CardImageUris),
    (0, typeorm_1.OneToOne)(() => cardImageUris_typeDefs_1.CardImageUris, { cascade: true, eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", cardImageUris_typeDefs_1.CardImageUris)
], Card.prototype, "image_uris", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 8, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "mana_cost", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Card.prototype, "cmc", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "type_line", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], Card.prototype, "colors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], Card.prototype, "color_identity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], Card.prototype, "produced_mana", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "set", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "set_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "rarity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "border_color", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cardPrice_typeDefs_1.CardPrice),
    (0, typeorm_1.OneToOne)(() => cardPrice_typeDefs_1.CardPrice, { cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", cardPrice_typeDefs_1.CardPrice)
], Card.prototype, "prices", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cardStack_typeDefs_1.CardStack]),
    (0, typeorm_1.OneToMany)(() => cardStack_typeDefs_1.CardStack, (cardStack) => cardStack.card),
    __metadata("design:type", Array)
], Card.prototype, "cardStacks", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Card);
let set = class set {
};
exports.set = set;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], set.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], set.prototype, "value", void 0);
exports.set = set = __decorate([
    (0, type_graphql_1.ObjectType)()
], set);
