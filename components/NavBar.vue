<script setup lang="ts">
import { MkrContainedButton } from '@livementor/mikado_reborn/src/components/Button'
</script>

<template>
  <header class="w-full mb-16 rounded-lg">
    <nav class="bg-white p-8 flex justify-between align-middle items-center">
      <div class="flex gap-4 items-center">
        <img
          class="h-16 w-16"
          src="https://www.livementor.com/wpapp/themes/mikado_reborn_wp/static/images/logo-menu.svg"
          alt="LiveMentor Logo"
        >
        <h1 class="text-4xl font-bold">
          LiveMentor TodoList
        </h1>
      </div>

      <div class="flex gap-4">
        <mkr-contained-button
          theme="neutral"
          icon="sun"
          size="medium"
        />
        <help-modal />
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
