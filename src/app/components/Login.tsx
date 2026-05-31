import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, Sparkles, AlertCircle, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useAuth } from "../context/AuthContext";

function traduzirErro(msg: string): string {
  if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (msg.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (msg.includes("User already registered")) return "Este e-mail já está cadastrado.";
  if (msg.includes("Password should be at least 6")) return "A senha deve ter pelo menos 6 caracteres.";
  if (msg.includes("invalid")) return "E-mail inválido.";
  return "Ocorreu um erro. Tente novamente.";
}

export default function Login() {
  const { altoContraste, tamanhoFonte } = useOutletContext<{ altoContraste: boolean, tamanhoFonte: number }>();
  const { login, cadastrar, usuario } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [enviando, setEnviando] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (usuario) navigate("/", { replace: true });
  }, [usuario, navigate]);

  useEffect(() => {
    if (errorMsg && errorRef.current) errorRef.current.focus();
  }, [errorMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Por favor, preencha o e-mail e a senha.");
      return;
    }
    if (modo === "cadastro" && !nome.trim()) {
      setErrorMsg("Por favor, preencha o seu nome.");
      return;
    }

    setEnviando(true);
    try {
      const erro = modo === "cadastro"
        ? await cadastrar(nome.trim(), email, password)
        : await login(email, password);

      if (erro) {
        setErrorMsg(traduzirErro(erro));
      } else {
        navigate("/", { replace: true });
      }
    } finally {
      setEnviando(false);
    }
  };

  const trocarModo = () => {
    setModo(m => m === "login" ? "cadastro" : "login");
    setErrorMsg("");
    setNome("");
    setEmail("");
    setPassword("");
  };

  const bgGradient = altoContraste ? "bg-black" : "bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50";
  const cardBg = altoContraste ? "bg-gray-900 border-2 border-yellow-400" : "bg-white/90";
  const textColor = altoContraste ? "text-white" : "text-gray-900";
  const textSecondary = altoContraste ? "text-gray-300" : "text-gray-700";
  const iconColor = altoContraste ? "text-black" : "text-[#800080]";
  const iconBg = altoContraste ? "bg-yellow-400" : "bg-purple-100";
  const buttonClass = altoContraste
    ? "bg-yellow-400 text-black hover:bg-yellow-500 ring-offset-black disabled:opacity-50"
    : "bg-[#800080] hover:bg-[#600060] text-white ring-offset-white disabled:opacity-50";
  const linkClass = altoContraste ? "text-yellow-400 hover:text-yellow-300" : "text-[#800080] hover:text-[#600060]";
  const inputBorder = altoContraste ? "border-gray-500 bg-gray-800 text-white placeholder-gray-400" : "border-gray-400 bg-white text-gray-900 placeholder-gray-500";
  const inputIcon = altoContraste ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`size-full flex items-center justify-center relative ${bgGradient}`} style={{ fontSize: `${tamanhoFonte}%` }}>
      <main id="conteudo-principal" className="max-w-md w-full mx-auto px-6 py-12 flex flex-col pt-24 md:pt-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-900 rounded ${altoContraste ? 'text-yellow-400 hover:text-yellow-300' : 'text-[#17194a] hover:text-[#274b62]'}`}
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft className="w-4 h-4" />
            Início
          </Link>
          <img src="/logo.png" alt="Logo Safraiz" className="w-16 h-16 object-contain" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${cardBg} backdrop-blur-sm rounded-3xl shadow-2xl p-8`}
        >
          <div className="flex justify-center mb-6">
            <div className={`${iconBg} p-4 rounded-full`}>
              <Sparkles className={`w-12 h-12 ${iconColor}`} />
            </div>
          </div>

          <h2 className={`text-3xl font-bold text-center mb-2 ${textColor}`}>
            {modo === "login" ? "Entrar" : "Criar conta"}
          </h2>
          <p className={`text-center mb-8 ${textSecondary}`}>
            {modo === "login" ? "Acesse sua conta para continuar" : "Cadastre-se para começar a usar"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errorMsg && (
              <div
                ref={errorRef}
                tabIndex={-1}
                className="flex items-center gap-2 p-4 bg-red-100 text-red-900 border-l-4 border-red-600 rounded"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {modo === "cadastro" && (
              <div>
                <label htmlFor="nome" className={`block text-sm font-bold mb-2 ${textColor}`}>
                  Seu nome
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${inputIcon}`} />
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Como você se chama?"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all ${inputBorder}`}
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className={`block text-sm font-bold mb-2 ${textColor}`}>
                E-mail
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${inputIcon}`} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all ${inputBorder}`}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-bold mb-2 ${textColor}`}>
                Senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${inputIcon}`} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all ${inputBorder}`}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-900 focus:ring-offset-2 ${buttonClass}`}
            >
              {enviando ? "Aguarde..." : modo === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className={`text-center mt-6 font-medium ${textColor}`}>
            {modo === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              onClick={trocarModo}
              className={`font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-900 rounded px-1 ${linkClass}`}
            >
              {modo === "login" ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
