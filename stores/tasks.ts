import { defineStore } from "pinia";
import { useApi } from "../composables/useApi.composable.js";
import type { Task } from "@/types/Task"
import type { Category } from "@/types/Category"

export const useTasksStore = defineStore("tasks", {
	state: () => ({
		tasks: [],
		categories: []
	}),

	actions: {
		async fetchTasks() {
			const { task } = useApi()
			try {
				this.tasks = await task.getAll()
			} catch (error) {
				console.error("Failed to fetch tasks:", error)
			}
		},
		async fetchCategories() {
			const { categories } = useApi()
			try {
				this.categories = await categories.get()
			} catch (error) {
				console.error("Failed to fetch categories:", error)
			}
		},
		async addTask(newTask: Task) {
			const { task } = useApi()
			try {
				const createdTask = await task.post(newTask)
				this.tasks.push(createdTask)
			} catch (error) {
				console.error("Failed to add task:", error)
			}
		},
		async updateTask(editTask: Task) {
			const { task } = useApi()
			try {
				const editedTask = await task.put(editTask)
				this.tasks = this.tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
			}catch(error) {
				console.error("Failed to edit task:", error)
			}	
		},
		async deleteTask(id: number) {
			const { task } = useApi()
			try {
				await task.delete(id)
				this.tasks = this.tasks.filter((task) => task.id !== id)
			} catch (error) {
				console.error("Failed to delete task:", error)
			}
		}
	},
	getters: {
		getTasks: (state) => state.tasks,
	},
});
