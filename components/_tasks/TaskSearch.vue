<script setup lang="ts">
import { MkrTextfield } from '@livementor/mikado_reborn/src/components/Textfield'

const store = useTasksStore()
</script>

<template>
  <div class="mb-8">
    <mkr-textfield
      v-model="store.filters.query"
      placeholder="Rechercher une tâche"
      type="text"
      icon-name="search"
    />
  </div>
</template>

<style scoped>

</style>
