import { createStackNavigator } from "@react-navigation/stack";
import { SingleNews, SubmittedNews } from "../../screens";

const Stack = createStackNavigator();

const MediaNewsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SubmittedNews"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SubmittedNews" component={SubmittedNews} />
      <Stack.Screen name="SingleNews" component={SingleNews} />
    </Stack.Navigator>
  );
};

export default MediaNewsStack;
