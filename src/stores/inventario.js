import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useInventarioStore = defineStore('inventario', () => {
  const produtos = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  async function buscarProdutos() {
    carregando.value = true
    erro.value = null
    const { data, error } = await supabase.from('produtos').select('*').order('nome')
    if (error) {
      erro.value = error.message
    } else {
      produtos.value = data
    }
    carregando.value = false
  }

  async function adicionarProduto(produto) {
    const { data, error } = await supabase.from('produtos').insert(produto).select().single()
    if (!error) produtos.value.push(data)
    return { data, error }
  }

  async function atualizarProduto(id, alteracoes) {
    const { data, error } = await supabase.from('produtos').update(alteracoes).eq('id', id).select().single()
    if (!error) {
      const index = produtos.value.findIndex((p) => p.id === id)
      if (index !== -1) produtos.value[index] = data
    }
    return { data, error }
  }

  async function removerProduto(id) {
    const { error } = await supabase.from('produtos').delete().eq('id', id)
    if (!error) produtos.value = produtos.value.filter((p) => p.id !== id)
    return { error }
  }

  return { produtos, carregando, erro, buscarProdutos, adicionarProduto, atualizarProduto, removerProduto }
})
