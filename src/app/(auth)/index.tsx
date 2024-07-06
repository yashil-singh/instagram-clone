import React, { useRef, useState } from "react";
import {
  Alert,
  View,
  AppState,
  TextInput as RNTextInput,
  Text,
  Image,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { Link } from "expo-router";

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
    <View className="flex-1 justify-center gap-10 p-3">
      <Image
        source={require("@/assets/images/logo-color.png")}
        className="size-20 mx-auto"
      />
      <View className="gap-3">
        <TextInput
          onChange={(text) => setEmail(text)}
          value={email}
          placeholder="Email Address"
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
        <Link href="forgot-password" className="ml-auto">
          <Text className="text-blue-500">Forgot Password?</Text>
        </Link>
      </View>

      <View className="gap-3">
        <Button
          title="Login"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />

        <Text className="text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <Text className="text-blue-500">Sign up</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
