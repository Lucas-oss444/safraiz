import { motion } from "motion/react";
import { ArrowLeft, Mail, Phone, Clock, MessageCircle, Headphones } from "lucide-react";
import { Link } from "react-router";

export default function Suporte() {
  return (
    <div className="size-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
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
            <div className="bg-blue-100 p-4 rounded-full">
              <Headphones className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Central de Suporte
          </h1>
          <p className="text-gray-600">
            Estamos aqui para ajudar você. Entre em contato conosco!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">E-mail</h3>
            </div>
            <p className="text-gray-600 mb-2">Entre em contato por e-mail:</p>
            <a
              href="mailto:suporte@exemplo.com"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
            >
              suporte@exemplo.com
            </a>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Telefone</h3>
            </div>
            <p className="text-gray-600 mb-2">Ligue para nossa central:</p>
            <a
              href="tel:+5511987654321"
              className="text-green-600 hover:text-green-700 font-semibold text-lg transition-colors"
            >
              +55 (11) 98765-4321
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Horário de Atendimento</h3>
          </div>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Segunda a Sexta:</span>
              <span className="font-semibold">8h às 18h</span>
            </div>
            <div className="flex justify-between">
              <span>Sábado:</span>
              <span className="font-semibold">9h às 13h</span>
            </div>
            <div className="flex justify-between">
              <span>Domingo:</span>
              <span className="font-semibold">Fechado</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <MessageCircle className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Precisa de ajuda rápida?</h3>
          </div>
          <p className="mb-6 opacity-90">
            Nossa equipe está pronta para responder suas dúvidas e resolver seus problemas.
            Não hesite em entrar em contato!
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Enviar Mensagem
          </button>
        </motion.div>
      </div>
    </div>
  );
}
