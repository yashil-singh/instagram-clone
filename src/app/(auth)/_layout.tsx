import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProviders";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
        animation: "ios",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
