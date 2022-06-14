import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, LogBox } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { CustomerTabs } from "./src/navigation";
import { ApolloClientProvider } from "./src/providers";
import { COLORS } from "./src/resources";

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <>
      <NavigationContainer>
        <ApolloClientProvider>
          <SafeAreaProvider style={tw`flex-1 pt-4`}>
            <KeyboardAvoidingView style={tw`flex-1`}>
              <MenuProvider>
                <StatusBar
                  style="auto"
                  backgroundColor={COLORS.color_light_dark}
                />
                {/* <AuthStack /> */}
                {/* <MediaTabs /> */}
                <CustomerTabs />
              </MenuProvider>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </ApolloClientProvider>
      </NavigationContainer>
    </>
  );
}
