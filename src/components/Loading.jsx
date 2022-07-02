import React from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";
import tw from "tailwind-react-native-classnames";
import COLORS from "../resources/theme";

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={tw`flex-1 items-center justify-center `}>
      <Progress.CircleSnail
        color={[COLORS.color_accent_dark]}
        size={60}
        duration={800}
      />
      <Text
        style={[
          tw`font-semibold text-sm pt-4`,
          { color: COLORS.color_light_dark },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

export default Loading;
