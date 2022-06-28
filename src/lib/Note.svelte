<script lang="ts">
    import type { Category } from "src/service/notes";

    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import Star from "./Star.svelte";
    import StarOutline from "./StarOutline.svelte";

    export let name: string;
    export let text: string;
    export let date: Date;
    export let favorite: boolean;
    export let category: Category;

    $: dateObj = new Date(date);
    
    $: dateString =  `${dateObj.toLocaleDateString()}` 

    const dispatch = createEventDispatcher();
    function deleteEvent() {
        dispatch('delete')
    }

    function favoriteEvent() {
        dispatch('favorite')
    }

</script>

<template>
    <div id="main">
        <div id="actions">
            <Button on:click={deleteEvent} --hover-color="red" --border-color="rgb(255, 94, 0)">Remove</Button>
        </div>
        <div id="date-star">
            {#if favorite}
                <span id="star" on:click={favoriteEvent}>
                    <Star width="20px" height="20px"/>
                </span>
            {:else}
                <span id="star" on:click={favoriteEvent}>
                    <StarOutline width="20px" height="20px" />
                </span>
            {/if}
            <span id="date">{dateString}</span>
            <span id="category">{category.name}</span>
        </div>
        <span id="name">{name}</span>
        <p id="text">{text}</p>
    </div>
</template>

<style>
    #main {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        background-color: rgba(103, 198, 253, 0.274);
        border: 2px inset rgba(0, 0, 0, 0.212);
        height: 400px;
        padding: 10px;
        box-shadow: 1px 1px 1px black;
    }
    #name {
        font-family:Arial, Helvetica, sans-serif;
        font-weight: 600;
        color: rgb(44, 43, 43)
    }
    #date-star {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 25px;
        align-self: start;
        border-bottom: 5px solid rgba(0, 0, 255, 0.171);
        border-radius: 5px;
        width: 100%;
        font-family: 'Courier New', Courier, monospace;
    }
    #actions {
        width: 97%;
        height: 5%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0px 10px;
        background-color: rgba(104, 182, 250, 0.349);
        margin-bottom: 15px;
        box-shadow: 1px 1px 1px black;
    }
    #text {
        word-wrap: break-word;
        word-break: break-all;
        overflow-y: auto;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    #star {
        align-self: start;
    }
    #category, #date {
        align-self: center;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        background-color: rgba(149, 149, 245, 0.329);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 0px 10px;
    }
</style>