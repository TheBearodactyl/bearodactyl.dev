<template>
  <div class="container">
    <h1 class="animate-text">
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </h1>
    <iframe width="500" height="500" src="https://youtube.com/embed/ypHZ_iKBcoo?autoplay=1&loop=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<script setup>
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
  animation: textGrow 3607s ease-in-out forwards;
}
</style>