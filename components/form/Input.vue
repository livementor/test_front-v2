<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :value="modelValue"
      :type="type"
      :name="name"
      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      @input="emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  name: string
  type?: string
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
</script>
