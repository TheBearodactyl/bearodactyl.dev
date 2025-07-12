<template>
    <div class="player-controls">
        <button @click="$emit('prev')" aria-label="Previous track">⏮</button>
        <button @click="$emit('play')" aria-label="Play">▶️</button>
        <button @click="$emit('pause')" aria-label="Pause">⏸</button>
        <button @click="$emit('stop')" aria-label="Stop">⏹</button>
        <button @click="$emit('next')" aria-label="Next track">⏭</button>
    </div>
</template>

<script setup lang="ts">
defineEmits<{
    (e: "play"): void
    (e: "pause"): void
    (e: "stop"): void
    (e: "prev"): void
    (e: "next"): void
}>()
</script>