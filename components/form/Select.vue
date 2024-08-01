<template>
  <div class="w-full">
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <select
      :value="modelValue"
      :name="name"
      class="block focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm p-1 w-1/4"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  name?: string
  type?: string
  modelValue: string
  options: { label: string, value: string | number }[]
}>()
const emit = defineEmits(['update:modelValue'])
</script>
