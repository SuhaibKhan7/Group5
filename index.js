import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./db.js";

const resolvers = {
  Query: {
    users() {
      console.log(db.users);
      return db.users;
    },
    reviews() {
      return db.reviews;
    },
    products() {
      return db.products;
    },

    async posts() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      return data;
    },

    async post(_, args) {
      const id = args.id;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      return data;
    },
  },
  Product: {
    seller(parent) {
      return db.users.find((u) => u.id === parent.sellerid);
    },
    reviews(parent) {
      return db.reviews.filter((rev) => parent.reviewid.includes(rev.id));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀  Server ready at: ${url}`);
