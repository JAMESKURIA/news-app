import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProfileScreen } from "../../screens";
import Icon from "react-native-dynamic-vector-icons";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        tabBarIcon={() => <Icon type="Entypo" name="home" size={20} />}
      />
      <Tab.Screen name="Settings" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
