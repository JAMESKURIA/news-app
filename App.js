import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, LogBox } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { ApolloClientProvider, AuthProvider, Providers } from "./src/providers";

export default function App() {
  LogBox.ignoreAllLogs(true);

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <ApolloClientProvider>
              <SafeAreaProvider style={tw`flex-1 pt-4`}>
                <KeyboardAvoidingView style={tw`flex-1`}>
                  <MenuProvider>
                    <StatusBar
                      style="auto"
                      // backgroundColor={COLORS.color_light_dark}
                      backgroundColor="white"
                    />
                    <Providers />
                  </MenuProvider>
                </KeyboardAvoidingView>
              </SafeAreaProvider>
            </ApolloClientProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
