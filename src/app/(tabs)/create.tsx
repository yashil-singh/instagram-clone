import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";

export default function CreatePost() {
  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, []);

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
    <View className="p-3 items-center flex-1">
      {/* Image Picker */}
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          className="w-52 aspect-[3/4] bg-slate-300 rounded-xl"
        />
      ) : (
        <View className="w-52 aspect-[3/4] bg-slate-300 rounded-xl"></View>
      )}

      <Text onPress={pickImage} className="text-blue-500 font-semibold my-5">
        Change
      </Text>

      {/* Caption Text Input */}
      <TextInput
        placeholder="Write a caption"
        className="w-full p-3"
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />

      {/* Button */}
      <View className="w-full mt-auto">
        <Button title="Share" onPress={() => {}} />
      </View>
    </View>
  );
}
