import { type ToastMessage, ToastMessageType } from "~/types/ToastMessage";

export const useToastMessagesStore = defineStore("toastMessages", ()=>{
    const toastsMessages = ref<Array<ToastMessage>>([]);
    const addToastMessage = (text:string, type:ToastMessageType = ToastMessageType.info)=>{
        const toast:ToastMessage = { text, type };
        toastsMessages.value.push(toast);
    };
    const removeFirst = ()=>{
        toastsMessages.value.shift();
    };
    return { toastsMessages, addToastMessage, removeFirst };
});
