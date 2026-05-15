<script setup>
const licoes = [
  {
    emoji: '📋',
    titulo: 'O que é inventário?',
    texto: 'Inventário é a lista de tudo que você tem na sua roça: sementes, ferramentas, colheita guardada. Saber o que você tem ajuda a não faltar nada e a vender melhor.',
  },
  {
    emoji: '📅',
    titulo: 'Anote sempre',
    texto: 'Cada vez que colher ou vender um produto, anote a quantidade. Assim você sabe exatamente o que sobrou e pode planejar a próxima plantação.',
  },
  {
    emoji: '💰',
    titulo: 'Cuide dos seus gastos',
    texto: 'Anote quanto você gastou com sementes, adubo e transporte. Comparando com o que você ganhou nas vendas, você sabe se teve lucro.',
  },
  {
    emoji: '🌧️',
    titulo: 'Planeje por temporada',
    texto: 'Divida o ano em períodos de chuva e seca. Planeje o que plantar em cada época para ter menos perdas e mais produção.',
  },
  {
    emoji: '🤝',
    titulo: 'Compare preços antes de vender',
    texto: 'Antes de vender, pergunte o preço em mais de um lugar. Feiras, cooperativas e mercados podem pagar valores diferentes pelo mesmo produto.',
  },
]
</script>

<template>
  <div class="space-y-5">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-1">📚 Aprenda Gestão</h2>
      <p class="text-gray-500 text-sm">Dicas simples para cuidar melhor da sua roça</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="(licao, i) in licoes"
        :key="i"
        class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
      >
        <div class="flex items-start gap-4">
          <span class="text-4xl">{{ licao.emoji }}</span>
          <div>
            <h3 class="font-bold text-gray-800 text-base mb-1">{{ licao.titulo }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ licao.texto }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
