<script setup lang="ts">
import { faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Color from "~/types/Color.js";

const props = defineProps<{
    title:string
    confirmationText:string
    open:boolean
    onButtonClick:(confirmation:boolean)=>void
}>();

const confirmationDialog = ref<HTMLDialogElement>();

watchEffect(()=>{
    if (!confirmationDialog.value) {
        return;
    }

    if (props.open) {
        confirmationDialog.value.showModal();
    }
    else {
        confirmationDialog.value.close();
    }
});

const onButtonClickLocal = async (confirmation:boolean)=>{
    props.onButtonClick(confirmation);
};
</script>

<template>
    <dialog
        ref="confirmationDialog"
        class="confirmation-dialog"
    >
        <div class="confirmation-dialog__content">
            <h2 class="confirmation-dialog__title">
                {{ props.title }}
            </h2>
            <span>{{ props.confirmationText }}</span>
            <div class="confirmation-dialog__buttons">
                <BaseButton
                    label="Cancel"
                    :color="Color.red"
                    :show-label="true"
                    @click="() => onButtonClickLocal(false)"
                >
                    <FontAwesomeIcon :icon="faArrowRotateLeft" />
                </BaseButton>
                <BaseButton
                    label="Confirm"
                    :color="Color.green"
                    :show-label="true"
                    @click="() => onButtonClickLocal(true)"
                >
                    <FontAwesomeIcon :icon="faCheck" />
                </BaseButton>
            </div>
        </div>
    </dialog>
</template>

<style scoped lang="scss">
    .confirmation-dialog__content {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: white;
    }

    .confirmation-dialog__title {
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .confirmation-dialog__buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }
</style>
