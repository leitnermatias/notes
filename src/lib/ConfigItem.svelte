<script lang="ts">
    import Cross from "./Cross.svelte";
    import Pen from "./Pen.svelte";
    import { createEventDispatcher } from "svelte";

    export let name: string;
    export let canDelete = true;
    export let canEdit = true;

    const dispatch = createEventDispatcher();

    function handleDelete() {
        dispatch('delete')
    }

    function handleEdit() {
        dispatch('edit')
    }
</script>

<div class={$$props.class}>
    <span>{name}</span>
    {#if canDelete || canEdit}
        <div id="actions">
            {#if canEdit}
                <span class="action" on:click={handleEdit}>
                    <Pen width="15px" height="15px"/>
                </span>
            {/if}
            {#if canDelete}
                <span class="action" on:click={handleDelete}>
                    <Cross width="20px" height="20px" />
                </span>
            {/if}
        </div>
    {/if}
</div>


<style>
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding-left: 5px;
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 1px 1px;
        padding: 3px;
        width: 15px;
        height: 15px;
    }

    .action:hover {
        box-shadow: 1px 1px orange;
    }
</style>