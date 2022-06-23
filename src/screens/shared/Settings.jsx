import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const ListItem = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={tw`py-1 `} onPress={onPress}>
      <Text
        style={tw`bg-gray-200 p-3 text-lg ${
          text.toLowerCase() === "logout" && "text-red-500"
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-gray-100 pb-3 pt-32`}>
      <ListItem
        text="Update Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <ListItem text="Print Receipts" />
      <ListItem text="Logout" />
    </View>
  );
};

export default Settings;
