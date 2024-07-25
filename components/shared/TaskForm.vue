<template>
  <div class="flex flex-col gap-3">
    <Input
      type="text"
      placeholder="New todo title..."
      v-model="title"
      @keyup.enter="submit"
    />
    <Textarea
      placeholder="New todo description..."
      v-model="description"
      @keyup.enter="submit"
    />
    <Input
      type="text"
      placeholder="New todo categories (comma separated)..."
      v-model="categories"
      @keyup.enter="submit"
    />
    <Button @click="submit" class="flex-none"> Add </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const props = defineProps({
  title: String,
  description: String,
  categories: String,
});

const emits = defineEmits([
  "update:title",
  "update:description",
  "update:categories",
  "submit",
]);

const title = ref(props.title);
const description = ref(props.description);
const categories = ref(props.categories);

const submit = () => {
  emits("update:title", title.value);
  emits("update:description", description.value);
  emits("update:categories", categories.value);
  emits("submit");

  title.value = "";
  description.value = "";
  categories.value = "";
};
</script>
