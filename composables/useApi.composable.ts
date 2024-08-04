import type { Task } from "~/types/Task";
import type { Category } from "~/types/Category";

export const useApi = ()=>{
    return {
        categories: {
            get: ()=>$fetch<Category[]>("/api/categories", { method: "GET" }),
        },
        task: {
            post: (payload:Task)=>{
                return $fetch<Task>("/api/tasks", { method: "POST", body: payload });
            },
            put: (payload:Task)=>{
                return $fetch<Task>(`/api/tasks/${payload.id}`, { method: "PUT", body: payload });
            },
            delete: (id:number)=>{
                return $fetch(`/api/tasks/${id}`, { method: "DELETE" });
            },
            getAll: ()=>{
                return $fetch<Task[]>("/api/tasks", { method: "GET" });
            },
        },
    };
};
