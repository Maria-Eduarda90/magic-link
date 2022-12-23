import { useState, useEffect } from "react";
import { supabaseClient } from "../lib/supabaseClient";

export const useLogin = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  console.log("session: ",session);
  
  useEffect(() => {
    supabaseClient.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
    });

    setLoading(false);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        setSession(session);
        setUser(session?.user);
        setToken(session?.access_token);
      }
      setLoading(false);
    });
  }, [supabaseClient]);
  return {
    user,
    isLoading,
    token,
  };
};
