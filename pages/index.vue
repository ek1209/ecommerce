<template>
  <Header />
  <Hero />
  <Categories />
</template>
<script setup>

import { useProductsStore } from "@/stores/products.js";
const store = useProductsStore();

useAsyncData("categories", async () =>{
  await store.getCategories()
} 
);
</script>
