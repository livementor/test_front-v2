<template>
	<div class="container mx-auto py-24">
		<h1 class="font-Oswald font-bold text-4xl py-6 text-primary text-center">
			To-Do List
		</h1>

		<div class="flex gap-x-4">
			<div class="w-1/2">
				<div class="flex flex-col gap-y-4 mb-4">
					<p class="font-Oswald text-xl py-4 px-10">In progress</p>
					<Card v-for="task in inProgressTasks" :key="task.id" :task="task" />
				</div>
				<AddTaskForm @close="showAddTask = false" v-if="showAddTask" />
				<button @click="showAddTask = !showAddTask" class="text-primary px-10">
					+ Add Tasks
				</button>
			</div>
			<div class="w-1/2 flex flex-col gap-y-4 mb-4">
				<p class="font-Oswald text-xl py-4 px-10">Done</p>
				<Card v-for="task in doneTasks" :key="task.id" :task="task" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Card from "@/components/Card.vue";
	import AddTaskForm from "@/components/AddTaskForm.vue";
	import { onMounted, ref, computed } from "vue";
	import { useTasksStore } from "@/stores/tasks";
	import { storeToRefs } from "pinia";

	const tasksStore = useTasksStore();
	const { tasks } = storeToRefs(tasksStore);

	const fetchTasks = async () => {
		await tasksStore.fetchTasks();
	};

	const inProgressTasks = computed(() => {
		return tasks.value.filter((task) => !task.completed);
	});

	const doneTasks = computed(() => {
		return tasks.value.filter((task) => task.completed);
	});

	const showAddTask = ref(false);
	
	onMounted(() => {
		fetchTasks();
	});
</script>
