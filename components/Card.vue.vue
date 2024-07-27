<template>
	<div
		class="bg-gray-950 border border-gray-800 rounded-2xl py-6 px-10 hover:bg-gradient-to-r from-primary to-gray-800 relative"
		:class="{ 'opacity-30': task.completed }">
		<div class="flex justify-end"></div>
		<di class="flex justify-between items-center">
			<div class="w-4/5">
				<div v-if="!showEdit" class="gap-2 flex">
					<div>
						<div class="italic text-xs">
							<p v-if="daysSinceCreated === 0">Created today</p>
							<p v-else>Created {{ daysSinceCreated }} days ago</p>
						</div>

						<h2 class="text-lg">{{ task.title }}</h2>
						<p class="text-sm">{{ task.description }}</p>
						<div class="gap-2 flex mt-2">
							<UBadge
								:color="category.color ?? 'primary'"
								:key="category.id"
								variant="solid"
								v-for="category in fetchedCategories"
								>{{ category.name }}</UBadge
							>
						</div>
					</div>
				</div>
				<div v-else class="flex flex-col gap-4">
					<UInput v-model="task.title" />
					<UTextarea v-model="task.description" />
					<UButton
						:ui="{ rounded: 'rounded-full' }"
						@click="edit(task)"
						class="w-fit"
						>Save</UButton
					>
				</div>
			</div>

			<div class="flex flex-col gap-2 text-xs" v-if="!task.completed">
				<div class="flex gap-2">
					<button @click="showEdit = !showEdit">
						{{ showEdit ? "Close" : "Edit" }}
					</button>
					<button v-if="!showEdit" @click="showAlert = !showAlert">
						Delete
					</button>
				</div>
				<div v-if="!showEdit">
					<button
						class="hover:border-b hover:border-primary"
						@click="task.completed = !task.completed">
						Mark as done
					</button>
				</div>
			</div>
		
			<UAlert v-if="showAlert" title="Are you sure ?" class="absolute bottom-4 right-4 w-1/2" icon="i-heroicons-trash" :close-button="{
					icon: 'i-heroicons-x-mark-20-solid',
					color: 'white',
					variant: 'link',
					padded: false,
				}">
				<template #title="{ title }">
					<span v-html="title" />
				</template>

				<template #description>
					<button class="text-primary"  @click="tasksStore.deleteTask(task.id)">Confirm</button>
				</template>
			</UAlert>
		</di>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from "vue";
	import type { Task } from "@/types/Task";
	import { useTasksStore } from "@/stores/tasks";
	import { useApi } from "@/composables/useApi.composable.js";
	import { calculateDaysBetween } from "~/utils/formatDate";

	const { categories } = useApi();
	const fetchedCategories = ref<Category[]>([]);

	const props = defineProps<{
		task: Task;
	}>();
	const { task } = props;

	onMounted(async () => {
		try {
			fetchedCategories.value = await Promise.all(
				task.categories.map((categoryId) => categories.search(categoryId))
			);
		} catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	});

	const tasksStore = useTasksStore();
	const showEdit = ref(false);
  const showAlert = ref(false)
	const daysSinceCreated = computed(() => calculateDaysBetween(task.createdAt));

	const edit = async (task: Task) => {
		await tasksStore.updateTask(task);
		showEdit.value = false;
	};
</script>
