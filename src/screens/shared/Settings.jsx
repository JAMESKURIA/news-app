import { Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { COLORS } from "../../resources";

const ListItem = ({ text, subtext, onPress }) => {
  return (
    <TouchableOpacity style={tw`py-1 `} onPress={onPress}>
      <Text
        style={[
          tw`text-lg px-2 pt-2 ${
            text.toLowerCase() === "logout" && "text-red-500"
          }`,
          { backgroundColor: COLORS.color_accent_dark },
        ]}
      >
        {text}
      </Text>
      <Text
        style={[
          tw`text-xs px-2 pb-2`,
          { backgroundColor: COLORS.color_accent_dark },
        ]}
      >
        {subtext}
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
        text="Profile"
        subtext={"update your personal details"}
        onPress={() => navigation.navigate("Profile")}
      />
      {rank === "super-admin" && (
        <ListItem
          text="New Station"
          subtext={"add a new media station"}
          onPress={() => navigation.navigate("AddMediaStation")}
        />
      )}
      {rank === "super-admin" && (
        <ListItem
          text="Media Admin"
          subtext={"add media station admin"}
          onPress={() => navigation.navigate("AddMediaAdmin")}
        />
      )}
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
      <ListItem
        text="Logout"
        subtext={"sign out of your account"}
        onPress={async () => await signout()}
      />
    </View>
  );
};

export default Settings;
