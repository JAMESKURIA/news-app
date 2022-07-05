import { Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../../hooks/useAuth";

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
  const {
    user: { rank },
    signout,
  } = useAuth();

  return (
    <View style={tw`flex-1 bg-gray-100 pb-3 pt-32`}>
      <ListItem
        text="Update Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      {rank.toLowerCase() !== "customer" && <ListItem text="Print Receipts" />}
      {rank.toLowerCase() === "customer" && (
        <ListItem
          text="My News"
          onPress={() =>
            rank.toLowerCase() === "customer"
              ? navigation.navigate("PersonalNews")
              : navigation.navigate("SubmittedNews")
          }
        />
      )}
      {rank.toLowerCase() === "customer" && (
        <ListItem
          text="My Earnings"
          onPress={() => navigation.navigate("Earnings")}
        />
      )}
      <ListItem text="Logout" onPress={async () => await signout()} />
    </View>
  );
};

export default Settings;
