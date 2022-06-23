import { createStackNavigator } from "@react-navigation/stack";
import { Profile, Settings } from "../../screens";

const Stack = createStackNavigator();

const MediaAccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MediaAccountStack;
