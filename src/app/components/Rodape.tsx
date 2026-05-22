interface RodapeProps {
  altoContraste: boolean;
}

export default function Rodape({ altoContraste }: RodapeProps) {
  const bgColor = altoContraste ? "bg-black border-t-4 border-yellow-400" : "bg-gray-900";
  const textColor = altoContraste ? "text-white" : "text-gray-100";
  const linkColor = altoContraste ? "text-yellow-400 hover:text-yellow-300 underline underline-offset-2" : "text-blue-300 hover:text-blue-100 font-medium underline underline-offset-2";

  return (
    <footer id="rodape" className={`${bgColor} ${textColor} py-8 mt-auto`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-white mb-3">Informações Legais</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Acessibilidade</h3>
            <ul className="space-y-2">
              <li>
                <a href="/acessibilidade" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  Declaração de Acessibilidade eMAG
                </a>
              </li>
              <li>
                <a href="/mapa-do-site" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  Mapa do Site
                </a>
              </li>
              <li>
                <a href="#" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  Conformidade WCAG 2.1 AA
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Contato</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contato@exemplo.com" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  contato@exemplo.com
                </a>
              </li>
              <li>
                <a href="tel:+5511987654321" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  +55 (11) 98765-4321
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Redes Sociais</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className={`${linkColor} transition-colors text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded px-1`}>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2026 Sistema de Gestão Financeira. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs">
            Site desenvolvido com conformidade às diretrizes eMAG e WCAG 2.1 nível AA
          </p>
        </div>
      </div>
    </footer>
  );
}
