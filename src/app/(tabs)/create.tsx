import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";
import { upload } from "cloudinary-react-native";
import { cld, uploadImage } from "@/src/lib/cloudinary";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

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
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) return;
    const response = await uploadImage({ file: image });
    if (response) {
      const public_id = response?.public_id;
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
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
