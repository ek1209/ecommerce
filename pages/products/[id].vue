<template>
  <div class="container mx-auto bg-white rounded-lg overflow-hidden my-8">
    <!-- Loading and Error States -->
    <div v-if="pending" class="p-6 text-center text-gray-500"><Loader :is-loading="pending"/></div>
    <div v-else-if="error" class="p-6 text-center text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else class="md:flex">
      <!-- Product Image Section -->
      <div class="md:w-1/2 p-6">
        <div class="mb-4 bg-gray-100 rounded-md overflow-hidden">
          <div class="h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <Transition name="fade">
              <NuxtImg
                :key="selectedImage"
                :src="selectedImage"
                alt="Selected Product Image"
                class="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </Transition>
          </div>
        </div>

        <!-- Thumbnail Images -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div
            v-for="(image, index) in details?.images"
            :key="index"
            @click="selectImage(image)"
            class="h-20 bg-gray-100 rounded-md overflow-hidden p-1 cursor-pointer border-2"
            :class="{ 'border-blue-500': selectedImage === image, 'border-transparent': selectedImage !== image }"
          >
            <NuxtImg
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ details.title }}</h1>
            <div class="flex items-center mb-4">
              <div v-if="details.rating" class="text-yellow-400 mr-1">
                
                <span v-for="n in Math.floor(details.rating)" :key="n">★</span>
                <span v-if="details.rating % 1 !== 0">☆</span>
              </div>
              <span class="text-gray-500">({{ details.rating }})</span>
            </div>
          </div>
          <button class="text-gray-400 hover:text-red-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-gray-900">{{ formattedPrice }}</span>
          <span class="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Save {{ details.discountPercentage }}%
          </span>
        </div>

        <!-- Color Options -->
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Color</h3>
          <div class="flex space-x-2">
            <div
              v-for="(color, index) in colors"
              :key="index"
              @click="selectedColor = color"
              class="h-8 w-8 rounded-full cursor-pointer ring-2 ring-offset-1"
              :class="[color.bg, { 'ring-blue-500': selectedColor === color, 'ring-transparent': selectedColor !== color }]"
            ></div>
          </div>
        </div>

        <!-- Quantity Selector -->
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
          <div class="flex items-center border border-gray-300 rounded-md w-32">
            <button
              @click="decrement"
              class="px-3 py-1 border-r border-gray-300 text-gray-500 hover:bg-gray-100"
            >
              −
            </button>
            <input
              v-model="quantity"
              type="number"
              class="w-full p-1 text-center focus:outline-none"
              min="1"
            />
            <button
              @click="increment"
              class="px-3 py-1 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            class="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-150"
          >
            Add to Cart
          </button>
          <button
            class="flex-grow bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-150"
          >
            Buy Now
          </button>
        </div>

        <!-- Shipping Info -->
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center text-sm text-gray-500 mb-2">
            <svg class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {{ details.shippingInformation }}
          </div>
          <div class="flex items-center text-sm text-gray-500">
            <svg class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {{ details.warrantyInformation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';

useHead({
  title: "Glow - Products Details",
});

// Route and Store Setup
const route = useRoute();
const store = useProductsStore();

// Fetch Product Details with Caching
const { data, pending, error } = useAsyncData(
  `product-details`,
  () => store.getProductDetails(route.params.id),
  {
    server: true,
    cache: 'force-cache',
    expires: 60 * 60 * 1000, // Cache for 1 hour
  }
);

// Product Details
const details = computed(() => store.productDetails || {});

// Image Selection
const selectedImage = ref(details.value?.thumbnail || '');
watch(() => details.value?.thumbnail, (newThumbnail) => {
  selectedImage.value = newThumbnail; // Reset on data change
});
const selectImage = (image) => {
  selectedImage.value = image;
};

// Price Formatting
const formattedPrice = computed(() => `$${details.value?.price || '0.00'}`);

// Color Options (Mocked since API doesn't provide colors)
const colors = [
  { bg: 'bg-black' },
  { bg: 'bg-gray-400' },
  { bg: 'bg-blue-600' },
  { bg: 'bg-red-500' },
];
const selectedColor = ref(colors[0]);

// Quantity Selector
const quantity = ref(1);
const increment = () => quantity.value++;
const decrement = () => {
  if (quantity.value > 1) quantity.value--;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>