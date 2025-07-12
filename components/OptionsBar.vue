<template>
  <div class="options-bar">
    <button @click="toggleShuffle">
      Shuffle: {{ labels.shuffle }}
    </button>
    <button @click="toggleFontEffects">
      Font Effects: {{ labels.fontEffects }}
    </button>
    <button @click="toggleColorEffects">
      Color Effects: {{ labels.colorEffects }}
    </button>
  </div>
</template>

<script setup lang="ts">
const {
  labels,
  toggleShuffle,
  toggleFontEffects,
  toggleColorEffects
} = useVisualEffects()
</script>