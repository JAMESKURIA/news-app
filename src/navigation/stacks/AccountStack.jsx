import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "../../hooks/useAuth";
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
  const {
    user: { rank },
  } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={"Settings"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />

      {rank.toLowerCase() === "media" && (
        <Stack.Screen name="SubmittedNews" component={SubmittedNews} />
      )}

      {rank.toLowerCase() === "customer" && (
        <Stack.Screen name="PersonalNews" component={PersonalNews} />
      )}

      {rank.toLowerCase() === "customer" && (
        <Stack.Screen name="Earnings" component={Earnings} />
      )}

      <Stack.Screen name="SingleNews" component={SingleNews} />
    </Stack.Navigator>
  );
};

export default AccountStack;
