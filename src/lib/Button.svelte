<script lang="ts">
</script>

<template>
    <button style={$$props.style} class={$$props.class} on:click><slot></slot></button>
</template>

<style>
button {
    padding: 5px;
    background-color: var(--background-color, white) ;
    border: 1px solid var(--border-color, rgb(0, 153, 255));
    width: var(--width);
    height: var(--height);
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--font-size);
}

button:hover {
    border: 1px solid var(--hover-color, orange);
}
</style>