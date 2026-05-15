<script setup>
import { onMounted, ref } from 'vue'
import { useInventarioStore } from '@/stores/inventario'

const store = useInventarioStore()
const mostrarForm = ref(false)
const novoProduto = ref({ nome: '', quantidade: '', unidade: '', observacao: '' })

onMounted(() => store.buscarProdutos())

async function salvar() {
  const { error } = await store.adicionarProduto({ ...novoProduto.value })
  if (!error) {
    novoProduto.value = { nome: '', quantidade: '', unidade: '', observacao: '' }
    mostrarForm.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">📦 Meu Inventário</h2>
      <button
        @click="mostrarForm = !mostrarForm"
        class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
      >
        + Adicionar
      </button>
    </div>

    <div v-if="mostrarForm" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 class="font-semibold text-gray-700">Novo Produto</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Nome do produto</label>
          <input v-model="novoProduto.nome" class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm" placeholder="Ex: Feijão" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Quantidade</label>
          <input v-model="novoProduto.quantidade" type="number" class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm" placeholder="Ex: 50" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Unidade</label>
          <select v-model="novoProduto.unidade" class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm">
            <option value="">Selecione</option>
            <option>kg</option>
            <option>saco</option>
            <option>caixa</option>
            <option>litro</option>
            <option>unidade</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Observação</label>
          <input v-model="novoProduto.observacao" class="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm" placeholder="Ex: colhido em maio" />
        </div>
      </div>
      <button @click="salvar" class="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors">
        Salvar Produto
      </button>
    </div>

    <div v-if="store.carregando" class="text-center py-10 text-gray-500">Carregando...</div>

    <div v-else-if="store.produtos.length === 0" class="text-center py-10 text-gray-400">
      <p class="text-4xl mb-3">🌾</p>
      <p>Nenhum produto ainda. Adicione o primeiro!</p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="produto in store.produtos"
        :key="produto.id"
        class="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between"
      >
        <div>
          <p class="font-semibold text-gray-800">{{ produto.nome }}</p>
          <p class="text-sm text-gray-500">{{ produto.quantidade }} {{ produto.unidade }}</p>
          <p v-if="produto.observacao" class="text-xs text-gray-400 mt-1">{{ produto.observacao }}</p>
        </div>
        <button
          @click="store.removerProduto(produto.id)"
          class="text-red-400 hover:text-red-600 text-xl transition-colors"
          title="Remover"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
