import { useState } from 'react';
import {
  Search,
  ChevronLeft,
  Home,
  Volume2,
  Play,
  Pause,
  Menu,
  Settings,
  LogIn,
  PackageOpen,
  HelpCircle,
  BookOpen,
  ArrowUp,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function FigmaMockup() {
  const [activeCard, setActiveCard] = useState<string | null>('aprender');
  const [isVLibrasOpen, setIsVLibrasOpen] = useState(true);
  const [isVoiceReading, setIsVoiceReading] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-8">
      {/* Mockup Container */}
      <div className="max-w-7xl mx-auto">
        {/* Laptop Frame */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-2xl p-4 shadow-2xl">
          <div className="bg-white rounded-lg shadow-inner overflow-hidden">
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-4 font-semibold">
                  Gestão Financeira - Design System (eMAG/WCAG 2.1 AA)
                </span>
              </div>
              <span className="text-sm opacity-90">Figma Prototype</span>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-50 p-8">
              {/* Technical Annotations Header */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <AnnotationCard color="purple">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Dev: Alt+1 (Conteúdo), Alt+2 (Menu), Alt+3 (Busca), Alt+4 (Rodapé)
                  </span>
                </AnnotationCard>
                <AnnotationCard color="blue">
                  <span className="text-sm font-medium">
                    Touch Target mínimo: 44x44px CSS (WCAG 2.1 AA)
                  </span>
                </AnnotationCard>
                <AnnotationCard color="green">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    IA Voice Reader: Acessibilidade Cognitiva
                  </span>
                </AnnotationCard>
              </div>

              {/* Desktop & Mobile Views */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Desktop View */}
                <DesktopView
                  activeCard={activeCard}
                  setActiveCard={setActiveCard}
                  isVLibrasOpen={isVLibrasOpen}
                  setIsVLibrasOpen={setIsVLibrasOpen}
                  isVoiceReading={isVoiceReading}
                  setIsVoiceReading={setIsVoiceReading}
                />

                {/* Mobile View */}
                <MobileView
                  activeCard={activeCard}
                  setActiveCard={setActiveCard}
                />
              </div>

              {/* Footer */}
              <GlobalFooter />
            </div>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="bg-slate-800 h-4 rounded-b-2xl shadow-xl"></div>
        <div className="bg-slate-700 h-2 mx-auto w-1/2 rounded-b-lg"></div>
      </div>
    </div>
  );
}

function DesktopView({
  activeCard,
  setActiveCard,
  isVLibrasOpen,
  setIsVLibrasOpen,
  isVoiceReading,
  setIsVoiceReading,
}: any) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-purple-300">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-2 border-b border-purple-200">
        <span className="text-sm font-bold text-purple-800">🖥️ Desktop View</span>
      </div>

      {/* Accessibility Toolbar */}
      <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded transition-colors"
            aria-label="Busca"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Busca</span>
          </button>
          <button className="hover:bg-slate-700 px-3 py-2 rounded transition-colors text-sm">
            A-
          </button>
          <button className="hover:bg-slate-700 px-3 py-2 rounded transition-colors text-sm">
            A+
          </button>
          <button className="hover:bg-slate-700 px-3 py-2 rounded transition-colors text-sm">
            Contraste
          </button>
          <button
            onClick={() => setIsVLibrasOpen(!isVLibrasOpen)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors text-sm font-medium"
          >
            VLibras
          </button>
        </div>
        <button className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded transition-colors">
          <Home className="w-4 h-4" />
          <span className="text-sm">Início</span>
        </button>
      </div>

      {/* Search Dropdown */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-slate-200 px-4 py-3 shadow-md"
        >
          <input
            type="text"
            placeholder="Digite sua busca..."
            className="w-full px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="p-6 relative">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Gestão Financeira
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          <Card
            icon={<LogIn />}
            title="Login"
            description="Acesse sua conta"
            color="purple"
            isActive={activeCard === 'login'}
            onClick={() => setActiveCard('login')}
          />
          <Card
            icon={<PackageOpen />}
            title="Produção"
            description="Seu inventário"
            color="blue"
            isActive={activeCard === 'producao'}
            onClick={() => setActiveCard('producao')}
          />
          <Card
            icon={<HelpCircle />}
            title="Suporte"
            description="Precisa de ajuda?"
            color="green"
            isActive={activeCard === 'suporte'}
            onClick={() => setActiveCard('suporte')}
          />
          <Card
            icon={<BookOpen />}
            title="Aprender"
            description="Desenvolva suas habilidades"
            color="pink"
            isActive={activeCard === 'aprender'}
            onClick={() => setActiveCard('aprender')}
          />

          {/* Voice Reader Panel */}
          {isVoiceReading && activeCard === 'aprender' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-72 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-4 border-4 border-yellow-400 z-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="w-5 h-5" />
                <span className="font-bold text-sm">IA Voice Reader (Ativado)</span>
              </div>
              <p className="text-xs mb-3 bg-white/20 p-2 rounded">
                "Aprender: Desenvolva suas habilidades em gestão e cálculos
                financeiros..."
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVoiceReading(!isVoiceReading)}
                  className="bg-white text-purple-600 p-2 rounded hover:bg-purple-100 transition-colors"
                >
                  {isVoiceReading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div className="flex-1 bg-white/30 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-white h-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="mt-2 text-xs opacity-90">
                Recurso para usuários com baixa alfabetização
              </div>
            </motion.div>
          )}
        </div>

        {/* VLibras Widget */}
        {isVLibrasOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-4 top-4 w-48 bg-blue-600 text-white rounded-lg shadow-2xl p-4 border-4 border-magenta-500"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-sm">VLibras</span>
              <button
                onClick={() => setIsVLibrasOpen(false)}
                className="text-white hover:bg-blue-700 rounded px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center">
              <div className="w-16 h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-800 rounded-full"></div>
                <div className="absolute top-12 left-0 w-4 h-8 bg-blue-500 rounded-l-full"></div>
                <div className="absolute top-12 right-0 w-4 h-8 bg-blue-500 rounded-r-full"></div>
              </div>
            </div>
            <p className="text-xs mt-2 text-center">Avatar 3D Ativo</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MobileView({ activeCard, setActiveCard }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vlibrasFabActive, setVlibrasFabActive] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-blue-300">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-2 border-b border-blue-200">
        <span className="text-sm font-bold text-blue-800">📱 Mobile View</span>
      </div>

      <div className="bg-slate-100 p-4">
        {/* Mobile Device Frame */}
        <div className="max-w-xs mx-auto bg-slate-800 rounded-3xl p-2 shadow-2xl">
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Mobile Header */}
            <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 hover:bg-slate-700 rounded"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="font-bold text-sm">Gestão $</span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-700 rounded">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-700 text-white px-4 py-2"
              >
                <div className="space-y-2 text-sm">
                  <div className="py-2 hover:bg-slate-600 px-2 rounded">Início</div>
                  <div className="py-2 hover:bg-slate-600 px-2 rounded">Buscar</div>
                  <div className="py-2 hover:bg-slate-600 px-2 rounded">Ajuda</div>
                </div>
              </motion.div>
            )}

            {/* Mobile Cards */}
            <div className="p-4 space-y-3 relative">
              <MobileCard
                icon={<LogIn />}
                title="Login"
                description="Acesse sua conta"
                color="purple"
                isActive={activeCard === 'login'}
                onClick={() => setActiveCard('login')}
              />
              <MobileCard
                icon={<PackageOpen />}
                title="Produção"
                description="Seu inventário"
                color="blue"
                isActive={activeCard === 'producao'}
                onClick={() => setActiveCard('producao')}
              />
              <MobileCard
                icon={<HelpCircle />}
                title="Suporte"
                description="Precisa de ajuda?"
                color="green"
                isActive={activeCard === 'suporte'}
                onClick={() => setActiveCard('suporte')}
              />
              <MobileCard
                icon={<BookOpen />}
                title="Aprender"
                description="Desenvolva habilidades"
                color="pink"
                isActive={activeCard === 'aprender'}
                onClick={() => setActiveCard('aprender')}
              />

              {/* Voice Reader Mobile */}
              {activeCard === 'aprender' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg p-3 text-xs"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="w-4 h-4" />
                    <span className="font-bold">IA Voice</span>
                  </div>
                  <p className="text-xs opacity-90">
                    "Desenvolva suas habilidades..."
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Play className="w-3 h-3" />
                    <div className="flex-1 bg-white/30 h-1 rounded"></div>
                  </div>
                </motion.div>
              )}

              {/* VLibras FAB */}
              {vlibrasFabActive && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center font-bold text-lg border-4 border-blue-400 hover:bg-blue-700 transition-colors z-20"
                  onClick={() => setVlibrasFabActive(!vlibrasFabActive)}
                >
                  VL
                </motion.button>
              )}
            </div>

            {/* Mobile Annotation */}
            <div className="px-4 pb-4">
              <AnnotationCard color="orange">
                <span className="text-xs">
                  📏 Ordem DOM: superior→inferior | Touch: 44x44px
                </span>
              </AnnotationCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  description,
  color,
  isActive,
  onClick,
}: any) {
  const colors: any = {
    purple: 'from-purple-100 to-purple-200 border-purple-400 text-purple-900',
    blue: 'from-blue-100 to-blue-200 border-blue-400 text-blue-900',
    green: 'from-green-100 to-green-200 border-green-400 text-green-900',
    pink: 'from-pink-100 to-pink-200 border-pink-400 text-pink-900',
  };

  const focusColors: any = {
    purple: 'ring-purple-700',
    blue: 'ring-blue-700',
    green: 'ring-green-700',
    pink: 'ring-pink-700',
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${colors[color]} border-2 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer ${
        isActive ? `ring-4 ${focusColors[color]} scale-105` : ''
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10">{icon}</div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-xs opacity-80">{description}</p>
      </div>
    </button>
  );
}

function MobileCard({
  icon,
  title,
  description,
  color,
  isActive,
  onClick,
}: any) {
  const colors: any = {
    purple: 'from-purple-100 to-purple-200 border-purple-400',
    blue: 'from-blue-100 to-blue-200 border-blue-400',
    green: 'from-green-100 to-green-200 border-green-400',
    pink: 'from-pink-100 to-pink-200 border-pink-400',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-r ${colors[color]} border-2 rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-all min-h-[44px] ${
        isActive ? 'ring-2 ring-offset-2 ring-purple-700' : ''
      }`}
    >
      <div className="w-6 h-6 flex-shrink-0">{icon}</div>
      <div className="text-left flex-1">
        <h4 className="font-bold text-xs">{title}</h4>
        <p className="text-xs opacity-70">{description}</p>
      </div>
    </button>
  );
}

function AnnotationCard({ children, color }: any) {
  const colors: any = {
    purple: 'bg-purple-100 border-purple-400 text-purple-900',
    blue: 'bg-blue-100 border-blue-400 text-blue-900',
    green: 'bg-green-100 border-green-400 text-green-900',
    orange: 'bg-orange-100 border-orange-400 text-orange-900',
  };

  return (
    <div
      className={`${colors[color]} border-2 rounded-lg p-3 shadow-md flex items-center gap-2`}
    >
      {children}
    </div>
  );
}

function GlobalFooter() {
  return (
    <div className="mt-12 bg-slate-800 text-white rounded-lg p-6">
      <h3 className="font-bold mb-4 text-center">Rodapé Global (Alto Contraste)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2 text-blue-300">Legal</h4>
          <ul className="space-y-1 text-xs">
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-blue-400 rounded">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-blue-400 rounded">
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-green-300">Acessibilidade</h4>
          <ul className="space-y-1 text-xs">
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-green-400 rounded">
                Conformidade WCAG 2.1 AA
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-green-400 rounded">
                Declaração eMAG
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-purple-300">Navegação</h4>
          <ul className="space-y-1 text-xs">
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-purple-400 rounded">
                Mapa do Site
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-purple-400 rounded">
                Ajuda
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-pink-300">Contato</h4>
          <ul className="space-y-1 text-xs">
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-pink-400 rounded">
                Suporte
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline focus:ring-2 focus:ring-pink-400 rounded">
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-600 text-center text-xs opacity-80">
        © 2026 Gestão Financeira | Conformidade eMAG/WCAG 2.1 AA
      </div>
    </div>
  );
}
