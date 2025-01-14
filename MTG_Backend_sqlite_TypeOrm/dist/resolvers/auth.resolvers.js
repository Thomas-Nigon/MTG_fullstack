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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jose_1 = require("jose");
const user_typeDefs_1 = require("../entities/user.typeDefs");
const type_graphql_1 = require("type-graphql");
let AuthResolver = class AuthResolver {
    /**
     * Authenticates a user by verifying their email and password.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} A promise that resolves to a JWT access token.
     * @throws Will throw an error if the secret is not found, the user is not found, or the password is invalid.
     */
    auth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.APP_SECRET;
            if (!secret) {
                throw new Error("No secret found");
            }
            try {
                const user = yield user_typeDefs_1.User.findOneBy({ email });
                if (!user) {
                    throw new Error("User not found");
                }
                const decode = yield argon2_1.default.verify(user.password, password);
                if (!decode) {
                    throw new Error("Invalid password");
                }
                const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET);
                const accessToken = yield new jose_1.SignJWT({
                    userId: user.id,
                    email: user.email,
                    userName: user.username,
                })
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime("10m")
                    .sign(jwtSecretKey);
                return accessToken;
            }
            catch (error) {
                console.error(error);
                throw new Error("Internal server error");
            }
        });
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "auth", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_typeDefs_1.User)
], AuthResolver);
