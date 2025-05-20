import { User } from "../entities/user.entity";
import { UserInput, UserUpdateResponse } from "../typeDefs/user.typeDefs";

export class UserService {
  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   * @throws Will throw an error if no users are found.
   */
  async getUsers() {
    try {
      const users = await User.find();

      if (!users) throw new Error("No users found");

      return users;
    } catch (error) {
      throw new Error(`Failed to retrieve users: ${error}`);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<User>} A promise that resolves to the user.
   * @throws Will throw an error if the user is not found.
   */
  async getUserById(id: string) {
    try {
      const user = await User.findOneByOrFail({ id });

      if (!user) throw new Error("User not found");

      return user;
    } catch (error) {
      throw new Error(`Failed to retrieve user: ${error}`);
    }
  }

  /**
   * Create a new user.
   * @param {UserInput} data - The user data.
   * @returns {Promise<User>} A promise that resolves to the newly created user.
   * @throws Will throw an error if the user is not created.
   */
  async createUser(data: UserInput): Promise<User> {
    const { username, email, password } = data;

    try {
      const user = User.create({ username, email, password });

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  /**
   * Updates an existing user.
   * @param {string} id - The ID of the user to update.
   * @param {UserInput} data - The new user data.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   * @throws Will throw an error if the user is not found.
   */
  async updateUser(
    id: string,
    data: UserInput,
    context: any
  ): Promise<UserUpdateResponse> {
    try {
      console.log("id", id);
      const user = await User.findOneByOrFail({ id });

      if (!user) throw new Error("User not found");

      if (context.user.role !== "admin" && String(context.user.id) !== id)
        throw new Error("You are not authorized");

      //assign the new data to the user
      Object.assign(user, data);
      await user.save();
      console.log(user);
      return {
        user,
        success: true,
        message: "User updated successfully",
      };
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @param {any} context - The context containing the current user's information.
   * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted, false otherwise.
   * @throws Will throw an error if the user is not found or if the user is not authorized.
   */
  async deleteUser(id: string, context: any) {
    try {
      const user = await User.findOneByOrFail({ id });

      if (!user) throw new Error("User not found");

      if (context.user.role !== "admin")
        throw new Error("You are not authorized");

      const result = await User.delete(id);

      return result.affected === 1;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`);
    }
  }
}
