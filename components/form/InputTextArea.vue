<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <textarea
      :id="name"
      :value="modelValue"
      :name="name"
      rows="3"
      class="shadow-sm block focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md w-full p-2"
      @input="emit('update:modelValue', $event.target.value)"
    />
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
