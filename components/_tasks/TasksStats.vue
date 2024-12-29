<script setup lang="ts">
import { MkrBadge } from '@livementor/mikado_reborn/src/components/Badge'

const store = useTasksStore()

const stats = computed(() => {
  const total = store.tasks.length
  const completed = store.tasks.filter(task => task.completed).length
  const pending = total - completed
  return { total, completed, pending }
})
</script>

<template>
  <div class="flex gap-4">
    <span class="flex gap-2">
      <mkr-badge type="info-light">{{ stats.total }}</mkr-badge> Total
    </span>
    <span class="flex gap-2">
      <mkr-badge type="danger-light">{{ stats.pending }}</mkr-badge> En cours
    </span>
    <span class="flex gap-2">
      <mkr-badge type="success">{{ stats.completed }}</mkr-badge> Terminées
    </span>
  </div>
</template>
