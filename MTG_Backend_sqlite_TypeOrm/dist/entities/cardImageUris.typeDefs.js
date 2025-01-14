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
exports.CardImageUris = exports.CardImageUrisInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let CardImageUrisInput = class CardImageUrisInput {
};
exports.CardImageUrisInput = CardImageUrisInput;
__decorate([
    (0, type_graphql_1.Field)({}),
    __metadata("design:type", String)
], CardImageUrisInput.prototype, "small", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CardImageUrisInput.prototype, "normal", void 0);
exports.CardImageUrisInput = CardImageUrisInput = __decorate([
    (0, type_graphql_1.InputType)()
], CardImageUrisInput);
let CardImageUris = class CardImageUris extends typeorm_1.BaseEntity {
};
exports.CardImageUris = CardImageUris;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CardImageUris.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], CardImageUris.prototype, "small", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], CardImageUris.prototype, "normal", void 0);
exports.CardImageUris = CardImageUris = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], CardImageUris);
