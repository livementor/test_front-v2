<script setup lang="ts">
import ToastMessage from './ToastMessage.vue';

    const tmStore = useToastMessagesStore();
</script>

<template>
    <section class="toast-message-container">
        <ToastMessage v-for="toast in tmStore.toastsMessages" :toast="toast"/>
    </section>
</template>

<style scoped lang="scss">
    .toast-message-container {
        position: absolute;
        width: 100%;
    }
</style>