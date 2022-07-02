import { gql, useMutation } from "@apollo/client";
import React from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { Button, Loading } from "../../components";
import useAuth from "../../hooks/useAuth";

const { width } = Dimensions.get("screen");

const INSERT_USER = gql`
  mutation createUser(
    $loginId: String!
    $password: String!
    $rank: String
    $username: String
    $email: String
    $name: String
    $phone: String
  ) {
    insert_login_one(
      object: {
        login_id: $loginId
        login_password: $password
        login_rank: $rank
        login_username: $username
        customers: {
          data: {
            customer_email: $email
            customer_name: $name
            cutomer_phoneNumber: $phone
          }
        }
      }
    ) {
      customers {
        customer_id
      }
    }
  }
`;

const Register = ({ navigation }) => {
  const { signup, signout } = useAuth();

  const [
    createUser,
    { loading: userLoading, error: userError, data: userData },
  ] = useMutation(INSERT_USER);

  const [fname, setFname] = React.useState(null);
  const [lname, setLname] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // Create user with email and password
  const signUp = async () => {
    // console.log("Register clicked");
    let loginId;
    if (!username || !fname || !lname || !email || !phone || !password) {
      Alert.alert("Warning", "Please fill in all the fields!");
    }

    try {
      setLoading(true);

      const result = await signup(email.toLowerCase().trim(), password);

      const { uid, email: _email } = await result;

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
        createUser({
          variables: {
            password: "-----",
            rank: "customer",
            username,
            email,
            phone,
            name: `${fname} ${lname}`,
            loginId,
          },
        });

        Alert.alert("Success!", "Succesfully registered, you can now login");
        await signout(() => navigation.navigate("Login"));
      }
      setLoading(false);
    }
  };

  if (userError) {
    console.log("Hasura Error: ", userError);
  }

  // Show loader
  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`flex-1 p-4`}>
        <View style={tw`pt-4 pb-5`}>
          <Text style={tw`text-center text-xl`}>Create an Account</Text>
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
            text="Register"
            // color={COLORS.color_light_dark}
            style={tw`bg-gray-200 rounded-full px-20`}
            rounded="true"
            onPress={signUp}
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
