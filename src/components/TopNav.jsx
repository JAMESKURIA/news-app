import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { COLORS } from "../resources";
const TopNav = ({ handleGoBack, pageName, handleSave }) => {
  return (
    <View
      style={[
        tw`w-full flex-row items-center ${
          handleSave && "justify-between"
        } px-2 pr-4 py-2`,
        {
          backgroundColor: COLORS.color_light_dark,
        },
      ]}
    >
      {/* Icon */}
      <TouchableOpacity
        onPress={handleGoBack}
        style={[
          tw`items-center justify-center rounded-full p-2 ${
            !handleSave && "mr-4"
          } `,
        ]}
      >
        <Icon
          type="AntDesign"
          name="arrowleft"
          size={24}
          color={COLORS.color_dark_accent}
        />
      </TouchableOpacity>

      {/* Page Name */}
      <Text style={tw`font-semibold text-lg text-white`}>{pageName}</Text>

      {/* save */}
      {handleSave && (
        <TouchableOpacity onPress={handleSave}>
          <Text style={[{ color: COLORS.color_dark_accent, fontSize: 17 }]}>
            Save
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopNav;
