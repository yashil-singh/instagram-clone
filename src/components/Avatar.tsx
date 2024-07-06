import { Image, ImageBackground, View } from "react-native";

type AvatarProps = {
  image_url: string;
  size?: number;
};

export default function Avatar({ image_url, size = 42 }: AvatarProps) {
  return (
    <ImageBackground
      className="rounded-full overflow-hidden"
      source={require("@/assets/images/default.jpg")}
      style={{ width: size, height: size }}
    >
      <Image
        source={{ uri: image_url }}
        style={{ width: size, height: size }}
      />
    </ImageBackground>
  );
}
