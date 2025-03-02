<template>
    <div class="mx-auto bg-white fixed top-0  w-full z-50 border-b border-gray-100">
      <div class="top-nav border-b border-gray-50 px-4">
        <div class="container h-20 mx-auto flex items-center justify-between gap-x-16">
          <div class="flex items-center space-x-4 md:w-80" @click="gotToHomePage">
            <NuxtImg src="../public/logo.jpg" alt="Glow" class="rounded-full h-14 cursor-pointer" height="56px" width="56px"/>
            <span class="text-2xl font-bold text-blue-500">Glow</span>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { navigateTo } from 'nuxt/app';

const gotToHomePage = () => {
  navigateTo("/")
}
 </script>
  