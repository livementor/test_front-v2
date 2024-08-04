<script setup lang="ts">
  import TaskList from '~/components/TaskList.vue';
  import ToastMessageContainer from '~/components/ToastMessageContainer.vue';

  //Those lines to avoid a fontawesome bug during initial rendering where all icons are displayed bigger than they should.
  //Ref : https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t
  import '@fortawesome/fontawesome-svg-core/styles.css';
  import { config } from '@fortawesome/fontawesome-svg-core';
  config.autoAddCss = false;
</script>

<template>
  <main class="max-w-screen-md mx-auto p-5">
      <ToastMessageContainer />
      <TaskList />
  </main>
</template>

<style scoped lang="scss">
  main {
    position: relative;
  }
</style>