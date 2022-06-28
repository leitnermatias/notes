<script lang="ts">
    export let value: string;
    export let placeholder = "";
</script>

<input type="text" bind:value placeholder={placeholder}>

<style>
    input {
        border: 1px inset black;
        box-shadow: 1px 1px black;
        width: var(--width, 80%);
    }

    input:hover, input:focus {
        border: 1px inset orange;
        outline: none;
    }
</style>