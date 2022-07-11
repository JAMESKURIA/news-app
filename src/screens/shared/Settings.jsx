import { Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { COLORS } from "../../resources";

const ListItem = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={tw`py-1 `} onPress={onPress}>
      <Text
        style={[
          tw`p-3 text-lg ${text.toLowerCase() === "logout" && "text-red-500"}`,
          { backgroundColor: COLORS.color_accent_dark },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = ({ navigation }) => {
  const { rank } = useUser();
  const { signout } = useAuth();

  return (
    <View
      style={[
        tw`flex-1 pb-3 pt-32`,
        { backgroundColor: COLORS.color_light_dark },
      ]}
    >
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
