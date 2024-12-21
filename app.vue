<template>
  <div class="container">
    <h1 :style="{ fontSize: currentSize + 'px' }">AAAAAA</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  startSize: {
    type: Number,
    default: 0
  },
  endSize: {
    type: Number,
    default: 1000
  },
  durationMs: {
    type: Number,
    default: 120000
  }
})

const currentSize = ref(props.startSize)
let animationFrame = null

onMounted(() => {
  const startTime = performance.now()

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.durationMs, 1)

    currentSize.value = props.startSize + (props.endSize - props.startSize) * progress

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>