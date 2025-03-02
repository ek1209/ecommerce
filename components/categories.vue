<template>
  <section class="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4">
      <h2
        class="text-2xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight"
      >
        Shop By Category
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <a
          v-for="(category, index) in categories"
          :key="category.id"
          :href="'/category/' + category.slug"
          class="group block p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex flex-col items-center">
            <div
              :class="[
                'w-16 h-16 md:w-20 md:h-20',
                'rounded-full',
                'flex items-center justify-center',
                'text-2xl md:text-3xl font-bold',
                'bg-' + colors[index % colors.length] + '-100',
                'text-' + colors[index % colors.length] + '-800'
              ]"
            >
              {{ category.name[0].toUpperCase() }}
            </div>
            <h3
              class="mt-3 text-base md:text-lg font-semibold text-center text-gray-800 group-hover:text-indigo-600"
            >
              {{ category.name }}
            </h3>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProductsStore } from "@/stores/products.js";
import { computed } from "vue";

const store = useProductsStore();
const categories = computed(() => store.categories);

// Define an array of colors for the category icons
const colors = ["red", "blue", "green", "yellow", "purple", "pink", "indigo", "teal"];
</script>