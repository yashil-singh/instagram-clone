import { Image, Text, View } from "react-native";
import Avatar from "@/src/components/Avatar";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { PostType } from "@/types";

type PostCardProps = {
  post: PostType;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <View>
      {/* Header */}
      <View className="flex-row items-center gap-2 px-3 py-2">
        <Avatar image_url={post.user.image_url} />
        <Text className="font-semibold">{post.user.username}</Text>
      </View>

      {/* Image */}
      <Image source={{ uri: post.image_url }} className="w-full aspect-[4/3]" />

      {/* Post Actions */}
      <View className="p-3 flex-row justify-between">
        <View className="flex-row gap-4">
          <AntDesign name="hearto" size={24} color="black" />
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Feather name="send" size={24} color="black" />
        </View>
        <Feather name="bookmark" size={24} color="black" />
      </View>

      {/* Caption */}
      <View className="px-3">
        <Text>
          <Text className="font-semibold text-justify">
            {post.user.username}
          </Text>{" "}
          {post.caption}
        </Text>
      </View>
    </View>
  );
}
