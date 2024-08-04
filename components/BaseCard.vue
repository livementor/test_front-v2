<script setup></script>

<template>
    <div class="card">
        <slot />
    </div>
</template>

<style scoped lang="scss">
    .card {
        background-color: white;
        border: 0.1rem solid lightgrey;
        border-radius: 1rem;
        padding: 0.5rem;
        box-sizing: border-box;
    }
</style>
