import { gql, useQuery } from "@apollo/client";
import { Loading } from "../components";
import useAuth from "./useAuth";

const FETCH_ADMIN = gql`
  query getAdmin($loginId: String!) {
    media_admin(where: { media_admin_login_id: { _eq: $loginId } }) {
      media_admin_id
      media_admin_login_id
      media_admin_name
      media_admin_phonenumber
      media_admin_email
    }
  }
`;

const useAdmin = () => {
  const { user } = useAuth();

  const { data, error, loading } = useQuery(FETCH_ADMIN, {
    variables: { loginId: user?.uid },
  });

  if (error) console.log("An error occurred fetching admin details: ", error);

  if (loading)
    return <Loading message="Fetching user details, be patient..." />;

  return { ...data.media_admin[0] };
};

export default useAdmin;
