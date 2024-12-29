<script setup lang="ts">
import { MkrModal } from '@livementor/mikado_reborn/src/components/Modal'
import { MkrContainedButton } from '@livementor/mikado_reborn/src/components/Button'

const showModal = ref(false)
</script>

<template>
  <div>
    <mkr-modal v-model="showModal">
      <div style="display: flex; flex-direction: column">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
      </div>
    </mkr-modal>
    <mkr-contained-button
      theme="neutral"
      icon="question-mark-circle"
      size="medium"
      @click="showModal = true"
    >
      Aide
    </mkr-contained-button>
  </div>
</template>

<style scoped>

</style>
