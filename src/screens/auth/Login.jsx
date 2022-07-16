import React from "react";
import {
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
import { LoginSVG } from "../../svg";
const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  const { signin } = useAuth();
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // Create user with email and password
  const signIn = async () => {
    // empty email
    if (!email) {
      setErrors({ ...errors, emailError: "Please fill in this field!" });
    }

    // empty password
    if (!password) {
      setErrors({ ...errors, passError: "Please fill in this field!" });
    }

    try {
      setLoading(true);

      // console.log("EMAIL: ", email);
      // console.log("password: ", password);

      await signin(email.toLowerCase().trim(), password);
    } catch (error) {
      setLoading(false);
      // console.log("Error Occured Here: ", JSON.stringify(error));
      // console.log("Error Occured Here: ", error);
      // wrong password
      if (error?.code?.includes("wrong-password")) {
        setErrors({ ...errors, passError: "Wrong password" });
        return;
      }

      // invlaid email
      if (error?.code?.includes("invalid-email")) {
        setErrors({ ...errors, emailError: "Invalid email!" });
        return;
      }

      // inexistent email
      if (error?.code?.includes("user-not-found")) {
        // console.log("Hey Error :(");
        setErrors((prev) => ({ ...prev, emailError: "User not found!" }));
        return;
      }
    }
  };

  // Show loader
  if (loading) {
    return <Loading message="Just a moment..." />;
  }

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`flex-1 pt-12 bg-white`}>
        <LoginSVG height={height / 3} width={width} />

        <Text style={tw`text-center text-xl font-bold pt-5`}>
          Welcome Back!
        </Text>
        {/* <Text style={tw`text-center text-sm font-semibold `}>
          Login in to your account
        </Text> */}

        {/* Inputs */}
        <View style={tw`pt-4 px-6`}>
          {/* Email */}
          <TextField
            label="Email"
            keyboardType="default"
            multiline={false}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, emailError: null });
            }}
            error={errors.emailError}
            value={email}
          />

          {/* Password */}
          <TextField
            label="Password"
            keyboardType="default"
            onChangeText={(text) => {
              setErrors({ ...errors, passError: null });
              setPassword(text);
            }}
            multiline={false}
            value={password}
            error={errors.passError}
            secureTextEntry
          />
        </View>

        {/* Login button */}
        <View style={[tw`py-10 self-center`, { width: width / 1.4 }]}>
          <Button
            text="login"
            rounded="true"
            style={tw`bg-gray-200 rounded-full px-20`}
            onPress={signIn}
          />
        </View>

        {/* Don't have account register link */}
        <View style={tw`flex-row items-center self-center`}>
          <Text style={tw`px-6 text-center`}>Don't have an account?</Text>
          <TouchableOpacity
            style={tw`self-end -ml-4`}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[tw`font-bold`]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
