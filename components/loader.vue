<template>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div class="w-16 h-16 border-8 border-t-8 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    }
}
</script>