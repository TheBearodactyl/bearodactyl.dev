<template>
    <div class="dance">
        <img :src="gifSrc" alt="Dancing Madeline GIF" id="dance-gif" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    gifSrc: string
}>()
</script>