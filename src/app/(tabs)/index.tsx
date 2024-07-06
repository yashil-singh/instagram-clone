import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import PostCard from "@/src/components/PostCard";
import { useEffect, useState } from "react";
import { PostType } from "@/types";
import { supabase } from "@/src/lib/supabase";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
    setIsLoading(false);
  }, []);

  const fetchPosts = async () => {
    setIsRefreshing(true);
    let { data, error } = await supabase
      .from("posts")
      .select(`*, user:profiles(*)`)
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Something went wrong.");
    } else {
      setPosts(data as PostType[]);
    }
    setIsRefreshing(false);
  };

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator className="text-blue-500" size={32} />
      </View>
    );

  return (
    <View>
      <FlatList
        data={posts}
        contentContainerClassName="gap-6 py-5"
        renderItem={({ item }) => <PostCard post={item} key={item.id} />}
        onRefresh={fetchPosts}
        refreshing={isRefreshing}
      />
    </View>
  );
}
