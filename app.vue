<template>
  <div class="container">
    <h1 class="animate-text" ref="textElement" :style="{ fontSize: `${currentSize}px` }">A</h1>
    <div id="player"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const textElement = ref(null)
const currentSize = ref(16)
let player = null
let animationFrameId = null

const TARGET_SIZE = 500 * 16 // 500rem in pixels
const START_SIZE = 16 // 1rem in pixels

// Ease in-out function
function easeInOut(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const updateText = () => {
  if (!player || player.getPlayerState() !== YT.PlayerState.PLAYING) return
  
  const duration = player.getDuration()
  const currentTime = player.getCurrentTime()
  const progress = currentTime / duration
  const easedProgress = easeInOut(progress)
  
  currentSize.value = START_SIZE + (TARGET_SIZE - START_SIZE) * easedProgress
  const numberOfAs = Math.max(1, Math.floor(currentSize.value / 5))
  
  if (textElement.value) {
    textElement.value.textContent = 'A'.repeat(numberOfAs)
  }
  
  animationFrameId = requestAnimationFrame(updateText)
}

onMounted(() => {
  const tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
      height: '280',
      width: '500',
      videoId: 'ypHZ_iKBcoo',
      playerVars: {
        'autoplay': 1,
        'loop': 1,
        'playlist': 'ypHZ_iKBcoo'
      },
      events: {
        'onStateChange': onPlayerStateChange
      }
    })
  }
})

const onPlayerStateChange = (event) => {
  if (event.data === YT.PlayerState.PLAYING) {
    requestAnimationFrame(updateText)
  } else {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style>
.animate-text {
  color: black;
  transition: color 3s;
}

.animate-text[style*="font-size: 8000"] {
  color: pink;
}
</style>