<template>
    <div class="bg-gradient-to-r from-blue-100 to-purple-100 py-12 md:py-20">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row items-center"
      >
        <div class="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
          >
            Discover Your Natural Beauty
          </h2>
          <p class="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            Premium skincare and makeup products for your daily beauty routine.
          </p>
          <div
            class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
          >
            <button @click="navigateTo('/products')"
              class="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition"
            >
              Shop Now
            </button>
            <button @click="navigateTo('/products')"
              class="border border-pink-600 text-pink-600 hover:bg-pink-50 font-medium py-3 px-6 rounded-lg transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
