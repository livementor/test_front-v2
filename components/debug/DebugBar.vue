<script setup lang="ts">
import { MkrPopUp } from '@livementor/mikado_reborn/src/components/PopUp'
import { MkrContainedButton } from '@livementor/mikado_reborn/src/components/Button'
import { MkrCard } from '@livementor/mikado_reborn/src/components/Card'
import { useTasksStore } from '~/stores/tasks'

const store = useTasksStore()
</script>

<template>
  <div class="fixed bottom-0 right-0 p-4">
    <mkr-pop-up placement="left">
      <template #anchor>
        <mkr-contained-button>DEBUG</mkr-contained-button>
      </template>
      <mkr-card class="p-4 flex gap-4">
        <mkr-contained-button @click="store.seed()">
          Load fake data
        </mkr-contained-button>
        <mkr-contained-button @click="store.clear()">
          Reset
        </mkr-contained-button>
      </mkr-card>
    </mkr-pop-up>
  </div>
</template>
