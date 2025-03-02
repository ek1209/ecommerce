<template>
  <Header />
  <Hero />
  <Categories />
</template>
<script setup>

// const cartItemsCount = ref(0);
const email = ref('');

const featuredProducts = ref([
  {
    id: 1,
    name: 'Hydrating Facial Serum',
    brand: 'Glow Essentials',
    price: 38.99,
    discount: 0,
    isNew: true,
    rating: 5,
    reviewCount: 127,
    imageUrl: '/api/placeholder/300/300'
  },
  {
    id: 2,
    name: 'Vitamin C Brightening Cream',
    brand: 'Pure Beauty',
    price: 45.99,
    discount: 15,
    isNew: false,
    rating: 4,
    reviewCount: 84,
    imageUrl: '/api/placeholder/300/300'
  },
  {
    id: 3,
    name: 'Gentle Exfoliating Scrub',
    brand: 'Natural Glow',
    price: 29.99,
    discount: 0,
    isNew: false,
    rating: 5,
    reviewCount: 62,
    imageUrl: '/api/placeholder/300/300'
  },
  {
    id: 4,
    name: 'Matte Lipstick Collection',
    brand: 'Color Pop',
    price: 24.99,
    discount: 10,
    isNew: false,
    rating: 4,
    reviewCount: 152,
    imageUrl: '/api/placeholder/300/300'
  }
]);

const blogPosts = ref([
  {
    id: 1,
    title: '10 Skincare Tips for Winter',
    excerpt: 'Keep your skin hydrated and glowing during the cold winter months with these expert tips.',
    category: 'Skincare',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Clean Beauty',
    excerpt: 'Learn about ingredients to avoid and how to build an effective clean beauty routine.',
    category: 'Clean Beauty',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 3,
    title: '5-Minute Makeup for Busy Mornings',
    excerpt: 'Quick and easy makeup techniques for those days when you re short on time.',
    category: 'Makeup',
    imageUrl: '/api/placeholder/400/300'
  }
]);

const addToCart = (product) => {
  // cartItemsCount.value += 1;
  alert(`Added ${product.name} to cart!`);
};

import { useProductsStore } from "@/stores/products.js";
const store = useProductsStore();

useAsyncData("categories", async () =>{
  await store.getCategories()
} 
);


const subscribeNewsletter = () => {
  if (email.value) {
    alert(`Thank you for subscribing with ${email.value}!`);
    email.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
};
</script>
