import { Redirect, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/AuthProviders";
import { Image, View } from "react-native";
import Avatar from "@/src/components/Avatar";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/src/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const { isAuthenticated, user } = useAuth();

  const avatar = cld.image(user?.avatar_url);

  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  );

  if (!isAuthenticated) return <Redirect href="/(auth)" />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerTitleStyle: { fontWeight: "bold" },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons name="home" size={26} color={color} />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                size={26}
                color={color}
              />
            ),
          headerLeft: () => (
            <Image
              source={require("@/assets/images/instagram.png")}
              className="w-[100px] h-8 object-contain"
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: "Create Post",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square-o" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          headerTitle: "Notifications",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="heart" size={26} color={color} />
            ) : (
              <Ionicons name="heart-outline" size={26} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: focused ? "black" : "white",
              }}
              className="rounded-full"
            >
              <Avatar image_url={user?.avatar_url ?? " "} size={28} />
            </View>
          ),

          headerShown: false,
        }}
      />
    </Tabs>
  );
}
