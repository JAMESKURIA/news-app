import { AuthStack } from "navigation";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from ".";

const Providers = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthStack />
        {/* <MediaTabs /> */}
        {/* <CustomerTabs /> */}
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default Providers;
