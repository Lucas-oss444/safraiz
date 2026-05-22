import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, ClipboardList, AlertTriangle, ShoppingBasket, Handshake, CalendarDays, Sprout, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

interface AprenderProps {
  altoContraste: boolean;
  tamanhoFonte: number;
}

export default function Aprender({ altoContraste, tamanhoFonte }: AprenderProps) {
  const [aberto, setAberto] = useState<number | null>(null);

  const bgGradient = altoContraste
    ? "bg-black"
    : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50";

  const cardBg = altoContraste ? "bg-gray-900" : "bg-white";
  const textColor = altoContraste ? "text-white" : "text-gray-900";
  const textSecondary = altoContraste ? "text-gray-300" : "text-gray-600";
  const titleGradient = altoContraste ? "text-yellow-400" : "text-[#800080]";
  const importanciaBg = altoContraste ? "bg-gray-800 border-yellow-400" : "bg-green-50 border-green-300";
  const importanciaText = altoContraste ? "text-yellow-300" : "text-green-800";

  const topicos = [
    {
      icon: ClipboardList,
      titulo: "Anote o que você tem",
      texto: "Escreva o nome de cada produto da sua roça e a quantidade que você tem guardada. Pode ser num caderno, num papel ou aqui no aplicativo. O importante é ter esse registro em algum lugar.\n\nPor exemplo: \"Feijão — 3 sacos\", \"Milho — 50 kg\", \"Mandioca — 2 caixas\". Qualquer anotação já é melhor do que nenhuma.",
      importancia: "Sem saber o que você tem, é fácil esquecer de um produto, deixar estragar sem perceber ou vender mais do que devia. Com a lista em mãos, você tem o controle da sua própria produção.",
      iconCor: altoContraste ? "text-black" : "text-green-700",
      iconBg: altoContraste ? "bg-yellow-400" : "bg-green-100",
    },
    {
      icon: AlertTriangle,
      titulo: "Fique de olho no que está acabando",
      texto: "Toda vez que você usar ou vender um produto, atualize a quantidade. Quando a quantidade estiver baixa, é o momento de se preparar: plantar mais, buscar mais ou avisiar os compradores com antecedência.\n\nUm sinal simples como \"acabando\" ao lado do produto já é suficiente para você não ser pego de surpresa.",
      importancia: "Ficar sem produto na hora de vender é perder dinheiro. Quando você sabe antes que algo está acabando, tem tempo de agir — sem correria e sem prejuízo.",
      iconCor: altoContraste ? "text-black" : "text-yellow-700",
      iconBg: altoContraste ? "bg-yellow-400" : "bg-yellow-100",
    },
    {
      icon: ShoppingBasket,
      titulo: "Registre o que você vende",
      texto: "Toda vez que fechar uma venda, anote: qual produto vendeu, quanto foi e por qual preço. Não precisa ser complicado — uma linha por venda já resolve.\n\nExemplo: \"Segunda-feira — 1 saco de feijão — R$ 180,00\".",
      importancia: "Com esse registro, você consegue enxergar quais produtos saem mais, em que época vende melhor e quanto dinheiro entrou no mês. Isso ajuda a planejar o que plantar mais e o que talvez não valha tanto a pena.",
      iconCor: altoContraste ? "text-black" : "text-orange-700",
      iconBg: altoContraste ? "bg-yellow-400" : "bg-orange-100",
    },
    {
      icon: Sprout,
      titulo: "Anote o que você colheu",
      texto: "Após cada colheita, registre o que você tirou da roça e em que quantidade. Se possível, anote também a data e as condições — choveu muito, terra boa, praga, etc.\n\nCom o tempo, você vai ter um histórico valioso das suas colheitas.",
      importancia: "Saber quanto você colheu antes ajuda a estimar quanto vai colher agora. Isso evita tanto desperdiçar sementes quanto ficar com produção de menos. Você começa a tomar decisões com base no que já viveu, não no achismo.",
      iconCor: altoContraste ? "text-black" : "text-lime-700",
      iconBg: altoContraste ? "bg-yellow-400" : "bg-lime-100",
    },
    {
      icon: CalendarDays,
      titulo: "Planeje pelo período do ano",
      texto: "Divida o ano em dois momentos: tempo de chuva e tempo de seca. Pense em quais produtos crescem melhor em cada época e organize o que você vai plantar em cada período.\n\nNão precisa ser um plano perfeito — só pensar com antecedência já faz diferença.",
      importancia: "Quem planta sem pensar na época acaba perdendo produção ou ficando sem nada para vender em certos meses. Planejar pelo calendário da natureza aumenta a chance de ter produto disponível o ano todo.",
      iconCor: altoContraste ? "text-black" : "text-blue-700",
      iconBg: altoContraste ? "bg-yellow-400" : "bg-blue-100",
    },
    {
      icon: Handshake,
      titulo: "Compare preços antes de vender",
      texto: "Antes de fechar qualquer venda, pesquise o preço em pelo menos dois lugares: feira local, mercado, atravessador, cooperativa. Pergunte a outros agricultores também.\n\nIsso não demora muito e pode fazer uma grande diferença no valor que você recebe.",
      importancia: "O mesmo produto pode ter preços muito diferentes dependendo de onde você vende. Quem pesquisa antes de fechar negócio quase sempre ganha mais pelo mesmo trabalho. É um hábito simples que protege o seu lucro.",
      iconCor: altoContraste ? "text-black" : "text-purple-700",
      iconBg: altoContraste ? "bg-yellow-400" : "bg-purple-100",
    },
  ];

  return (
    <div className={`min-h-screen ${bgGradient} overflow-auto pt-16`} style={{ fontSize: `${tamanhoFonte}%` }}>
      <main id="conteudo-principal" className="max-w-3xl mx-auto px-6 py-12">
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-4">
            <div className={`${altoContraste ? 'bg-yellow-400' : 'bg-gray-200'} p-4 rounded-full`}>
              <BookOpen className={`w-10 h-10 ${altoContraste ? 'text-black' : 'text-[#800080]'}`} alt="" />
            </div>
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${titleGradient}`}>
            Como se organizar na roça
          </h1>
          <p className={`text-sm ${textSecondary}`}>
            Clique em cada tópico para ler e entender por que ele é importante
          </p>
        </motion.div>

        <div className="space-y-3">
          {topicos.map((topico, index) => {
            const Icon = topico.icon;
            const estaAberto = aberto === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className={`${cardBg} rounded-2xl shadow-sm border overflow-hidden ${altoContraste ? 'border-yellow-400' : 'border-gray-200'}`}
              >
                <button
                  onClick={() => setAberto(estaAberto ? null : index)}
                  aria-expanded={estaAberto}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors focus:outline-none focus:ring-4 focus:ring-inset focus:ring-blue-900 ${estaAberto ? (altoContraste ? 'bg-gray-800' : 'bg-gray-50') : ''}`}
                >
                  <div className={`shrink-0 ${topico.iconBg} p-2.5 rounded-xl`}>
                    <Icon className={`w-5 h-5 ${topico.iconCor}`} alt="" />
                  </div>
                  <span className={`flex-1 font-semibold text-base ${textColor}`}>
                    {topico.titulo}
                  </span>
                  <ChevronDown
                    className={`shrink-0 w-5 h-5 transition-transform duration-300 ${estaAberto ? 'rotate-180' : ''} ${altoContraste ? 'text-yellow-400' : 'text-gray-400'}`}
                    alt=""
                  />
                </button>

                <AnimatePresence initial={false}>
                  {estaAberto && (
                    <motion.div
                      key="conteudo"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 space-y-4">
                        <div className={`text-sm leading-relaxed ${textSecondary} whitespace-pre-line`}>
                          {topico.texto}
                        </div>
                        <div className={`rounded-xl border p-4 ${importanciaBg}`}>
                          <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${importanciaText}`}>
                            Por que isso é importante?
                          </p>
                          <p className={`text-sm leading-relaxed ${importanciaText}`}>
                            {topico.importancia}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
