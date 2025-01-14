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
exports.CardPaginationResponse = exports.PaginationInput = void 0;
const type_graphql_1 = require("type-graphql");
const cards_typeDefs_1 = require("./cards.typeDefs");
let PaginationInput = class PaginationInput {
};
exports.PaginationInput = PaginationInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 1 }) // Default to the first page
    ,
    __metadata("design:type", Number)
], PaginationInput.prototype, "page", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 10 }) // Default page size is 10 items
    ,
    __metadata("design:type", Number)
], PaginationInput.prototype, "size", void 0);
exports.PaginationInput = PaginationInput = __decorate([
    (0, type_graphql_1.InputType)()
], PaginationInput);
let CardPaginationResponse = class CardPaginationResponse {
};
exports.CardPaginationResponse = CardPaginationResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [cards_typeDefs_1.Card]),
    __metadata("design:type", Array)
], CardPaginationResponse.prototype, "cards", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CardPaginationResponse.prototype, "totalCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CardPaginationResponse.prototype, "pageCount", void 0);
exports.CardPaginationResponse = CardPaginationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CardPaginationResponse);
