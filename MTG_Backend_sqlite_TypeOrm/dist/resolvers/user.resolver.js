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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
const user_typeDefs_1 = require("../entities/user.typeDefs");
let UserResolver = class UserResolver {
    /**
     * Retrieves all users.
     * @returns {Promise<User[]>} A promise that resolves to an array of users.
     */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_typeDefs_1.User.find();
            if (!users)
                throw new Error("No users found");
            return users;
        });
    }
    /**
     * Retrieves a user by their ID.
     * @param {string} id - The ID of the user.
     * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
     */
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_typeDefs_1.User.findOneBy({ id });
            if (!user)
                throw new Error("User not found");
            return user;
        });
    }
    /**
     * Create a new user.
     * @param {UserInput} data - The user data.
     * @returns {Promise<User>} A promise that resolves to the newly created user.
     */
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, password }) {
            const user = user_typeDefs_1.User.create({ username, email, password });
            yield user.save();
            return user;
        });
    }
    /**
     * Updates an existing user.
     * @param {string} id - The ID of the user to update.
     * @param {UserInput} data - The new user data.
     * @returns {Promise<User>} A promise that resolves to the updated user.
     * @throws Will throw an error if the user is not found.
     */
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_typeDefs_1.User.findOneBy({ id });
            if (!user)
                throw new Error("User not found");
            Object.assign(user, data);
            yield user.save();
            return {
                user,
                success: true,
                message: "User updated successfully",
            };
        });
    }
    /**
     * Deletes a user by their ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted, false otherwise.
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_typeDefs_1.User.delete(id);
            return result.affected === 1;
        });
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [user_typeDefs_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_typeDefs_1.User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_typeDefs_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_typeDefs_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_typeDefs_1.User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_typeDefs_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_2.Resolver)(user_typeDefs_1.User)
], UserResolver);
