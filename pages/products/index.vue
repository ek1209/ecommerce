<template>
  <div class="container mx-auto py-8">
    <!-- Sorting Controls -->
    <div class="flex flex-col sm:flex-row sm:justify-between items-center mb-6 w-full">
      <div class="w-full sm:w-1/4 mb-4 sm:mb-0">
        <!-- Search -->
        <UInput
          v-model="searchQuery"
          size="xl"
          color="primary"
          variant="outline"
          placeholder="Search..."
          @input="debouncedRefresh"
          @keyup.enter="triggerSearch"
        />
      </div>
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-1/2 justify-end">
        <Dropdown
          placeholder="Select Filter"
          v-model="sortBy"
          :data="orderItems"
        />
        <Dropdown
          placeholder="Select Order"
          v-model="order"
          :data="sortItems"
        />
      </div>
    </div>

    <!-- Products Display -->
    <div v-if="pending" class="text-center py-8">
      <Loader :is-loading="pending" />
    </div>
    <TransitionGroup v-else-if="products?.products" name="list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div
        v-for="product in products?.products"
        :key="product.id"
        class="bg-white cursor-pointer overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
        @click="navigateTo(`/products/${product.id}`)"
      >
        <Card :product="product" />
      </div>
    </TransitionGroup>

    <!-- Loading and Error States -->
    <div v-else class="text-center py-8">
      <p class="text-gray-500">No products found or error occurred.</p>
      <p v-if="error" class="text-red-500">{{ error.message }}</p>
      <button v-if="error" @click="refresh" class="mt-4 text-blue-600">Retry</button>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center my-10">
      <UPagination
        size="xl"
        v-model="page"
        :page-count="pageCount"
        :total="products?.total || 0"
      />
      <div v-if="searchQuery" class="text-center text-gray-500 mt-2">
        Pagination unavailable during search.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { ref, computed, watch } from "vue";
import { useDebounceFn, useEventListener } from '@vueuse/core'

useHead({
  title: "Glow - Products",
});

// Dropdown Options
const orderItems = [
  { name: "Title", value: "title" },
  { name: "Rating", value: "rating" },
];

const sortItems = [
  { name: "Ascending", value: "asc" },
  { name: "Descending", value: "desc" },
];

// State Setup
const store = useProductsStore();
const limit = ref(16);
const page = ref(Number(useRoute().query.page) || 1);
const order = ref("asc");
const sortBy = ref("title");
const searchQuery = ref("");

// Fetch Products with Optimization
const { data: products, error, refresh, pending } = useAsyncData(
  `products-${page.value}-${sortBy.value}-${order.value}-${searchQuery.value}`,
  async () => {
    const skip = (page.value - 1) * limit.value;
    try {
      if (searchQuery.value) {
        await store.getProductSearch(searchQuery.value);
      } else {
        await store.getProductList(limit.value, skip, sortBy.value, order.value);
      }
      if (!store.products || !store.products.products) {
        throw new Error("Invalid data returned from store");
      }
      return store.products;
    } catch (err) {
      console.error("Error in useAsyncData:", err);
      return null;
    }
  },
  {
    watch: [page, sortBy, order, searchQuery],
    server: true,
    lazy: false,
    cache: 'force-cache',
    expires: 60 * 60 * 1000, // Cache for 1 hour
  }
);

// Debounced Refresh for Real-Time Search
const debouncedRefresh = useDebounceFn(refresh, 300);

// Reset Page on Filter/Search Change
watch([sortBy, order, searchQuery], () => {
  if (page.value !== 1) {
    page.value = 1;
  }
});

// Sync Pagination with URL
const router = useRouter();
watch(page, (newPage) => {
  router.push({ query: { ...useRoute().query, page: newPage } });
});

// Trigger Search Manually
const triggerSearch = () => {
  console.log("Triggering search...");
  refresh();
};

// Computed Page Count
const pageCount = computed(() => Math.ceil(products.value?.total / limit.value) || 1);
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>