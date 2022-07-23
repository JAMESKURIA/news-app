import { createStackNavigator } from "@react-navigation/stack";
import useUser from "../../hooks/useUser";
import {
  AddMediaAdmin,
  AddMediaStation,
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

      {/* ADmin */}

      {rank === "super-admin" && (
        <Stack.Screen name="AddMediaAdmin" component={AddMediaAdmin} />
      )}
      {rank === "super-admin" && (
        <Stack.Screen name="AddMediaStation" component={AddMediaStation} />
      )}
    </Stack.Navigator>
  );
};

export default AccountStack;
