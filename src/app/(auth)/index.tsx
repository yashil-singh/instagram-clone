import React, { useRef, useState } from "react";
import {
  Alert,
  View,
  AppState,
  TextInput as RNTextInput,
  Text,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<RNTextInput>(null);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View className="flex-1 justify-center gap-8 p-3">
      <View className="gap-3">
        <TextInput
          onChange={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />

        <TextInput
          onChange={(text) => setPassword(text)}
          value={password}
          isPassword={true}
          placeholder="Password"
          ref={passwordRef}
        />
      </View>

      <View className="gap-3">
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />

        <Text className="text-center">or</Text>

        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}
