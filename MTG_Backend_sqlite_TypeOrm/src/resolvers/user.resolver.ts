import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import { Resolver } from "type-graphql";
import { User } from "../entities/user.entity";

import { UserService } from "../services/user.service";
import { GraphQLError } from "graphql";
import { UserInput, UserUpdateResponse } from "../typeDefs/user.typeDefs";

@Resolver(User)
export class UserResolver {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   */
  @Query(() => [User])
  async getUsers() {
    try {
      return this.userService.getUsers();
    } catch (error) {
      throw new GraphQLError("Failed to fetch cards: " + error, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
   */
  @Query(() => User)
  async getUserById(@Arg("id") id: string) {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      throw new GraphQLError("Failed to fetch user: " + error, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  /**
   * Create a new user.
   * @param {UserInput} data - The user data.
   * @returns {Promise<User>} A promise that resolves to the newly created user.
   */
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput) {
    try {
      const { username, email, password } = data;

      return await this.userService.createUser({ username, email, password });
    } catch (error) {
      throw new GraphQLError("Failed to create user: " + error, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  /**
   * Updates an existing user.
   * @param {string} id - The ID of the user to update.
   * @param {UserInput} data - The new user data.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   * @throws Will throw an error if the user is not found.
   */
  @Mutation(() => UserUpdateResponse)
  @Authorized("user", "admin")
  async updateUser(
    @Arg("id") id: string,
    @Arg("data") data: UserInput,
    @Ctx() context: any
  ) {
    try {
      return this.userService.updateUser(id, data, context);
    } catch (error) {
      throw new GraphQLError("Failed to update user: " + error, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @param {any} context - The context containing the current user's information.
   * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted, false otherwise.
   * @throws Will throw an error if the user is not found or if the user is not authorized.
   */
  @Mutation(() => Boolean)
  @Authorized("admin")
  async deleteUser(@Arg("id") id: string, @Ctx() context: any) {
    try {
      return this.userService.deleteUser(id, context);
    } catch (error) {
      throw new GraphQLError("Failed to delete user: " + error, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }
}
