import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<string | null>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function usuarioFromSupabase(user: User): Usuario {
  return {
    id: user.id,
    nome: user.user_metadata?.nome ?? user.email?.split("@")[0] ?? "Usuário",
    email: user.email ?? "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ? usuarioFromSupabase(session.user) : null);
      setCarregando(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ? usuarioFromSupabase(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, senha: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    return error ? error.message : null;
  };

  const cadastrar = async (nome: string, email: string, senha: string): Promise<string | null> => {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome } },
    });
    return error ? error.message : null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
