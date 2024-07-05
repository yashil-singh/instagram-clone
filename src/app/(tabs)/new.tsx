import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function New() {
  const [caption, setCaption] = useState<string>("");
  return (
    <View className="p-3 items-center flex-1">
      {/* Image Picker */}
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
        }}
        className="w-52 aspect-[3/4] bg-slate-300 rounded-xl"
      />

      <Text onPress={() => {}} className="text-blue-500 font-semibold my-5">
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
        <Pressable className="bg-blue-500 w-full p-3 items-center rounded-lg">
          <Text className="font-semibold text-white">Share</Text>
        </Pressable>
      </View>
    </View>
  );
}
