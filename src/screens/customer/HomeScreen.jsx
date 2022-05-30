import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

import tw from "tailwind-react-native-classnames";
import { COLORS } from "../../resources/theme";

const HomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <ScrollView>
      {/* Choose submission type */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-lg`}>
        <Text style={tw`text-sm font-semibold text-gray-600 `}>
          Choose type of submissions
        </Text>

        <View style={tw`pt-3`}>
          <View>
            <Text style={tw`text-gray-800`}>Video 60s</Text>
          </View>
          <Text style={tw`pt-1 text-gray-500`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            hic illum repudiandae illo corporis.
          </Text>
        </View>
        <View style={tw`pt-3`}>
          <View>
            <Text style={tw`text-gray-800`}>Short film</Text>
          </View>
          <Text style={tw`pt-1 text-gray-500`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            hic illum repudiandae illo corporis.
          </Text>
        </View>
      </View>

      {/* Upload video */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-lg`}>
        <Text style={tw` pb-4 text-gray-800`}>Upload Images</Text>

        <View style={tw`rounded h-56 bg-gray-300 items-center justify-center`}>
          <View
            style={tw`flex-row items-center p-2 border  border-dotted border-blue-500 rounded`}
          >
            <Icon
              name="upload"
              type="Feather"
              size={24}
              color={COLORS.color_dark_dark}
              style={tw`mr-3`}
            />

            <Text>Select Video</Text>
          </View>
        </View>
      </View>

      {/* Upload images */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-lg`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw` pb-4 text-gray-800`}>Upload Video</Text>
          <Text style={tw` pb-4 text-gray-500`}>4 images max</Text>
        </View>
        <View style={tw`rounded h-56 bg-gray-300 items-center justify-center`}>
          <View
            style={[
              tw`flex-row items-center p-2 border-2 border-dashed  border-dotted rounded`,
              { borderRightColor: COLORS.color_dark_dark },
            ]}
          >
            <Icon
              name="images"
              type="Entypo"
              size={24}
              color={COLORS.color_dark_dark}
              style={tw`mr-3`}
            />

            <Text>Select Images</Text>
          </View>
        </View>
      </View>

      {/* Add media station name */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-lg flex-1 z-10`}>
        <Text style={tw` pb-4 text-gray-800`}>Choose media station</Text>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              borderColor: COLORS.color_primary_dark,
              // backgroundColor: COLORS.color_primary_dark,  fc
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
