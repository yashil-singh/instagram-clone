import { supabase } from "@/src/lib/supabase";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  return (
    <View>
      <Pressable className="py-3 px-5" onPress={() => supabase.auth.signOut()}>
        <Text className="text-red-500">Logout</Text>
      </Pressable>
    </View>
  );
}
