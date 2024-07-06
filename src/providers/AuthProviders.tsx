import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { ActivityIndicator, Image, View } from "react-native";

type Auth = {
  isAuthenticated: boolean;
  session: Session | null;
  user?: {
    username: string;
    full_name: string;
    avatar_url: string;
    bio: string;
  } | null;
};

const AuthContext = createContext<Auth>({
  isAuthenticated: false,
  session: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<{
    username: string;
    full_name: string;
    avatar_url: string;
    bio: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async (session: Session) => {
    try {
      const { data: user, error } = await supabase
        .from("profiles")
        .select("username, full_name, avatar_url, bio")
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        throw error;
      }

      setUser(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user?.id) {
        fetchUserDetails(session);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && session.user?.id) {
        fetchUserDetails(session);
      }
    });

    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center gap-10">
        <Image
          source={require("@/assets/images/logo-color.png")}
          className="size-20"
        />

        <ActivityIndicator className="text-blue-500" size={40} />
      </View>
    );

  return (
    <AuthContext.Provider
      value={{ session, user, isAuthenticated: !!session?.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
