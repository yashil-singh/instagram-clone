import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: "Settings",
        }}
      />
    </Stack>
  );
}
