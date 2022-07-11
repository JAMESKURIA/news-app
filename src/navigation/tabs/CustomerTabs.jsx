import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-dynamic-vector-icons";

import { COLORS } from "../../resources";
import { HomeScreen } from "../../screens";
import AccountStack from "../stacks/AccountStack";

const Tab = createBottomTabNavigator();

const CustomerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        activeTintColor: COLORS.color_light_dark,
        inactiveTintColor: COLORS.color_dark_accent,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size ? size : 26}
              //   color={focused ? color : "#222222"}
              focused={focused}
              color={color}
            />
          ),
        }}

        // tabBarIcon={() => <Icon type="Entypo" name="home" size={20} />}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="person"
              size={size ? size : 26}
              //   color={focused ? color : "#222222"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTabs;
