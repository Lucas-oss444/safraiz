import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { altoContraste, tamanhoFonte } = useOutletContext<{ altoContraste: boolean, tamanhoFonte: number }>();
  const { login, usuario } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (usuario) navigate("/", { replace: true });
  }, [usuario, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Por favor, preencha o e-mail e a senha.");
      return;
    }
    const sucesso = login(email, password);
    if (sucesso) {
      navigate("/", { replace: true });
    } else {
      setErrorMsg("E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.");
    }
  };

  useEffect(() => {
    if (errorMsg && errorRef.current) {
      errorRef.current.focus();
    }
  }, [errorMsg]);

  const bgGradient = altoContraste
    ? "bg-black"
    : "bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50";

  const cardBg = altoContraste ? "bg-gray-900 border-2 border-yellow-400" : "bg-white/90";
  const textColor = altoContraste ? "text-white" : "text-gray-900";
  const textSecondary = altoContraste ? "text-gray-300" : "text-gray-700";
  const iconColor = altoContraste ? "text-black" : "text-[#800080]";
  const iconBg = altoContraste ? "bg-yellow-400" : "bg-purple-100";
  const buttonClass = altoContraste
    ? "bg-yellow-400 text-black hover:bg-yellow-500 ring-offset-black"
    : "bg-[#800080] hover:bg-[#600060] text-white ring-offset-white";
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
            <ArrowLeft className="w-4 h-4" alt="" />
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
              <Sparkles className={`w-12 h-12 ${iconColor}`} alt="" />
            </div>
          </div>

          <h2 className={`text-3xl font-bold text-center mb-2 ${textColor}`}>
            Área de Login
          </h2>
          <p className={`text-center mb-8 ${textSecondary}`}>
            Acesse sua conta para continuar
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
                <AlertCircle className="w-5 h-5 flex-shrink-0" alt="" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}
            
            <div className="sr-only" aria-hidden="true">
              Anotação de design: "Usar tags &lt;label&gt; associadas e mensagens de erro visuais e sonoras."
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-bold mb-2 ${textColor}`}>
                E-mail
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${inputIcon}`} alt="" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all ${inputBorder}`}
                  required
                  aria-required="true"
                  aria-invalid={errorMsg && !email ? "true" : "false"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-bold mb-2 ${textColor}`}>
                Senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${inputIcon}`} alt="" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all ${inputBorder}`}
                  required
                  aria-required="true"
                  aria-invalid={errorMsg && !password ? "true" : "false"}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer focus-within:ring-4 focus-within:ring-blue-900 rounded px-1">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-400 text-blue-900 focus:ring-0"
                />
                <span className={`font-medium ${textColor}`}>Lembrar-me</span>
              </label>
              <a href="#" className={`font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-900 rounded px-1 ${linkClass}`}>
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-900 focus:ring-offset-2 ${buttonClass}`}
            >
              Entrar
            </button>
          </form>

          <p className={`text-center mt-6 font-medium ${textColor}`}>
            Não tem uma conta?{" "}
            <a href="#" className={`font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-900 rounded px-1 ${linkClass}`}>
              Cadastre-se
            </a>
          </p>

          <div className={`mt-6 p-4 rounded-xl border text-sm ${altoContraste ? 'border-yellow-400 bg-gray-800 text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
            <p className="font-bold mb-2">Credenciais de demonstração (MVP):</p>
            <ul className="space-y-1 font-mono text-xs">
              <li>joao@safraiz.com / 123456</li>
              <li>maria@safraiz.com / senha123</li>
              <li>demo@safraiz.com / demo123</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
