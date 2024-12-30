<script setup lang="ts">
import { Priority } from '~/types/Filters'

defineProps({
  priority: {
    type: String as PropType<Priority>,
    required: true,
  },
})
</script>

<template>
  <template v-if="priority === Priority.Low">
    <ui-badge
      label="Basse"
      color="rgb(4, 78, 64)"
      background-color="rgb(255, 215, 122)"
    />
  </template>

  <template v-if="priority === Priority.Medium">
    <ui-badge
      label="Normal"
      color="white"
      background-color="rgb(0, 119, 98)"
    />
  </template>

  <template v-if="priority === Priority.High">
    <ui-badge
      label="Urgent"
      color="rgb(255, 255, 255)"
      background-color="rgb(191, 43, 13)"
    />
  </template>
</template>

<style scoped>

</style>
