import React from "react";
import { Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import tw from "tailwind-react-native-classnames";

const { SlideInMenu } = renderers;

const LaunchMediaSheet = ({ cb = () => null }, ref) => {
  const handleActions = ({ type }) => {
    switch (type) {
      case "camera":
        cb("camera");
        break;

      case "library":
        cb("library");
        break;

      default:
        break;
    }
  };

  return (
    <View>
      <Menu renderer={SlideInMenu} ref={ref}>
        <MenuTrigger />
        <MenuOptions
          customStyles={{
            optionsContainer: { backgroundColor: "transparent" },
            optionWrapper: {
              // padding: 15,
              justifyContent: "center",
              // alignItems: "center",
            },
          }}
          style={tw`bg-white rounded-tr-xl rounded-tl-xl shadow-lg`}
        >
          <MenuOption disabled={true}>
            <Text style={[tw`text-lg p-2 px-3 text-center`, { color: "gray" }]}>
              Choose files from:
            </Text>
          </MenuOption>

          <MenuOption onSelect={() => handleActions({ type: "camera" })}>
            <Text style={[tw`text-lg p-2 px-3`, { color: "green" }]}>
              Camera
            </Text>
          </MenuOption>

          <MenuOption onSelect={() => handleActions({ type: "library" })}>
            <Text style={[tw`text-lg p-2 px-3`, { color: "blue" }]}>
              Library
            </Text>
          </MenuOption>

          <MenuOption
            onSelect={() => {
              ref?.current?.close();
              cb();
            }}
          >
            <Text style={[tw`text-lg p-2 px-3 text-center text-red-500`]}>
              Cancel
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default React.forwardRef(LaunchMediaSheet);
