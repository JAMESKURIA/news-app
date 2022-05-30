// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { AuthStack, MainTabs } from "./src/navigation";
import { ApolloClientProvider } from "./src/providers";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <ApolloClientProvider>
          <SafeAreaProvider style={tw`flex-1`}>
            {/* <StatusBar style="auto" /> */}
            {/* <AuthStack /> */}
            <MainTabs />
          </SafeAreaProvider>
        </ApolloClientProvider>
      </NavigationContainer>
    </>
  );
}
