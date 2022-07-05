import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "../../hooks/useAuth";
import { PersonalNews, SingleNews, SubmittedNews } from "../../screens";

const Stack = createStackNavigator();

const NewsStack = () => {
  const {
    user: { rank },
  } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={
        rank.toLowerCase() === "media" ? "SubmittedNews" : "PersonalNews"
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      {rank.toLowerCase() === "media" && (
        <Stack.Screen name="SubmittedNews" component={SubmittedNews} />
      )}
      {rank.toLowerCase() === "media" && (
        <Stack.Screen name="SingleNews" component={SingleNews} />
      )}

      {rank.toLowerCase() === "customer" && (
        <Stack.Screen name="PersonalNews" component={PersonalNews} />
      )}
      {rank.toLowerCase() === "customer" && (
        <Stack.Screen name="SingleNews" component={SingleNews} />
      )}
    </Stack.Navigator>
  );
};

export default NewsStack;
