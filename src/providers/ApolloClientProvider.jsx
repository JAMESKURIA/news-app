import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApolloClient } from "../hooks";

const ApolloClientProvider = ({ children }) => {
  const client = useApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
