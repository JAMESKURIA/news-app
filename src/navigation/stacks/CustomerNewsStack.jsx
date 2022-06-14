import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PersonalNews, SingleNews } from "../../screens";

const Stack = createStackNavigator();

const CustomerNewsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PersonalNews"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PersonalNews" component={PersonalNews} />
      <Stack.Screen name="SingleNews" component={SingleNews} />
    </Stack.Navigator>
  );
};

export default CustomerNewsStack;
