import { Stack } from "expo-router";
import "../../global.css";
import AuthProvider from "../providers/AuthProviders";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
          animation: "ios",
        }}
      />
    </AuthProvider>
  );
}
