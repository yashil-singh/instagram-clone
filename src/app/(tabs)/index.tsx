import { FlatList, View } from "react-native";
import PostCard from "@/src/components/PostCard";
import posts from "@/assets/data/posts.json";

export default function Feed() {
  return (
    <View>
      <FlatList
        data={posts}
        contentContainerClassName="gap-5 py-5"
        renderItem={({ item }) => <PostCard post={item} key={item.id} />}
      />
    </View>
  );
}
