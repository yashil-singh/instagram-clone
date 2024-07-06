import Avatar from "@/src/components/Avatar";
import { Pressable, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { supabase } from "@/src/lib/supabase";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  useEffect(() => {}, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="flex-1 p-3">
      {/* Avatar Image Picker */}
      <View className="self-center">
        {image ? (
          <Avatar image_url={image} size={160} />
        ) : (
          <View className="size-40 bg-slate-300 rounded-full"></View>
        )}

        <Text
          onPress={pickImage}
          className="text-blue-500 font-semibold my-5 self-center"
        >
          Change
        </Text>
      </View>

      {/* Update Form */}
      <View className="gap-3 my-3">
        <TextInput
          placeholder="Name"
          value={name}
          onChange={(text) => setName(text)}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Website"
          value={website}
          onChange={(text) => setWebsite(text)}
        />
      </View>

      {/* Buttons */}
      <View className="gap-3">
        <Button title="Update" onPress={() => {}} />
        <Pressable className="p-3" onPress={() => supabase.auth.signOut()}>
          <Text className="text-red-500 text-center">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
