<template>
  <div class="container">
    <h1 class="animate-text" ref="textElement">A</h1>
    <iframe width="500" height="280" src="https://youtube.com/embed/ypHZ_iKBcoo?autoplay=1&loop=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const textElement = ref(null)
let animationFrameId = null
let previousAs = 1

onMounted(() => {
  const updateText = () => {
    if (textElement.value) {
      const fontSize = parseFloat(window.getComputedStyle(textElement.value).fontSize)
      const numberOfAs = Math.max(1, Math.floor(fontSize / 5))
      
      if (numberOfAs !== previousAs) {
        textElement.value.textContent = 'A'.repeat(numberOfAs)
        previousAs = numberOfAs
      }
    }
    
    animationFrameId = requestAnimationFrame(updateText)
  }

  updateText()

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
})
</script>

<style>
@keyframes textGrow {
  from {
    font-size: 0.5rem;
    color: black;
  }
  
  to {
    font-size: 500rem;
    color: pink;
  }
}

.animate-text {
  animation: textGrow 3607s ease-in-out forwards;
}
</style>