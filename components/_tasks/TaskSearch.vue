<script setup lang="ts">
import { MkrTextfield } from '@livementor/mikado_reborn/src/components/Textfield'
import { MkrContainedButton } from '@livementor/mikado_reborn/src/components/Button'

const store = useTasksStore()
</script>

<template>
  <div class="flex gap-4 mb-8">
    <mkr-textfield
      v-model="store.filters.query"
      placeholder="Rechercher une tâche"
      type="text"
      icon-name="search"
    />
    <mkr-contained-button
      size="medium"
      theme="danger-light"
      icon="trash"
      icon-side="right"
    >
      Effacer
    </mkr-contained-button>
  </div>
</template>

<style scoped>

</style>
