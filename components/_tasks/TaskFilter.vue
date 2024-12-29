<script setup lang="ts">
import { MkrDropdown } from '@livementor/mikado_reborn/src/components/Dropdown'
import { MkrIcon } from '@livementor/mikado_reborn/src/components/Icon'
import { Priority, SortBy, Status } from '~/types/Filters'
import { enumToDropdownItems } from '~/utils/enumToDropdown'

const store = useTasksStore()
const statusDropdownItems = enumToDropdownItems(Status, { label: 'Tous les statuts', value: '' })
const priorityDropdownItems = enumToDropdownItems(Priority, { label: 'Toutes les priorités', value: '' })
const categoryDropdownItems = [
  { label: 'Toutes les catégories', value: '' },
  ...store.categories.map(category => ({
    label: category.name,
    value: category.id,
  })),
]
const sortByDropdownItems = enumToDropdownItems(SortBy)
</script>

<template>
  <div class="flex gap-4 mb-8">
    <div class="flex w-2/3 gap-4">
      <mkr-dropdown
        v-model="store.filters.status"
        :items="statusDropdownItems"
        placeholder="Tous les statuts"
        class="w-1/3"
      />

      <mkr-dropdown
        v-model="store.filters.priority"
        :items="priorityDropdownItems"
        placeholder="Toutes les priorités"
        class="w-1/3"
      />

      <mkr-dropdown
        v-model="store.filters.category"
        :items="categoryDropdownItems"
        placeholder="Toutes les catégories"
        class="w-1/3"
      />
    </div>

    <div class="flex w-1/3 gap-4 items-center justify-end">
      <mkr-dropdown
        v-model="store.filters.sortBy"
        :items="sortByDropdownItems"
        placeholder="Trier par :"
        class="w-1/2"
      />
      <mkr-icon name="arrow-narrow-bottom" />
    </div>
  </div>
</template>
