import { motion } from "motion/react";
import { ArrowLeft, Package, Plus, Search, Edit, Trash2, Info, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

interface Item {
  id: number;
  nome: string;
  quantidade: number;
  categoria: string;
  status: "disponível" | "baixo estoque" | "esgotado";
  precoCusto: number;
  precoVenda: number;
}

type FormItem = {
  nome: string;
  quantidade: string;
  precoCusto: string;
  precoVenda: string;
};

const FORM_VAZIO: FormItem = { nome: "", quantidade: "", precoCusto: "", precoVenda: "" };

// Formata número como moeda brasileira: 1234.5 → "1.234,50"
const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Formata percentual brasileiro: 12.5 → "12,5"
const pct = (valor: number) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// Converte string brasileira para número: "1.234,50" → 1234.5
const parseBR = (val: string) =>
  parseFloat(val.replace(/\./g, "").replace(",", ".") || "0");

// Formata número para exibição no campo de input de edição: 50 → "50,00"
const inputMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Inventario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formItem, setFormItem] = useState<FormItem>(FORM_VAZIO);
  const [items, setItems] = useState<Item[]>([
    { id: 1, nome: "Produto A", quantidade: 150, categoria: "Eletrônicos", status: "disponível", precoCusto: 50, precoVenda: 80 },
    { id: 2, nome: "Produto B", quantidade: 8, categoria: "Acessórios", status: "baixo estoque", precoCusto: 20, precoVenda: 25 },
    { id: 3, nome: "Produto C", quantidade: 0, categoria: "Vestuário", status: "esgotado", precoCusto: 100, precoVenda: 90 },
    { id: 4, nome: "Produto D", quantidade: 45, categoria: "Eletrônicos", status: "disponível", precoCusto: 30, precoVenda: 60 },
    { id: 5, nome: "Produto E", quantidade: 12, categoria: "Decoração", status: "baixo estoque", precoCusto: 15, precoVenda: 35 },
  ]);

  const filteredItems = items.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponível": return "bg-green-100 text-green-700";
      case "baixo estoque": return "bg-yellow-100 text-yellow-700";
      case "esgotado": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const calcularLucro = (item: Item) => item.precoVenda - item.precoCusto;
  const calcularLucroTotal = (item: Item) => (item.precoVenda - item.precoCusto) * item.quantidade;
  const calcularMargemLucro = (item: Item) => {
    if (item.precoVenda === 0) return 0;
    return ((item.precoVenda - item.precoCusto) / item.precoVenda) * 100;
  };

  const determinarStatus = (quantidade: number): "disponível" | "baixo estoque" | "esgotado" => {
    if (quantidade === 0) return "esgotado";
    if (quantidade < 10) return "baixo estoque";
    return "disponível";
  };

  // --- handlers de input com restrições no padrão brasileiro ---

  const handleQuantidade = (val: string) => {
    if (/^\d*$/.test(val)) setFormItem(prev => ({ ...prev, quantidade: val }));
  };

  // Aceita dígitos, separador de milhar "." e vírgula decimal com até 2 casas
  const handlePreco = (val: string, field: "precoCusto" | "precoVenda") => {
    if (/^[\d.]*,?\d{0,2}$/.test(val)) setFormItem(prev => ({ ...prev, [field]: val }));
  };

  // --- modal ---

  const abrirAdicao = () => {
    setEditandoId(null);
    setFormItem(FORM_VAZIO);
    setShowModal(true);
  };

  const abrirEdicao = (item: Item) => {
    setEditandoId(item.id);
    setFormItem({
      nome: item.nome,
      quantidade: String(item.quantidade),
      precoCusto: inputMoeda(item.precoCusto),
      precoVenda: inputMoeda(item.precoVenda),
    });
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setEditandoId(null);
    setFormItem(FORM_VAZIO);
  };

  const salvarItem = () => {
    if (!formItem.nome.trim()) {
      alert("Por favor, insira o nome do produto");
      return;
    }

    const quantidade = parseInt(formItem.quantidade || "0", 10);
    const precoCusto = parseBR(formItem.precoCusto);
    const precoVenda = parseBR(formItem.precoVenda);

    if (editandoId !== null) {
      setItems(prev => prev.map(i =>
        i.id === editandoId
          ? { ...i, nome: formItem.nome, quantidade, precoCusto, precoVenda, status: determinarStatus(quantidade) }
          : i
      ));
    } else {
      const novoId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      setItems(prev => [...prev, {
        id: novoId,
        nome: formItem.nome,
        quantidade,
        categoria: "Geral",
        status: determinarStatus(quantidade),
        precoCusto,
        precoVenda,
      }]);
    }

    fecharModal();
  };

  const excluirItem = (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#17194a] hover:text-[#274b62] transition-colors"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft className="w-4 h-4" />
            Início
          </Link>
          <img src="/logo.png" alt="Logo Safraiz" className="w-16 h-16 object-contain" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-pink-100 p-4 rounded-full">
              <Package className="w-12 h-12 text-pink-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Minha Produção
          </h1>
          <p className="text-gray-600">Gerencie seu inventário de forma eficiente</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={abrirAdicao}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Adicionar Item
            </button>
          </div>

          <div className="grid gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{item.nome}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Quantidade: <strong>{item.quantidade}</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirEdicao(item)}
                        title="Editar item"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => excluirItem(item.id)}
                        title="Excluir item"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Custo</div>
                      <div className="text-sm font-semibold text-gray-700">R$ {moeda(item.precoCusto)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Venda</div>
                      <div className="text-sm font-semibold text-gray-700">R$ {moeda(item.precoVenda)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Lucro/Unidade</div>
                      <div className={`text-sm font-semibold ${calcularLucro(item) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        R$ {moeda(calcularLucro(item))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Lucro Total</div>
                      <div className={`text-sm font-semibold ${calcularLucroTotal(item) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        R$ {moeda(calcularLucroTotal(item))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Margem de Lucro:</span>
                      <span className={`text-sm font-semibold ${calcularMargemLucro(item) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {pct(calcularMargemLucro(item))}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => setExpandedInfo(expandedInfo === item.id ? null : item.id)}
                      className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Info className="w-4 h-4" />
                      {expandedInfo === item.id ? "Ocultar explicação" : "Ver como é calculado"}
                    </button>

                    {expandedInfo === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 bg-blue-50 rounded-lg text-xs text-gray-700 space-y-2"
                      >
                        <div>
                          <strong>Lucro por Unidade:</strong> Preço de Venda − Custo
                          <div className="text-blue-600 mt-1">
                            R$ {moeda(item.precoVenda)} − R$ {moeda(item.precoCusto)} = R$ {moeda(calcularLucro(item))}
                          </div>
                        </div>
                        <div>
                          <strong>Lucro Total:</strong> Lucro por Unidade × Quantidade
                          <div className="text-blue-600 mt-1">
                            R$ {moeda(calcularLucro(item))} × {item.quantidade} = R$ {moeda(calcularLucroTotal(item))}
                          </div>
                        </div>
                        <div>
                          <strong>Margem de Lucro:</strong> (Lucro ÷ Preço de Venda) × 100
                          <div className="text-blue-600 mt-1">
                            (R$ {moeda(calcularLucro(item))} ÷ R$ {moeda(item.precoVenda)}) × 100 = {pct(calcularMargemLucro(item))}%
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum item encontrado</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pink-600 mb-2">{items.length}</div>
            <div className="text-gray-600">Total de Itens</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {items.filter(i => i.status === "disponível").length}
            </div>
            <div className="text-gray-600">Disponíveis</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {items.filter(i => i.status === "esgotado").length}
            </div>
            <div className="text-gray-600">Esgotados</div>
          </div>
        </motion.div>
      </div>

      {/* Modal adicionar / editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {editandoId !== null ? "Editar Item" : "Adicionar Novo Item"}
              </h2>
              <button onClick={fecharModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={formItem.nome}
                  onChange={(e) => setFormItem(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Ex: Produto F"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade <span className="text-gray-400 font-normal">(somente inteiro)</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formItem.quantidade}
                  onChange={(e) => handleQuantidade(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço de Custo (R$) <span className="text-gray-400 font-normal">(ex: 1.250,99)</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formItem.precoCusto}
                  onChange={(e) => handlePreco(e.target.value, "precoCusto")}
                  placeholder="0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço de Venda (R$) <span className="text-gray-400 font-normal">(ex: 1.250,99)</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formItem.precoVenda}
                  onChange={(e) => handlePreco(e.target.value, "precoVenda")}
                  placeholder="0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={fecharModal}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={salvarItem}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {editandoId !== null ? "Salvar" : "Adicionar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
