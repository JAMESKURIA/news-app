import { Dimensions, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import RNBounceable from "@freakycoder/react-native-bounceable";

import { COLORS } from "../resources/theme";

const { width, height } = Dimensions.get("screen");

const Button = ({ text = "next", onClick, color, rounded }) => {
  return (
    <RNBounceable
      onPress={onClick}
      style={[
        tw`items-center ${
          rounded ? "rounded-full" : "rounded-xl"
        } self-center justify-center h-12 w-full`,
        { backgroundColor: color || COLORS.color_dark_dark },
      ]}
    >
      <Text style={[tw`capitalize`, { color: COLORS.color_light_dark }]}>
        {text}
      </Text>
    </RNBounceable>
  );
};

export default Button;
