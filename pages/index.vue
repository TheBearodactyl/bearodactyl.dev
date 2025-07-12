<script>
import { NuxtLink } from '#components';
</script>

<template>
    <div class="button-gallery">
        <button>
            <NuxtLink style="text-decoration: none;" to="/epic-tracks-player">E P I C T R A C K S</NuxtLink>
        </button>

        <button>
            <NuxtLink style="text-decoration: none;" to="/read-watch-list">Books I've read</NuxtLink>
        </button>
    </div>
</template>

<style scoped>
@import url("~/assets/css/main.css");

.button-gallery {
    display: flex;
    gap: 1rem;
}
</style>