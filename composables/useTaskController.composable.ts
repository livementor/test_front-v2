import type { Task } from "~/types/Task";

export const useTaskController = ()=>{
    const api = useApi();

    return {
        loadAll: async ():Promise<Array<Task>>=>{
            return await api.task.getAll();
        },
        createTask: async (task:Task):Promise<Task>=>{
            return await api.task.post(task);
        },      
        toggleTaskCompletion: async (task:Task, force?:boolean):Promise<Task>=>{
            const completed = force === undefined ? !task.completed : force;
            if (completed === task.completed) {
                return task;
            }
            task.completed = completed;
            return await api.task.put(task);
        },        
        editTask: async (task:Task, title?:string, description?:string|null):Promise<Task>=>{
            if (!title && !description) {
                return task;
            }
            const newTask = {...task};
            newTask.categories = [...task.categories];
            newTask.title = title ?? task.title;
            if (description === undefined) {    
                newTask.description = task.description;
            } else if (description === null) {
                newTask.description = undefined;
            } else {
                newTask.description = description;
            }
            return await api.task.put(newTask);
        },
        deleteTask: async (task:Task):Promise<number|null|undefined>=>{
            return await api.task.delete(task.id);
        }
    }
}