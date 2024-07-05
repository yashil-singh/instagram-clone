import { Image, View } from "react-native";

type AvatarProps = {
  image_url: string;
  size?: number;
};

export default function Avatar({ image_url, size = 42 }: AvatarProps) {
  return (
    <View>
      <Image
        source={{ uri: image_url }}
        style={{ width: size, height: size }}
        className="rounded-full"
      />
    </View>
  );
}
