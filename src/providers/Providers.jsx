import { AuthStack } from "navigation";
import useAuth from "../hooks/useAuth";
import { CustomerTabs, MediaTabs } from "../navigation";

const Providers = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthStack />;
  }

  return (
    <>
      {user.rank.toLowerCase() === "customer" && <CustomerTabs />}
      {user.rank.toLowerCase() === "media" && <MediaTabs />}
    </>
  );
};

export default Providers;
