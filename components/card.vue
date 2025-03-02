<template>
     <div class="h-48 bg-gray-200 flex items-center justify-center">
          <NuxtImg
            :src="product.thumbnail"
            alt="Product"
            class="max-h-full object-cover"
          />
        </div>
        <div class="p-4" @click="navigateTo(`products/${product.id}`)">
          <h3 class="text-gray-800 font-medium text-lg mb-1">
            {{ product.title }}
          </h3>
          <p class="text-gray-500 text-sm mb-2">{{ product.category }}</p>
          <p class="text-gray-900 font-bold text-xl mb-3">
            {{ product.price }}
          </p>
          <div class="flex items-center mb-3">
            <div class="text-yellow-400 mr-1">
              <span v-for="n in Math.floor(product.rating)" :key="n">★</span>
              <span v-if="product.rating % 1 !== 0">☆</span>
            </div>
            <span class="text-gray-500 text-sm">{{ product.stock }}</span>
          </div>
        </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object
    }
})
</script>