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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserInput = void 0;
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
const type_graphql_3 = require("type-graphql");
const typeorm_1 = require("typeorm");
const argon2_1 = __importDefault(require("argon2"));
const deck_typeDefs_1 = require("./deck.typeDefs");
let UserInput = class UserInput extends typeorm_1.BaseEntity {
};
exports.UserInput = UserInput;
__decorate([
    (0, type_graphql_3.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_3.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_3.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
exports.UserInput = UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let User = class User extends typeorm_1.BaseEntity {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield argon2_1.default.hash(this.password);
        });
    }
};
exports.User = User;
__decorate([
    (0, type_graphql_3.Field)(() => type_graphql_2.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_3.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, type_graphql_3.Field)(),
    (0, typeorm_1.Column)({ length: 64, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_3.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, type_graphql_3.Field)(() => [deck_typeDefs_1.Deck]),
    (0, typeorm_1.OneToMany)(() => deck_typeDefs_1.Deck, (deck) => deck.ownerId),
    __metadata("design:type", Array)
], User.prototype, "decks", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], User);
