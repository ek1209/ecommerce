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
const props = defineProps({
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String
  },
  data: {
    type: Array,
  },
});
const selected = ref("");
selected.value = props.modelValue;
watch(selected, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
