import { forwardRef } from "react";
import {
  TextInput as Input,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
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
      <Input
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChange}
        className="border border-gray-300 p-3 rounded-md"
        placeholder={placeholder}
        editable={editable}
        secureTextEntry={isPassword}
        autoCapitalize={"none"}
        returnKeyType={returnKeyType}
        ref={ref}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
);

export default TextInput;
