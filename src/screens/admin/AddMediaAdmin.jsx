import { gql, useMutation } from "@apollo/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import { TextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { Button, Loading } from "../../components";
import { auth } from "../../config/firebase";

const { width } = Dimensions.get("screen");

const CREATE_MEDIA_ADMIN = gql`
  mutation addMediaAdmin(
    $password: String
    $rank: String
    $username: String
    $email: String
    $loginId: String
    $fullname: String
    $phone: String
  ) {
    insert_login_one(
      object: {
        login_id: $loginId
        login_password: $password
        login_rank: $rank
        login_username: $username
        media_admins: {
          data: {
            media_admin_email: $email
            media_admin_name: $fullname
            media_admin_phonenumber: $phone
          }
        }
      }
    ) {
      login_id
    }
  }
`;

const AddMediaAdmin = () => {
  const [fname, setFname] = React.useState(null);
  const [lname, setLname] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [
    createUser,
    { loading: userLoading, error: userError, data: userData },
  ] = useMutation(CREATE_MEDIA_ADMIN);

  const signup = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user;
  };

  const signUp = async () => {
    // console.log("Register clicked");
    let loginId;
    if (!username || !fname || !lname || !email || !phone || !password) {
      Alert.alert("Warning", "Please fill in all the fields!");
    }

    try {
      setLoading(true);

      const result = await signup(email.toLowerCase().trim(), password);

      // console.log("Success: ", result);

      const { uid, email: _email } = result;

      if (uid) {
        loginId = uid;
      }
    } catch (error) {
      // console.log("Error: ", JSON.stringify(error));
      setLoading(false);

      if (error?.code == "auth/email-already-in-use") {
        setErrors({ ...errors, emailError: "Email already in use!" });
      }

      // invalid email
      if (error?.code?.includes("auth/invalid-email")) {
        setErrors({ ...errors, emailError: "Invalid email!" });
      }
    } finally {
      if (loginId) {
        const { data: createUserData } = await createUser({
          variables: {
            password: "-----",
            rank: "media",
            username,
            email,
            phone,
            fullname: `${fname} ${lname}`,
            loginId,
          },
        });

        if (createUserData) {
          // console.log("User Data, ", createUserData);

          Alert.alert("Success!", "Succesfully created User");

          setUsername(null);
          setFname(null);
          setLname(null);
          setEmail(null);
          setPhone(null);
          setPassword(null);
        }
      }

      setLoading(false);
    }
  };

  if (userError) {
    console.log("Hasura Error: ", userError);
  }

  // Show loader
  if (loading || userLoading) {
    return <Loading message="creating user..." />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`flex-1 p-4`}>
        <View style={tw`pt-4 pb-5`}>
          <Text style={tw`text-center text-xl`}>Add A Media Admin</Text>
        </View>

        {/* Username */}
        <TextField
          label="Username"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        {/* First Name */}
        <TextField
          label="First Name"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setFname(text)}
          value={fname}
        />

        {/* Last Name */}
        <TextField
          label="Last Name"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setLname(text)}
          value={lname}
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
        />

        {/* Mobile */}
        <TextField
          label="Phone Number"
          keyboardType="phone-pad"
          multiline={false}
          onChangeText={(text) => setPhone(text)}
          value={phone}
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
        />

        {/* Register button */}
        <View style={[tw`py-4 self-center`, { width: width / 1.4 }]}>
          <Button
            text="Add admin"
            // color={COLORS.color_light_dark}
            style={tw`bg-gray-200 rounded-full px-20`}
            rounded="true"
            onPress={signUp}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddMediaAdmin;
