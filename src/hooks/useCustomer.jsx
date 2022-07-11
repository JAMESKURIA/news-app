import { gql, useQuery } from "@apollo/client";
import { Loading } from "../components";
import useAuth from "./useAuth";

const FETCH_CUSTOMER = gql`
  query getCustomer($loginId: String!) {
    customer(where: { customer_login_id: { _eq: $loginId } }) {
      customer_id
      customer_name
      customer_email
      cutomer_phoneNumber
    }
  }
`;

const useCustomer = () => {
  const { user } = useAuth();

  const { data, error, loading } = useQuery(FETCH_CUSTOMER, {
    variables: { loginId: user?.uid },
  });

  if (error) console.log("An error occurred fetching admin details: ", error);

  if (loading)
    return <Loading message="Fetching user details, be patient..." />;

  return { ...data.customer[0] };
};

export default useCustomer;
