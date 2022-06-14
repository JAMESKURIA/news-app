import RNBounceable from "@freakycoder/react-native-bounceable";
import React from "react";
import { Text } from "react-native";
import tw from "tailwind-react-native-classnames";

const Button = ({ text = "next", onPress, ...props }) => {
  return (
    <RNBounceable
      onPress={onPress}
      style={[
        tw`items-center self-center justify-center h-12 px-6`,
        props.style,
      ]}
    >
      <Text style={[tw`capitalize`, props.textStyle]}>{text}</Text>
    </RNBounceable>
  );
};

export default Button;
