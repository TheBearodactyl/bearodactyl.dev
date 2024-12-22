<template>
  <div class="container">
    <h1 class="animate-text-grow">
      BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
    </h1>
  </div>
</template>

<style>
@keyframes textGrow {
  from {
    font-size: 1rem;
  }
  
  to {
    font-size: 5000rem;
  }
}

.animate-text-grow {
  animation: textGrow 120s ease-in-out forwards;
}
</style>