import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { ActivityIndicator } from "react-native";

type Auth = {
  isAuthenticated: boolean;
  session: Session | null;
  user?: User;
};

const AuthContext = createContext<Auth>({
  isAuthenticated: false,
  session: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (isLoading) return <ActivityIndicator />;

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user, isAuthenticated: !!session?.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
