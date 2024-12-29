<script setup lang="ts">
import { MkrBadge } from '@livementor/mikado_reborn/src/components/Badge'
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
    <mkr-badge type="primary">
      Basse
    </mkr-badge>
  </template>

  <template v-if="priority === Priority.Medium">
    <mkr-badge type="success">
      Normal
    </mkr-badge>
  </template>

  <template v-if="priority === Priority.High">
    <mkr-badge type="danger">
      Urgent
    </mkr-badge>
  </template>
</template>

<style scoped>

</style>
