import { ZoomIn, ZoomOut, Moon, Sun, Menu, Settings, X, ChevronRight, LayoutDashboard, Home as HomeIcon, Keyboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

interface BarraAcessibilidadeProps {
  altoContraste: boolean;
  setAltoContraste: (value: boolean) => void;
  tamanhoFonte: number;
  setTamanhoFonte: (value: number) => void;
}

export default function BarraAcessibilidade({
  altoContraste,
  setAltoContraste,
  tamanhoFonte,
  setTamanhoFonte
}: BarraAcessibilidadeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const aumentarFonte = () => {
    if (tamanhoFonte < 120) setTamanhoFonte(tamanhoFonte + 10);
  };

  const diminuirFonte = () => {
    if (tamanhoFonte > 80) setTamanhoFonte(tamanhoFonte - 10);
  };

  const menuClass = altoContraste ? "bg-black text-white" : "bg-gray-900 text-white";
  const mobileSheetClass = altoContraste ? "bg-gray-900 text-white border-t-2 border-yellow-400" : "bg-white text-gray-900";
  const buttonClass = altoContraste 
    ? "bg-gray-800 hover:bg-gray-700 border border-yellow-400" 
    : "bg-gray-100 hover:bg-gray-200 text-gray-900";

  return (
    <>
      {/* Skip Links - Desktop */}
      <div className="sr-only focus-within:not-sr-only">
        <a href="#conteudo-principal" accessKey="1" className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold z-[100] focus:ring-4 focus:ring-black">
          Ir para o conteúdo principal - Alt+1
        </a>
        <a href="#menu-principal" accessKey="2" className="absolute top-4 left-48 bg-yellow-400 text-black px-4 py-2 rounded font-semibold z-[100] focus:ring-4 focus:ring-black">
          Ir para o menu - Alt+2
        </a>
        <a href="#busca" accessKey="3" className="absolute top-4 left-[340px] bg-yellow-400 text-black px-4 py-2 rounded font-semibold z-[100] focus:ring-4 focus:ring-black">
          Ir para a busca - Alt+3
        </a>
        <a href="#rodape" accessKey="4" className="absolute top-4 left-[520px] bg-yellow-400 text-black px-4 py-2 rounded font-semibold z-[100] focus:ring-4 focus:ring-black">
          Ir para o rodapé - Alt+4
        </a>
      </div>

      {/* Desktop Accessibility Bar */}
      <div className={`hidden md:flex fixed top-0 left-0 right-0 ${menuClass} px-6 py-3 z-50 shadow-lg justify-between items-center`} id="menu-principal">
        <div className="flex items-center">
          <span className="text-sm font-medium">Ferramentas de Acessibilidade</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:ring-4 focus:ring-yellow-400" aria-label="Atalhos de teclado">
              <Keyboard className="w-4 h-4" alt="" />
              <span className="text-sm">Atalhos</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-56 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 focus-within:opacity-100 pointer-events-none transition-opacity z-[101] border border-gray-700 hidden md:block">
              <strong>Anotação eMAG:</strong><br/>
              Alt+1 (Conteúdo)<br/>
              Alt+2 (Menu)<br/>
              Alt+3 (Busca)<br/>
              Alt+4 (Rodapé)<br/>
              DOM: Ordem visual de cima para baixo.
            </div>
          </div>
          <button id="busca" className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:ring-4 focus:ring-yellow-400" aria-label="Buscar no site">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span className="text-sm">Busca</span>
          </button>
          <button onClick={diminuirFonte} className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:ring-4 focus:ring-yellow-400" aria-label="Diminuir tamanho da fonte">
            <ZoomOut className="w-4 h-4" alt="" />
            <span className="text-sm">A-</span>
          </button>
          <button onClick={aumentarFonte} className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:ring-4 focus:ring-yellow-400" aria-label="Aumentar tamanho da fonte">
            <ZoomIn className="w-4 h-4" alt="" />
            <span className="text-sm">A+</span>
          </button>
          <button onClick={() => setAltoContraste(!altoContraste)} className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:ring-4 focus:ring-yellow-400" aria-label={altoContraste ? "Desativar alto contraste" : "Ativar alto contraste"}>
            {altoContraste ? <Sun className="w-4 h-4" alt="" /> : <Moon className="w-4 h-4" alt="" />}
            <span className="text-sm">Contraste</span>
          </button>
          
          <div className="relative group">
            <button
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:ring-4 focus:ring-yellow-400"
              aria-label="Ativar VLibras - Tradução para Libras"
              title="VLibras"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span className="text-sm font-semibold">VLibras</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-yellow-100 text-black text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[101] border border-yellow-300 hidden md:block">
              Anotação: Botão dispara via JavaScript a abertura do widget flutuante oficial do VLibras.
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Header (replaces standard header on small screens) */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 ${menuClass} z-50 flex items-center justify-between px-4 shadow-md`}>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-3 -ml-3 flex items-center justify-center focus:ring-4 focus:ring-yellow-400 rounded-lg min-w-[44px] min-h-[44px]"
          aria-label="Abrir menu de navegação"
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
          accessKey="2"
        >
          <Menu className="w-7 h-7" alt="" />
        </button>

        <div className="font-bold text-lg flex items-center gap-2">
          <span>Safraiz</span>
        </div>

        <button 
          onClick={() => setIsBottomSheetOpen(true)}
          className="p-3 -mr-3 flex items-center justify-center focus:ring-4 focus:ring-yellow-400 rounded-lg min-w-[44px] min-h-[44px]"
          aria-label="Opções de acessibilidade"
        >
          <Settings className="w-6 h-6" alt="" />
        </button>
      </div>

      {/* Breadcrumbs - Desktop Only */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 pt-20 pb-4 items-center text-sm">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2">
          <Link to="/" className={`${altoContraste ? 'text-yellow-400' : 'text-blue-600'} hover:underline font-medium focus:ring-2 focus:ring-blue-600 rounded px-1`}>Início</Link>
          <ChevronRight className={`w-4 h-4 ${altoContraste ? 'text-white' : 'text-gray-500'}`} alt="" />
          <span className={`${altoContraste ? 'text-white' : 'text-gray-700'} font-semibold`} aria-current="page">Painel Principal</span>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" onClick={() => setIsMobileMenuOpen(false)}></div>
          <nav className={`relative w-4/5 max-w-sm h-full ${altoContraste ? 'bg-black text-white border-r-2 border-yellow-400' : 'bg-white text-gray-900'} shadow-xl flex flex-col`}>
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
              <span className="font-bold text-lg">Menu Principal</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 min-w-[44px] min-h-[44px] flex justify-center items-center rounded-lg focus:ring-4 focus:ring-yellow-400" aria-label="Fechar menu">
                <X className="w-6 h-6" alt="" />
              </button>
            </div>
            <ul className="flex flex-col p-4 gap-2">
              <li>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] focus:ring-4 focus:ring-yellow-400">
                  <HomeIcon className="w-5 h-5" alt="" /> Início
                </Link>
              </li>
              <li>
                <Link to="/inventario" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] focus:ring-4 focus:ring-yellow-400">
                  <LayoutDashboard className="w-5 h-5" alt="" /> Minha Produção
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile Accessibility Bottom Sheet */}
      {isBottomSheetOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex items-end">
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" onClick={() => setIsBottomSheetOpen(false)}></div>
          <div className={`relative w-full ${mobileSheetClass} shadow-[0_-8px_30px_rgba(0,0,0,0.12)] rounded-t-3xl flex flex-col p-6 animate-in slide-in-from-bottom duration-300`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Acessibilidade</h2>
              <button onClick={() => setIsBottomSheetOpen(false)} className="p-2 min-w-[44px] min-h-[44px] flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-full focus:ring-4 focus:ring-yellow-400" aria-label="Fechar opções de acessibilidade">
                <X className="w-6 h-6" alt="" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={diminuirFonte} className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl min-h-[88px] ${buttonClass} focus:ring-4 focus:ring-yellow-400`} aria-label="Diminuir tamanho da fonte">
                <ZoomOut className="w-8 h-8" alt="" />
                <span className="font-semibold text-lg">A-</span>
              </button>
              <button onClick={aumentarFonte} className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl min-h-[88px] ${buttonClass} focus:ring-4 focus:ring-yellow-400`} aria-label="Aumentar tamanho da fonte">
                <ZoomIn className="w-8 h-8" alt="" />
                <span className="font-semibold text-lg">A+</span>
              </button>
              <button onClick={() => setAltoContraste(!altoContraste)} className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl min-h-[88px] col-span-2 ${buttonClass} focus:ring-4 focus:ring-yellow-400`} aria-label={altoContraste ? "Desativar alto contraste" : "Ativar alto contraste"}>
                {altoContraste ? <Sun className="w-8 h-8" alt="" /> : <Moon className="w-8 h-8" alt="" />}
                <span className="font-semibold text-lg">Alto Contraste</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
