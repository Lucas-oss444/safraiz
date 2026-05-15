<template>
  <nav class="bg-green-700 text-white shadow-md">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="text-xl font-bold tracking-wide">🌱 Safraiz</RouterLink>
      <div class="flex gap-4 text-sm font-medium">
        <RouterLink to="/" active-class="underline underline-offset-4" class="hover:opacity-80">Início</RouterLink>
        <RouterLink to="/inventario" active-class="underline underline-offset-4" class="hover:opacity-80">Inventário</RouterLink>
        <RouterLink to="/aprenda" active-class="underline underline-offset-4" class="hover:opacity-80">Aprenda</RouterLink>
      </div>
    </div>
  </nav>
</template>
