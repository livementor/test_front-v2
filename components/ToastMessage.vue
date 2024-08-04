<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton.vue";
import { useToastMessagesStore } from "~/stores/ToastMessageStore";
import { ToastMessageType, type ToastMessage } from "~/types/ToastMessage";

const props = defineProps<{
    toast:ToastMessage
}>();

const toastMessageStore = useToastMessagesStore();

const toastMessageRef = ref<HTMLElement | null>(null);

const closeToastMessage = ()=>{
    clearTimeout(timeout);
    toastMessageStore.removeFirst();
};

const timeout = window.setTimeout(closeToastMessage, 5000);

const colorClass = `toast-message--${ToastMessageType[props.toast.type]}`;
</script>

<template>
    <div
        ref="toastMessageRef"
        class="toast-message"
        :class="{ [colorClass]: true }"
    >
        <span>{{ props.toast.text }}</span>
        <BaseButton @click="closeToastMessage">
            <FontAwesomeIcon :icon="faXmark" />
        </BaseButton>
    </div>
</template>

<style scoped lang="scss">
    .toast-message {
        display: flex;
        justify-content: space-between;
        color: white;
        padding: 0.5rem;
        width: 100%;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        animation: toast-message-in 0.5s ease;
    }

    .toast-message--info {
        background-color:  var(--base-interactive);
    }

    .toast-message--success {
        background-color:  var(--base-green);
    }

    .toast-message--alert {
        background-color:  var(--base-yellow);
    }

    .toast-message--error {
        background-color:  var(--base-red);
    }

    @keyframes toast-message-in {
        from {
            opacity: 0;
            transform: translateY(100%);
        }

        to {
            opacity: 1;
            transform: translateY(0%);
        }
    }
</style>
