import "dotenv/config";
import "reflect-metadata";
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

const main = async () => {
  //const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
  const schema = await buildSchema({
    resolvers: [UserResolver, CardResolver, AuthResolver, DeckResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      // Get the user token from the headers.
      try {
        const token = req.headers.authorization || "no token";
        return token;
        // const user = jwtVerify(token, JWT_SECRET);
        //console.log(user);
        //return { user };
      } catch (error) {
        console.error("Error verifying JWT:", error);
        throw new Error("Invalid token");
      }
    },
  });

  await dataSource.initialize();
  //populateDatabase();

  console.log(`🚀  Server ready at: ${url}`);
};

main();

/* 
dotenv.config();

const app = express();
const port = 5050;

app.use(express.json());
const cors = require("cors");

const corsOptions = {
  origin: ["*", process.env.FRONTEND_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cardRoute);
app.use(categoryRoute);
app.use(userRoute);
app.use(deckRoute);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server is running on port ${port}`);
});

export default app;
 */
