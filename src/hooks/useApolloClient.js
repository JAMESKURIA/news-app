import Constants from "expo-constants";
import makeApolloClient from "../config/apollo";

const secret = Constants.manifest.extra.x_hasura_admin_secret;

const useApolloClient = () => {
  const client = makeApolloClient(secret);
  return client;
};

export default useApolloClient;
