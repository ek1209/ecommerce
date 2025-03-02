<template>
  <USelect
    :placeholder="placeholder"
    size="xl"
    v-model="selected"
    :options="data"
    option-attribute="name"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits();

const selected = ref(props.modelValue);

// Watch for changes in modelValue to keep local selected in sync
watch(() => props.modelValue, (newValue) => {
  selected.value = newValue;
});

// Emit changes when selected changes
watch(selected, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
