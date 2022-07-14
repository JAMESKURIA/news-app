import { gql, useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-dynamic-vector-icons";
import { OutlinedTextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { Button, LaunchMediaSheet, Loading, TouchView } from "../../components";
import { storage } from "../../config/firebase";
import useCustomer from "../../hooks/useCustomer";
import useStations from "../../hooks/useStations";
import { COLORS } from "../../resources";

const INSERT_NEWS = gql`
  mutation insertNews(
    $customerId: Int!
    $desc: String!
    $stationId: Int!
    $files: [customer_files_insert_input!]!
  ) {
    insert_customer_news(
      objects: {
        customer_news_customer_id: $customerId
        customer_news_desc: $desc
        customer_news_media_station_id: $stationId
        customer_files: { data: $files }
        news_verifies: { data: {} }
      }
    ) {
      affected_rows
    }
  }
`;

const HomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [station, setStation] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState([]);

  const [filesLoading, setFilesLoading] = React.useState(false);

  const [items, setItems] = React.useState([]);

  const { customer_id: customerId } = useCustomer();

  // console.log("User: ", user);
  const stations = useStations();

  // Set Stations
  React.useEffect(() => {
    // console.log("Stations: ", stations);

    setItems(stations);
  }, [stations]);

  const [
    uploadNews,
    { loading: newsLoading, data: newsData, error: newsError },
  ] = useMutation(INSERT_NEWS);

  // News uploaded
  const uploadedSuccess = React.useCallback(() => {
    Alert.alert("Success!", "Successfully uploaded news");

    setDescription("");
    setFiles([]);
    setStation(null);
  }, []);

  const sheetRef = React.useRef();

  const selectOption = () => {
    sheetRef?.current?.open();
  };

  // PICK IMAGE
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

    // console.log(result);

    if (!result.cancelled) {
      setFiles((prevfiles) => [...prevfiles, result]);
    }
  };

  // Remove an image
  const removeImage = (item) => {
    // console.log("Clicked item: ", item);

    const newfiles = files.filter((file) => file.uri !== item.uri);

    setFiles(newfiles);
  };

  // UPLOAD FILES
  const onUploadSubmission = async (files) => {
    const getBlob = async (uploadUri) => {
      const response = await fetch(uploadUri);
      const blob = await response.blob();

      return blob;
    };

    const uploadFile = (file) => {
      return new Promise(async (resolve, reject) => {
        const { uri, type } = file;
        const filename = uri.substring(uri.lastIndexOf("/") + 1);
        const uploadUri =
          Platform.OS === "ios" ? uri.replace("file://", "") : uri;

        const fileBlob = await getBlob(uploadUri);

        const storageRef = ref(storage, `files/${filename}`);

        uploadBytes(storageRef, fileBlob).then((snapshot) => {
          getDownloadURL(storageRef)
            .then((url) => {
              const file = {
                customer_file_attachment: url,
                customer_file_type: type,
              };
              resolve(file);
            })
            .catch((err) => reject(err));
        });
      });
    };

    let count = 0;
    let uploadedFiles = [];

    // Actual files uploading
    while (count < files.length) {
      const file = await uploadFile(files[count]);
      uploadedFiles.push(file);

      count++;

      if (count == files.length) {
        // console.log("FILES: ", uploadedFiles);

        return uploadedFiles;
      }
    }
  };

  // Submit news
  const submitNews = async () => {
    // NO files
    if (files.length < 1) {
      Alert.alert("ALert", "Please choose at least one file");
      return;
    }

    // No media station
    if (!station) {
      Alert.alert("ALert", "Please pick a media station!");
      return;
    }

    // No desc
    if (!description) {
      Alert.alert("ALert", "Please pick a short description!");
      return;
    }

    setFilesLoading(true);

    const uploadedFiles = await onUploadSubmission(files);

    setFilesLoading(false);

    // console.log("Uploaded files: ", uploadedFiles);

    uploadNews({
      variables: {
        customerId,
        desc: description,
        stationId: station,
        files: uploadedFiles,
      },
    });
  };

  // Error States
  // News Upload Error
  if (newsError) {
    console.log("Error uploading news: ", newsError);
  }

  // Loading states
  if (filesLoading) {
    return <Loading message="Uploading files..." />;
  }

  if (newsLoading) {
    return <Loading message="Uploading news..." />;
  }

  return (
    <ScrollView>
      {/* Upload files */}
      <View style={tw`bg-gray-50 m-4 rounded p-4 shadow-none`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw` pb-4 text-gray-800`}>Upload Files</Text>

          {files.length > 0 ? (
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
            files.length > 0
              ? "flex-row flex-wrap"
              : " items-center justify-center"
          } `}
        >
          {files.length <= 0 && (
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

          {files.length > 0 &&
            files.map((item, idx) => (
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
            value={station}
            items={items}
            setOpen={setOpen}
            setValue={setStation}
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
          value={description}
        />
      </View>

      {/* Submit Button */}
      <View style={tw`m-4`}>
        <Button
          text="Submit"
          style={tw`bg-gray-300 rounded-lg w-full shadow-none`}
          textStyle={tw`text-gray-900 `}
          onPress={() => submitNews().then(() => uploadedSuccess())}
        />
      </View>

      <LaunchMediaSheet ref={sheetRef} cb={(from) => pickImage({ from })} />
    </ScrollView>
  );
};

export default HomeScreen;
