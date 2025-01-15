import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./config/db";
import { UserResolver } from "./resolvers/user.resolver";
import { CardResolver } from "./resolvers/card.resolvers";
import { populateDatabase } from "./libs/populatedBGraphQL";
import { AuthResolver } from "./resolvers/auth.resolvers";
import { DeckResolver } from "./resolvers/deck.resolvers";
import { jwtVerify } from "jose";
import cookieParser from "cookie-parser";
import { authChecker } from "./middleware/authChecker";

const main = async () => {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

  const schema = await buildSchema({
    resolvers: [UserResolver, CardResolver, AuthResolver, DeckResolver],
    authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const token = req.headers.cookie?.split("access_token=")[1];
      try {
        if (!token) {
          return { req, res };
        }
        const decoded = await jwtVerify(token, JWT_SECRET);
        const user = {
          id: decoded.payload.userId as string,
          email: decoded.payload.email as string,
          username: decoded.payload.username as string,
          role: decoded.payload.role as string,
        };
        return { req, res, user };
      } catch (error) {
        return { req, res };
      }
    },
  });

  await dataSource.initialize();
  //populateDatabase();

  console.log(`🚀  Server ready at: ${url}`);
};

main();
