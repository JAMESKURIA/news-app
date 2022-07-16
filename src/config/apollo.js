import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const makeApolloClient = (token) => {
  const httpLink = new HttpLink({
    // uri: "https://news-app.hasura.app/v1/graphql",
    uri: "https://news-app-db.hasura.app/v1/graphql",
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        "x-hasura-admin-secret": token || null,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });

  return client;
};
export default makeApolloClient;
