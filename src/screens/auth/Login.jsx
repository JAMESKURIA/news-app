import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

import tw from "tailwind-react-native-classnames";
import RNBounceable from "@freakycoder/react-native-bounceable";

import { TextField } from "rn-material-ui-textfield";

import { Button, Loading } from "../../components";

import Icon from "react-native-dynamic-vector-icons";

import { COLORS } from "../../resources/theme";
import { LoginSVG } from "../../svg";
// import useAuth from "../../hooks/useAuth";
const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  // const auth = useAuth();
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // // Create user with email and password
  // const signIn = async () => {
  //   // empty email
  //   if (!email) {
  //     setErrors({ ...errors, emailError: "Please fill in this field!" });
  //   }

  //   // empty email
  //   if (!password) {
  //     setErrors({ ...errors, passError: "Please fill in this field!" });
  //   }
  //   try {
  //     setLoading(true);

  //     await auth.signin(email.toLowerCase().trim(), password);

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);

  //     // console.log(JSON.stringify(error));

  //     // wrong password
  //     if (error.code.includes("wrong-password")) {
  //       setErrors({ ...errors, passError: "Wrong password" });
  //       return;
  //     }

  //     // invlaid email
  //     if (error.code.includes("invalid-email")) {
  //       setErrors({ ...errors, emailError: "Invalid email!" });
  //       return;
  //     }

  //     // inexistent email
  //     if (error.code.includes("user-not-found")) {
  //       setErrors({ ...errors, emailError: "User not found!" });
  //       return;
  //     }
  //   }
  // };

  // // Show loader
  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`flex-1 pt-4 bg-white`}>
        <LoginSVG height={height / 3} width={width} />

        <Text style={tw`text-center text-xl font-bold pt-1`}>
          Welcome Back!
        </Text>
        <Text style={tw`text-center text-sm font-semibold `}>
          Login in to your account
        </Text>

        {/* Inputs */}
        <View style={tw`pt-1 px-6`}>
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
            renderLeftAccessory={() => (
              <Icon
                type="MaterialIcons"
                name="email"
                size={20}
                color={COLORS.color_dark_dark}
                style={tw`mr-2`}
              />
            )}
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
            renderLeftAccessory={() => (
              <Icon
                type="FontAwesome5"
                name="lock"
                size={20}
                color={COLORS.color_dark_dark}
                style={tw`mr-2`}
              />
            )}
          />

          {/* Forgot password link */}
          <TouchableOpacity>
            <Text
              style={[
                tw`text-right pr-2 font-bold text-sm`,
                { color: COLORS.color_accent_dark },
              ]}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <View style={[tw`py-4 self-center`, { width: width / 1.4 }]}>
          <Button
            text="login"
            color={COLORS.color_dark_dark}
            rounded="true"
            // onClick={signIn}
          />
        </View>

        {/* Don't have account register link */}
        <View style={tw`flex-row items-center self-center`}>
          <Text style={tw`px-6 text-center`}>Don't have an account?</Text>
          <TouchableOpacity
            style={tw`self-end -ml-4`}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[tw`font-bold`, { color: COLORS.color_accent_dark }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
