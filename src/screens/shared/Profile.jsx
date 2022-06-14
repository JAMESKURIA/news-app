import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-dynamic-vector-icons";
import { COLORS } from "../../resources";
import { OutlinedTextField } from "rn-material-ui-textfield";
import { Button } from "../../components";

const FONT_SIZE = 17;
const Profile = () => {
  return (
    <ScrollView style={tw`flex-1`}>
      <View style={tw`p-3`}>
        {/* Actions */}
        <View style={tw`flex-row justify-between items-center pb-4`}>
          <Button
            text="Edit"
            style={tw`rounded-lg`}
            textStyle={[tw`text-lg `, { color: COLORS.color_light_dark }]}
          />
          <Button
            text="Save"
            style={[tw` rounded-lg`]}
            textStyle={[tw`text-lg`, { color: COLORS.color_dark_dark }]}
          />
        </View>

        {/* Icon */}
        <View style={tw`flex items-center `}>
          <Icon
            name="person-circle-sharp"
            type="Ionicons"
            size={100}
            style={[tw``, { color: COLORS.color_accent_dark }]}
          />

          <Text style={tw`py-1 text-xl`}>John Doe</Text>
        </View>

        {/* Details */}

        <View style={tw` mt-4`}>
          {/* email */}
          <View style={tw`py-2`}>
            <Text style={[tw`  font-medium`, { fontSize: FONT_SIZE }]}>
              Email
            </Text>
            <View style={tw`ml-4 mt-4`}>
              <OutlinedTextField
                label="Email"
                keyboardType="default"
                multiline={false}
                disabled
              />
            </View>
          </View>

          {/* name */}
          <View style={tw`py-2`}>
            <Text style={[tw`  font-medium`, { fontSize: FONT_SIZE }]}>
              Name
            </Text>
            <View style={tw`ml-4 mt-4`}>
              <OutlinedTextField
                label="Name"
                keyboardType="default"
                multiline={false}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={tw`py-2`}>
            <Text style={[tw`  font-medium`, { fontSize: FONT_SIZE }]}>
              Phone Number
            </Text>
            <View style={tw`ml-4 mt-4`}>
              <OutlinedTextField
                label="Phone Number"
                keyboardType="default"
                multiline={false}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
