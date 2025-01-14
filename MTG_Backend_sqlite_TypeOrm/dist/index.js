"use strict";
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
require("dotenv/config");
require("reflect-metadata");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const type_graphql_1 = require("type-graphql");
const db_1 = require("./config/db");
const user_resolver_1 = require("./resolvers/user.resolver");
const card_resolvers_1 = require("./resolvers/card.resolvers");
const auth_resolvers_1 = require("./resolvers/auth.resolvers");
const deck_resolvers_1 = require("./resolvers/deck.resolvers");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [user_resolver_1.UserResolver, card_resolvers_1.CardResolver, auth_resolvers_1.AuthResolver, deck_resolvers_1.DeckResolver],
    });
    const server = new server_1.ApolloServer({ schema });
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res }) {
            // Get the user token from the headers.
            const token = req.headers.authorization || "no token";
            return token;
        }),
    });
    yield db_1.dataSource.initialize();
    //populateDatabase();
    console.log(`🚀  Server ready at: ${url}`);
});
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
