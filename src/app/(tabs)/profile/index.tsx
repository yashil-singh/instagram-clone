import Avatar from "@/src/components/Avatar";
import { formatNumber } from "@/src/lib/utils/formatNumber";
import { useAuth } from "@/src/providers/AuthProviders";
import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user } = useAuth();
  return (
    <View className="">
      <View className="p-3 gap-3">
        {/* Image and Counts */}
        <View className="flex-row items-center">
          <Avatar image_url={user?.avatar_url ?? ""} size={100} />

          <View className="flex-row flex-1">
            <Pressable className="active:bg-gray-100 flex-1">
              <Text
                className="font-semibold text-center"
                style={{ fontSize: 18 }}
              >
                {formatNumber(100)}
              </Text>
              <Text className="text-center">posts</Text>
            </Pressable>
            <Pressable className="active:bg-gray-100 flex-1">
              <Text
                className="font-semibold text-center"
                style={{ fontSize: 18 }}
              >
                {formatNumber(2000)}
              </Text>
              <Text className="text-center">followers</Text>
            </Pressable>
            <Pressable className="active:bg-gray-100 flex-1">
              <Text
                className="font-semibold text-center"
                style={{ fontSize: 18 }}
              >
                {formatNumber(120)}
              </Text>
              <Text className="text-center">following</Text>
            </Pressable>
          </View>
        </View>

        {/* Name and Bio */}
        <View>
          <Text className="font-semibold">{user?.full_name}</Text>
          <Text>{user?.bio}</Text>
        </View>

        {/* Edit and Share Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded px-2 py-1"
            activeOpacity={0.5}
            onPress={() => router.push("/profile/edit")}
          >
            <Text className="text-center">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded px-2 py-1"
            activeOpacity={0.5}
          >
            <Text className="text-center">Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts */}
      <View></View>
    </View>
  );
}
