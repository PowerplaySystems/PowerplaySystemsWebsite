// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";

import { ApolloClient,InMemoryCache } from "@apollo/client";
// const cache = new InMemoryCache();
// const link = new HttpLink({
// //   uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`
//   uri: `http://localhost:1337/graphql`
// });
const client = new ApolloClient({
  uri: `https://strapi.powerplaysystems.com/graphql`,
  // uri: `http://localhost:1337/graphql`,
  cache : new InMemoryCache()
});

export default client;