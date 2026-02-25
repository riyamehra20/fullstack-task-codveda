const express            = require("express");
const { ApolloServer }   = require("apollo-server-express");
const cors               = require("cors");
const jwt                = require("jsonwebtoken");
const connectDB          = require("./database");
const typeDefs           = require("./graphql/typeDefs");
const resolvers          = require("./graphql/resolvers");
const User               = require("./models/userModel");
require("dotenv").config();

const PORT = process.env.GRAPHQL_PORT || 4000;

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Connect MongoDB
  await connectDB();

  // Apollo GraphQL Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // ── Attach logged-in user to context ──
    context: async ({ req }) => {
      try {
        const authHeader = req.headers.authorization || "";
        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id);
          return { user };
        }
      } catch (e) {}
      return { user: null };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`✅ GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 GraphQL Playground: http://localhost:${PORT}/graphql`);
  });
}

startServer();
