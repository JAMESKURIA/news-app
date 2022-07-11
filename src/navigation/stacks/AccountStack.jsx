import { createStackNavigator } from "@react-navigation/stack";
import useUser from "../../hooks/useUser";
import {
  Earnings,
  PersonalNews,
  Profile,
  Settings,
  SingleNews,
  SubmittedNews,
} from "../../screens";

const Stack = createStackNavigator();

const AccountStack = () => {
  const { rank } = useUser();

  return (
    <Stack.Navigator
      initialRouteName={"Settings"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />

      {rank === "media" && (
        <Stack.Screen name="SubmittedNews" component={SubmittedNews} />
      )}

      {rank === "customer" && (
        <Stack.Screen name="PersonalNews" component={PersonalNews} />
      )}

      {rank === "customer" && (
        <Stack.Screen name="Earnings" component={Earnings} />
      )}

      <Stack.Screen name="SingleNews" component={SingleNews} />
    </Stack.Navigator>
  );
};

export default AccountStack;
