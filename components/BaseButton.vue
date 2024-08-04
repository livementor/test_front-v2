<script setup lang="ts">
import Color from "~/types/Color";

const props = defineProps<{
    label:string
    showLabel?:boolean
    color?:Color
    nonInteractable?:boolean
}>();

const color = `var(${props.color ?? Color.interactive})`;

const classObject = reactive({
    "base-button--non-interactable": props.nonInteractable,
    "base-button--show-label": props.showLabel,
});
</script>

<template>
    <button
        :title="label"
        class="base-button"
        :class="classObject"
        :style="{ '--color': color }"
    >
        <slot></slot>
        <span v-if="label && showLabel">{{ label }}</span>
    </button>
</template>

<style scoped lang="scss">
    .base-button {
        --color: var(--base-interactive);
        --transition-delay: 0.3s;
        --transition-fn: ease;

        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 0.5rem;
        cursor: pointer;
        color: var(--color);
        border-radius: 100%;
        height: 2rem;
        width: 2rem;
        background-color: white;
        transition:
            background-color var(--transition-delay) var(--transition-fn),
            color var(--transition-delay) var(--transition-fn);

        &:hover {
            color: white;
            background-color: var(--color);
        }
    }

    .base-button--non-interactable {
        pointer-events: none;
    }

    .base-button--show-label {
        width: auto;
        padding: 0.3rem 0.5rem;
        border-radius: 1000px;
    }
</style>
