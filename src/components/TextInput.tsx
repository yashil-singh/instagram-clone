import { forwardRef } from "react";
import {
  TextInput as Input,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Text,
  View,
} from "react-native";

type TextInputProps = {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChange: (text: string) => void;
  editable?: boolean;
  isPassword?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  ref?: React.Ref<Input>;
  onSubmitEditing?: () => void;
};

const TextInput = forwardRef<Input, TextInputProps>(
  (
    {
      placeholder,
      keyboardType = "default",
      value,
      onChange,
      editable = true,
      isPassword = false,
      returnKeyType,
      onSubmitEditing,
    },
    ref
  ) => {
    return (
      <View className="relative border border-gray-300 px-4 pt-8 pb-3 rounded-xl">
        <Text className="absolute left-4 top-3 text-gray-500">
          {placeholder}
        </Text>
        <Input
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChange}
          className=""
          editable={editable}
          secureTextEntry={isPassword}
          autoCapitalize={"none"}
          returnKeyType={returnKeyType}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

export default TextInput;
