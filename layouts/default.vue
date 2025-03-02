<template>
    <div>
      <Header />
      <main class="pt-20">
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  useHead({
    title: "Glow",
  });

  </script>
  