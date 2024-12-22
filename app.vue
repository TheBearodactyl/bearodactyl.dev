<template>
  <div class="container">
    <h1 class="animate-text">
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </h1>
    <audio controls autoplay preload="auto" playsinline :src="aaaaaaUrl" loop></audio>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const aaaaaaUrl = 'https://www.myinstants.com/media/sounds/ahhhh-song.mp3'
const audioPlayer = ref(null)


onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.play()
      .then(() => {
        audioPlayer.value.muted = false
      })
      .catch("console.error")
  }
})
</script>

<style>
@keyframes textGrow {
  from {
    font-size: 1rem;
    color: black;
  }
  
  to {
    font-size: 500rem;
    color: pink;
  }
}

.animate-text {
  animation: textGrow 120s ease-in-out forwards;
}
</style>