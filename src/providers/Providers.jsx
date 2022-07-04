import { AuthStack } from "navigation";
import useAuth from "../hooks/useAuth";
import { CustomerTabs, MediaTabs } from "../navigation";

const Providers = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <AuthStack />;
  }

  return (
    <>
      {currentUser.login[0].login_rank.toLowerCase() === "customer" && (
        <CustomerTabs />
      )}
      {currentUser.login[0].login_rank.toLowerCase() === "media" && (
        <MediaTabs />
      )}
    </>
  );
};

export default Providers;
