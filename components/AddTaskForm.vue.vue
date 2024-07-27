<template>
	<div
		class="bg-gray-950 border border-gray-800 rounded-2xl py-6 px-10 flex justify-between gap-4">
		<div class="w-4/5 gap-4 flex flex-col">
			<UInput
				v-model="newTask.title"
				:class="{ 'border-red-500': error }"
				@blur="validateTitle"
				placeholder="Title" />
			<UTextarea v-model="newTask.description" />
			<USelectMenu
				v-model="selectedCategories"
				:options="options"
				placeholder="Select a category"
				searchable
				searchable-placeholder="Search by name"
				option-attribute="name"
				by="id"
				multiple
				:search-attributes="['name']">
				<template #option="{ option: category }">
					<span>
						{{ category.name }}
					</span>
				</template>
			</USelectMenu>
			<UButton
				:ui="{ rounded: 'rounded-full' }"
				@click="submitTask"
				class="w-fit"
				>Add task</UButton
			>
		</div>

		<div>
			<UButton
				color="gray"
				:ui="{ rounded: 'rounded-full' }"
				class="w-fit"
				@click="$emit('close')"
				>Close</UButton
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, defineEmits, onMounted } from "vue";
	import type { Task } from "@/types/Task";
	import { useTasksStore } from "@/stores/tasks";
	import type { Category } from "@/types/Category";

	const tasksStore = useTasksStore();
	const { categories } = storeToRefs(tasksStore);

	const emit = defineEmits(["close"]);
	const error = ref(false);
	const fetchCategories = async () => {
		await tasksStore.fetchCategories();
	};

	const options = ref(categories);
	const selected = ref([]);
	const selectedCategories = ref<Category[]>([]);

	const newTask = ref({
		title: "",
		description: "",
		completed: false,
		categories: [] as number[],
	} as Task);

	watch(selectedCategories, (newSelection) => {
		const ids = newSelection.map((selection) => selection.id);
		newTask.value.categories = ids;
	});

	const validateTitle = () => {
		error.value = !newTask.value.title.trim();
	};

	const submitTask = async () => {
		validateTitle();
		if (error.value) return;
		console.log("submitTask", newTask.value);
		emit("close", false);
		await tasksStore.addTask(newTask.value);
	};

	onMounted(() => {
		fetchCategories();
	});
</script>

<style></style>
