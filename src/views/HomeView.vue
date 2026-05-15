<template>
  <div class="space-y-6">
    <div class="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-2">Bem-vindo ao Safraiz</h1>
      <p class="text-green-700 text-lg">Seu assistente de gestão da roça</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RouterLink
        to="/inventario"
        class="flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
      >
        <span class="text-5xl">📦</span>
        <span class="text-lg font-semibold text-gray-700">Meu Inventário</span>
        <span class="text-sm text-gray-500">Veja e registre seus produtos</span>
      </RouterLink>

      <RouterLink
        to="/aprenda"
        class="flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
      >
        <span class="text-5xl">📚</span>
        <span class="text-lg font-semibold text-gray-700">Aprenda Gestão</span>
        <span class="text-sm text-gray-500">Dicas simples para sua roça</span>
      </RouterLink>
    </div>
  </div>
</template>
