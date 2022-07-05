import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-dynamic-vector-icons";
import { OutlinedTextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { Button, LaunchMediaSheet, TouchView } from "../../components";
import { COLORS } from "../../resources";

const HomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [items, setItems] = React.useState([
    { label: "Citizen TV", value: "citizen" },
    { label: "NTV", value: "ntv" },
    { label: "K24 TV", value: "k24" },
    { label: "INOORO TV", value: "inooro" },
  ]);

  const [images, setImages] = React.useState([]);

  const sheetRef = React.useRef();

  const selectOption = () => {
    sheetRef?.current?.open();
  };

  const pickImage = async ({ from }) => {
    let result;

    switch (from) {
      case "camera":
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          // allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        break;

      case "library":
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          // allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        break;

      default:
        break;
    }

    console.log(result);

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result]);
    }
  };

  // Remove an image
  const removeImage = (item) => {
    // console.log("Clicked item: ", item);

    const newImages = images.filter((file) => file.uri !== item.uri);

    setImages(newImages);
  };

  return (
    <ScrollView>
      {/* Upload images */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-none`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw` pb-4 text-gray-800`}>Upload Files</Text>

          {images.length > 0 ? (
            <TouchView>
              <Text
                style={tw`px-4 py-2 bg-gray-200 rounded-lg  mb-4 `}
                onPress={() => selectOption()}
              >
                Add File
              </Text>
            </TouchView>
          ) : (
            <Text style={tw` pb-4 text-gray-500`}>6 files max</Text>
          )}
        </View>
        <View
          style={tw`rounded h-56 bg-gray-300 ${
            images.length > 0
              ? "flex-row flex-wrap"
              : " items-center justify-center"
          } `}
        >
          {images.length <= 0 && (
            <TouchableOpacity
              style={[
                tw`flex-row items-center p-2 border border-dotted rounded`,
                { borderColor: COLORS.color_dark_light },
              ]}
              onPress={() => selectOption()}
            >
              <Icon
                name="images"
                type="Entypo"
                size={24}
                color={COLORS.color_dark_dark}
                style={tw`mr-3`}
              />

              <Text>Select Files</Text>
            </TouchableOpacity>
          )}

          {images.length > 0 &&
            images.map((item, idx) => (
              <View style={tw`rounded m-2 overflow-hidden`}>
                <Image
                  key={idx.toString()}
                  source={{ uri: item.uri }}
                  style={tw`h-24 w-24 rounded`}
                />
                <TouchableOpacity
                  style={tw`absolute top-1 right-1 z-10`}
                  onPress={() => removeImage(item)}
                >
                  <Icon
                    name="cross"
                    type="Entypo"
                    size={19}
                    color={"white"}
                    style={[tw`rounded-full`, { backgroundColor: "red" }]}
                  />
                </TouchableOpacity>

                {item.type === "video" && (
                  <View
                    style={tw`absolute rounded bg-black bg-opacity-70 top-0 left-0 w-full h-full items-center justify-center`}
                  >
                    <Icon
                      name="play-circle"
                      type="FontAwesome"
                      size={26}
                      color={"dodgerblue"}
                    />
                  </View>
                )}
              </View>
            ))}
        </View>
      </View>

      {/* Add media station name */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-none flex-1 z-10`}>
        <Text style={tw` pb-4 text-gray-800`}>Choose media station</Text>
        <View>
          <DropDownPicker
            placeholder="Select media station"
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

      {/* Description */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-none flex-1`}>
        <Text style={tw` pb-4 text-gray-800`}>Short Description</Text>
        <OutlinedTextField
          label="Description"
          keyboardType="default"
          multiline={true}
          onChangeText={(text) => {
            setDescription(text);
          }}
          error={errors?.description}
          value={description}
        />
      </View>

      {/* Submit Button */}
      <View style={tw`m-4`}>
        <Button
          text="Submit"
          style={tw`bg-gray-300 rounded-lg w-full shadow-none`}
          textStyle={tw`text-gray-900 `}
        />
      </View>

      <LaunchMediaSheet ref={sheetRef} cb={(from) => pickImage({ from })} />
    </ScrollView>
  );
};

export default HomeScreen;
