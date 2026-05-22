import { createContext, useContext, useState } from "react";

interface Usuario {
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
}

const MOCK_USERS = [
  { email: "joao@safraiz.com", senha: "123456", nome: "João Silva" },
  { email: "maria@safraiz.com", senha: "senha123", nome: "Maria Oliveira" },
  { email: "demo@safraiz.com", senha: "demo123", nome: "Usuário Demo" },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const salvo = localStorage.getItem("safraiz_usuario");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  const login = (email: string, senha: string): boolean => {
    const encontrado = MOCK_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    );
    if (encontrado) {
      const user: Usuario = { nome: encontrado.nome, email: encontrado.email };
      setUsuario(user);
      localStorage.setItem("safraiz_usuario", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("safraiz_usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
