import { motion } from "motion/react";
import { Leaf, Rocket, User, BookOpen, Lock, LogOut } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

interface HomeProps {
  altoContraste: boolean;
  tamanhoFonte: number;
}

export default function Home({ altoContraste, tamanhoFonte }: HomeProps) {
  const { usuario, logout } = useAuth();
  const bgGradient = altoContraste
    ? "bg-black"
    : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50";

  const cardBg = altoContraste ? "bg-gray-900" : "bg-white";
  const textColor = altoContraste ? "text-white" : "text-gray-900";
  const textSecondary = altoContraste ? "text-gray-300" : "text-gray-700";
  const titleGradient = altoContraste
    ? "text-yellow-400"
    : "text-[#17194a]";

  return (
    <div className={`size-full flex items-center justify-center ${bgGradient} pt-16`} style={{ fontSize: `${tamanhoFonte}%` }}>
      <main id="conteudo-principal" className="max-w-4xl mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              className="inline-block"
            >
              <img
                src="/logo.png"
                alt="Logo Safraiz"
                className="w-96 h-96 object-contain"
              />
            </motion.div>
          </div>

          <h1 className={`text-6xl font-bold mb-2 ${titleGradient}`} role="heading" aria-level={1}>
            Bem-vindo!
          </h1>
          {usuario && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-2xl font-semibold mb-10 ${altoContraste ? 'text-yellow-300' : 'text-gray-700'}`}
            >
              {usuario.nome}
            </motion.p>
          )}
          {!usuario && <div className="mb-10" />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {usuario ? (
            <div className={`${cardBg} ${altoContraste ? 'border-2 border-yellow-400' : 'border border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full flex flex-col items-center`}>
              <div className="flex justify-center mb-4">
                <div className={altoContraste ? "bg-yellow-400 p-4 rounded-full" : "bg-[#d0dd3a]/30 border border-[#d0dd3a] p-4 rounded-full"}>
                  <User className={`w-8 h-8 ${altoContraste ? 'text-black' : 'text-[#17194a]'}`} alt="" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-1 ${textColor}`}>Minha Conta</h3>
              <p className={`text-sm font-medium mb-6 truncate max-w-full ${altoContraste ? 'text-yellow-300' : 'text-[#17194a]'}`}>
                {usuario.email}
              </p>
              <button
                onClick={logout}
                className={`mt-auto inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-900 focus:ring-offset-2 ${
                  altoContraste
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500 ring-offset-black'
                    : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 ring-offset-white'
                }`}
                aria-label="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
                Sair da conta
              </button>
            </div>
          ) : (
            <Link to="/login" className="block focus:outline-none focus:ring-8 focus:ring-blue-900 focus:ring-offset-4 rounded-2xl transition-shadow">
              <div className={`${cardBg} ${altoContraste ? 'border-2 border-yellow-400' : 'border border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-900 cursor-pointer h-full`}>
                <div className="flex justify-center mb-4">
                  <div className={altoContraste ? "bg-yellow-400 p-4 rounded-full" : "bg-gray-100 border border-gray-200 p-4 rounded-full"}>
                    <User className={`w-8 h-8 ${altoContraste ? 'text-black' : 'text-[#17194a]'}`} alt="" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Login</h3>
                <p className={`font-medium ${textSecondary}`}>
                  Acesse sua conta e explore todos os recursos disponíveis
                </p>
              </div>
            </Link>
          )}

          {usuario ? (
            <Link to="/inventario" className="block focus:outline-none focus:ring-8 focus:ring-blue-900 focus:ring-offset-4 rounded-2xl transition-shadow">
              <div className={`${cardBg} ${altoContraste ? 'border-2 border-yellow-400' : 'border border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-900 cursor-pointer h-full`}>
                <div className="flex justify-center mb-4">
                  <div className={altoContraste ? "bg-yellow-400 p-4 rounded-full" : "bg-gray-100 border border-gray-200 p-4 rounded-full"}>
                    <Leaf className={`w-8 h-8 ${altoContraste ? 'text-black' : 'text-[#17194a]'}`} alt="" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Minha Produção</h3>
                <p className={`font-medium ${textSecondary}`}>
                  Gerencie e organize seu inventário de produtos
                </p>
              </div>
            </Link>
          ) : (
            <div
              aria-disabled="true"
              title="Faça login para acessar"
              className={`rounded-2xl opacity-50 cursor-not-allowed select-none`}
            >
              <div className={`${cardBg} ${altoContraste ? 'border-2 border-gray-600' : 'border border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full`}>
                <div className="flex justify-center mb-4">
                  <div className={altoContraste ? "bg-gray-700 p-4 rounded-full" : "bg-gray-100 border border-gray-200 p-4 rounded-full"}>
                    <Lock className={`w-8 h-8 ${altoContraste ? 'text-gray-400' : 'text-gray-400'}`} alt="" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${altoContraste ? 'text-gray-400' : 'text-gray-400'}`}>Minha Produção</h3>
                <p className={`font-medium text-sm ${altoContraste ? 'text-gray-500' : 'text-gray-400'}`}>
                  Faça login para acessar esta funcionalidade
                </p>
              </div>
            </div>
          )}

          <Link to="/suporte" className="block focus:outline-none focus:ring-8 focus:ring-blue-900 focus:ring-offset-4 rounded-2xl transition-shadow">
            <div className={`${cardBg} ${altoContraste ? 'border-2 border-yellow-400' : 'border border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-900 cursor-pointer h-full`}>
              <div className="flex justify-center mb-4">
                <div className={altoContraste ? "bg-yellow-400 p-4 rounded-full" : "bg-gray-100 border border-gray-200 p-4 rounded-full"}>
                  <Rocket className={`w-8 h-8 ${altoContraste ? 'text-black' : 'text-[#17194a]'}`} alt="" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Suporte</h3>
              <p className={`font-medium ${textSecondary}`}>
                Entre em contato conosco para obter ajuda
              </p>
            </div>
          </Link>

          <Link to="/aprender" className="block focus:outline-none focus:ring-8 focus:ring-blue-900 focus:ring-offset-4 rounded-2xl transition-shadow">
            <div className={`${cardBg} ${altoContraste ? 'border-2 border-yellow-400' : 'border border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-900 cursor-pointer h-full`}>
              <div className="flex justify-center mb-4">
                <div className={altoContraste ? "bg-yellow-400 p-4 rounded-full" : "bg-gray-100 border border-gray-200 p-4 rounded-full"}>
                  <BookOpen className={`w-8 h-8 ${altoContraste ? 'text-black' : 'text-[#17194a]'}`} alt="" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Aprender</h3>
              <p className={`font-medium ${textSecondary}`}>
                Desenvolva suas habilidades em gestão financeira
              </p>
            </div>
          </Link>
        </motion.div>

        {usuario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center gap-5 text-left ${
              altoContraste
                ? 'bg-gray-900 border-2 border-yellow-400'
                : 'bg-[#17194a] border-l-8 border-[#d0dd3a]'
            }`}
            role="region"
            aria-label="Dica de aprendizado"
          >
            <div className={`shrink-0 p-4 rounded-full ${altoContraste ? 'bg-yellow-400' : 'bg-[#d0dd3a]'}`}>
              <BookOpen className={`w-8 h-8 ${altoContraste ? 'text-black' : 'text-[#17194a]'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-lg font-bold mb-1 ${altoContraste ? 'text-yellow-400' : 'text-[#d0dd3a]'}`}>
                Olá, {usuario.nome.split(' ')[0]}! Que tal aprender algo novo hoje?
              </p>
              <p className={`text-sm ${altoContraste ? 'text-gray-300' : 'text-gray-300'}`}>
                Temos dicas simples para você organizar melhor sua produção e vender com mais vantagem.
              </p>
            </div>
            <Link
              to="/aprender"
              className={`shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-900 ${
                altoContraste
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-[#d0dd3a] text-[#17194a] hover:brightness-110'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Ir para Aprender
            </Link>
          </motion.div>
        )}

      </main>
    </div>
  );
}
