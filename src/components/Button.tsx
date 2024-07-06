import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      className="bg-blue-500 w-full p-3 items-center rounded-lg active:bg-blue-500/70"
      onPress={onPress}
    >
      <Text className="font-semibold text-white">{title}</Text>
    </Pressable>
  );
}
