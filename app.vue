<template>
      <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup>
useHead({
  title: 'Glow',
  meta: [
    { name: 'description', content: 'Your destination for premium beauty products that help you look and feel your best.' }
  ],
})
</script>
