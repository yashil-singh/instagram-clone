import { useAuth } from "@/src/providers/AuthProviders";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileLayout() {
  const { user } = useAuth();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "800",
        },
        contentStyle: {
          backgroundColor: "white",
        },
        animation: "ios",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: user?.username,
          headerRight: () => (
            <Ionicons
              name="menu"
              size={26}
              color="black"
              onPress={() => router.push("/profile/settings")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: "Edit Profile",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
