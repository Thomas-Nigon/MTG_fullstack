import argon2 from "argon2";
import { SignJWT } from "jose";
import { User } from "../entities/user.entity";
import { Arg, Mutation, Resolver, Ctx, Query } from "type-graphql";
import "dotenv/config";
import { Response } from "express";

type userResponse = {
  id: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
};

@Resolver(User)
export class AuthResolver {
  /**
   * Authenticates a user by verifying their email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} A promise that resolves to a JWT access token.
   * @throws Will throw an error if the secret is not found, the user is not found, or the password is invalid.
   */
  @Mutation(() => String)
  async auth(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: { res: Response }
  ) {
    const secret = process.env.APP_SECRET;
    if (!secret) {
      throw new Error("No secret found");
    }

    try {
      const user = await User.findOneBy({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const decode = await argon2.verify(user.password, password);
      if (!decode) throw new Error("Invalid password");

      const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET);

      const accessToken = await new SignJWT({
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        //   .setExpirationTime("10000m")
        .sign(jwtSecretKey);

      // Send the token as an HTTP-only cookie
      res.cookie("access_token", accessToken, {
        httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript
        secure: true, // Ensures the cookie is sent only over HTTPS
        maxAge: 10 * 60 * 1000, // Expiry time: 10 minutes (in milliseconds)
        sameSite: "strict", // Prevents the cookie from being sent with cross-origin requests
        //domain: "localhost", // Set the domain to localhost
      });
      /*    const userResponse: userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      }; */

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  @Query(() => Boolean)
  async isLogged(@Ctx() { req, res }: { req: Request; res: Response }) {
    const sessionCookies = (req.headers as any).cookie;
    if (sessionCookies?.includes("access_token=")) {
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: { req: Request; res: Response }) {
    res.clearCookie("access_token");
    return true;
  }
}
