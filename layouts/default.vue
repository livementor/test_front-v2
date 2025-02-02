<template>
    <div class="grid grid-cols-[70px_1fr] grid-rows-1 w-full h-full">
        <div class="col-start-1 bg-neutral-light row-span-1 col-span-1"></div>
        <div class="col-start-2 bg-white row-span-1 col-span-1">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>