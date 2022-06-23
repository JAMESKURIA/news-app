//   import useAuth from "../../hooks/useAuth";
//   import useStorage from "../../hooks/useStorage";
import { gql, useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { TextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { Button, Loading } from "../../components";

const INSERT_USER = gql`
  mutation insertUser(
    $loginId: String!
    $email: String!
    $password: String!
    $rank: String
    $fname: String
    $lname: String
    $contact: String
    $image: String
  ) {
    insert_login(
      objects: {
        login_id: $loginId
        login_email: $email
        login_password: $password
        login_rank: $rank
        users: {
          data: {
            user_contact: $contact
            user_fname: $fname
            user_image: $image
            user_lname: $lname
          }
        }
      }
    ) {
      affected_rows
    }
  }
`;

const { width } = Dimensions.get("screen");

const Register = ({ navigation }) => {
  //   const { signup, signout } = useAuth();
  //   const uploadFile = useStorage();

  const [
    insertUser,
    { loading: userLoading, error: userError, data: userData },
  ] = useMutation(INSERT_USER);

  const [image, setImage] = React.useState(null);
  const [fname, setFname] = React.useState(null);
  const [lname, setLname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rank, setRank] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // Pick an image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);

      // console.log(result);
    }
  };

  // Create user with email and password
  const signUp = async () => {
    let id = "";
    try {
      setLoading(true);

      const result = await signup(email.toLowerCase().trim(), password);

      const { uid, email: _email } = result;

      id = uid;

      console.log("Firebase: Created user!");

      // Upload user profile pic, then

      await uploadFile(image, (file) => {
        // set image based on firstname
        if (!file) {
          file = {
            uri: `https://ui-avatars.com/api/?name=${fname}+${lname}`,
            fileType: "image",
          };
        }
        console.log(`Uploaded file!`);
        // SAVE USER TO DB
        insertUser({
          variables: {
            loginId: id,
            email: email,
            password: " . ",
            rank: rank,
            fname: fname,
            lname: lname,
            contact: phone,
            image: file.uri,
          },
        });

        // errors
        if (userError) {
          console.log("Error inserting into users: ", userError);
          Alert.alert("ERROR", "Error adding user :(");
        }

        if (!userError && !userLoading) {
          console.log("Hasura: Created user successfully :)");

          setLoading(false);

          Alert.alert("Success!", "Succesfully registered, you can now login");
          signout(() => navigation.navigate("Login"));
        }
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error));
      setLoading(false);

      if (error?.code == "auth/email-already-in-use") {
        setErrors({ ...errors, emailError: "Email already in use!" });
      }

      // invlaid email
      if (error?.code?.includes("auth/invalid-email")) {
        setErrors({ ...errors, emailError: "Invalid email!" });
      }
    }
  };

  // Show loader
  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`flex-1 p-4`}>
        {/* Create Account */}
        {/* <View style={tw`px-4 mb-20`}>
          <Text
            style={[
              tw`font-bold text-2xl text-center`,
              { color: COLORS.color_dark_dark },
            ]}
          >
            Create Account
          </Text>

          <TouchableOpacity
            style={tw`absolute top-1 left-0`}
            onPress={() => navigation.goBack()}
          >
            <Icon
              type="AntDesign"
              name="arrowleft"
              size={24}
              color={COLORS.color_dark_dark}
            />
          </TouchableOpacity>
        </View> */}

        {/* Image */}
        {/* <View
          style={[
            tw`self-center h-28 w-28 items-center justify-center rounded-full my-4 border border-white`,
            // { backgroundColor: COLORS.color_primary_dark },
          ]}
        >
          {!image ? (
            <View>
              <Icon
                type="Ionicons"
                name="ios-person"
                size={90}
                color={COLORS.color_light_dark}
      
                style={tw`text-gray-900`}
              />

              <TouchableOpacity
                style={[
                  tw`h-10 w-10 absolute -bottom-1 -right-2 rounded-full items-center justify-center border border-white`,
                  // { backgroundColor: COLORS.color_primary_dark },
                ]}
                onPress={pickImage}
              >
                <Icon
                  type="Ionicons"
                  name="camera"
                  size={24}
                  style={tw`text-gray-900`}
                  // color={COLORS.color_dark_dark}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image
                source={{ uri: image.uri }}
                style={tw`w-full h-full rounded-full`}
              />
              <TouchableOpacity
                style={[
                  tw`h-10 w-10 absolute -bottom-1 -right-2 rounded-full items-center justify-center border border-white`,
                  { backgroundColor: COLORS.color_primary_dark },
                ]}
                onPress={pickImage}
              >
                <Icon
                  type="Ionicons"
                  name="camera"
                  size={24}
                  color={COLORS.color_dark_dark}
                />
              </TouchableOpacity>
            </>
          )}
        </View> */}

        <View style={tw`py-10`}>
          <Text style={tw`text-center text-xl`}>Create an Account</Text>
        </View>
        {/* First Name */}
        <TextField
          label="First Name"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setFname(text)}
          value={fname}
          renderLeftAccessory={() => (
            <Icon
              type="Ionicons"
              name="person"
              size={20}
              // color={COLORS.color_light_dark}

              style={tw`mr-2 text-gray-900`}
            />
          )}
        />

        {/* Last Name */}
        <TextField
          label="Last Name"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setLname(text)}
          value={lname}
          renderLeftAccessory={() => (
            <Icon
              type="Ionicons"
              name="person"
              size={20}
              // color={COLORS.color_light_dark}

              style={tw`mr-2  text-gray-900`}
            />
          )}
        />

        {/* Email*/}
        <TextField
          label="Email"
          keyboardType="email-address"
          multiline={false}
          onChangeText={(text) => {
            setEmail(text);

            setErrors({ ...errors, emailError: null });
          }}
          value={email}
          error={errors.emailError}
          renderLeftAccessory={() => (
            <Icon
              type="MaterialIcons"
              name="email"
              size={20}
              // color={COLORS.color_light_dark}

              style={tw`mr-2 text-gray-900`}
            />
          )}
        />

        {/* Mobile */}
        <TextField
          label="Phone Number"
          keyboardType="phone-pad"
          multiline={false}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          renderLeftAccessory={() => (
            <Icon
              type="FontAwesome5"
              name="phone-alt"
              size={20}
              // color={COLORS.color_light_dark}

              style={tw`mr-2 text-gray-900`}
            />
          )}
        />

        {/* Password */}

        <TextField
          label="Password"
          keyboardType="default"
          multiline={false}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text.length < 6) {
              setErrors({
                ...errors,
                passLength: "password should be at least 6 characters",
              });
            } else {
              setErrors({ ...errors, passLength: null });
            }
          }}
          secureTextEntry
          error={errors.passLength}
          renderLeftAccessory={() => (
            <Icon
              type="FontAwesome5"
              name="lock"
              size={20}
              // color={COLORS.color_light_dark}

              style={tw`mr-2 text-gray-900`}
            />
          )}

          // TODO: Add eye to show password
        />

        {/* Confirm Password */}

        <TextField
          label="Confirm Password"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => {
            if (text !== password) {
              setErrors({ ...errors, passMatch: "Passwords do not match" });
            } else {
              setErrors({ ...errors, passMatch: null });
            }
          }}
          error={errors.passMatch}
          secureTextEntry
          renderLeftAccessory={() => (
            <Icon
              type="FontAwesome5"
              name="lock"
              size={20}
              // color={COLORS.color_light_dark}

              style={tw`mr-2 text-gray-900`}
            />
          )}
        />

        {/* Register button */}
        <View style={[tw`py-4 self-center`, { width: width / 1.4 }]}>
          <Button
            text="Register"
            // color={COLORS.color_light_dark}
            style={tw`bg-gray-200 rounded-full px-20`}
            rounded="true"
            //   onClick={signUp}
          />
        </View>

        {/* Already have an account login link*/}
        <View style={tw`flex-row items-center self-center pb-4`}>
          <Text
            style={[
              tw`px-6 text-center`,
              //  { color: COLORS.color_dark_dark }
            ]}
          >
            Already have an account?
          </Text>

          <TouchableOpacity
            style={tw`self-end -ml-4`}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={[
                tw`font-bold`,
                // { color: COLORS.color_primary_dark }
              ]}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
