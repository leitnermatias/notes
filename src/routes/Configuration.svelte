<script lang="ts">
    import { getCategories, deleteCategory, editCategory, addCategory } from "../service/notes";
    import ConfigItem from "../lib/ConfigItem.svelte";
    import Popup from "../lib/Popup.svelte";
    import Button from "../lib/Button.svelte";
    import TextInput from "../lib/TextInput.svelte";

    let showAddCategoryPopup = false;
    let showEditCategoryPopup = false;
    let activeCategory = null;

    let newCategoryName = "";

    let categories = getCategories();

    function handleDeleteCategory(name: string) {
        deleteCategory(name)
        categories = getCategories();
    }

    function handlePopup(type: string, payload: any) {
        switch (type) {
            case "editCategory":
                activeCategory = payload;
                showEditCategoryPopup = true;
                break;
            case "addCategory":
                showAddCategoryPopup = true;
                break;
            default:
                activeCategory = null;
                showEditCategoryPopup = false;
                showAddCategoryPopup = false;
                newCategoryName = "";
                break;
        }
    }


    function handleEditCategory() {
        editCategory(activeCategory.name, newCategoryName);
        categories = getCategories();
        handlePopup("cancel", null)
    }

    function handleAddCategory() {
        addCategory(newCategoryName);
        categories = getCategories();
        handlePopup("cancel", null);
    }

</script>

<template>
    <div id="main">
        <p id="title">Configuration</p>
        <div class="config-section">
            <p class="section-title">Categories</p>
            <div class="section-actions">
                <Button on:click={() => handlePopup("addCategory", null)}>Add category</Button>
            </div>
            <div class="section-display">
                {#each categories as category}
                    <ConfigItem class="section-options" on:delete={() => handleDeleteCategory(category.name)} on:edit={() => handlePopup("editCategory", category)} name={category.name}></ConfigItem>
                {/each}
            </div>
        </div>
    </div>
    {#if showEditCategoryPopup}
        <Popup --width="40%" --height="50%" --body-height="33%" --footer-height="33%" --header-height="33%">
            <div id="edit-category-header" slot="header">
                <h3>Edit category</h3>
            </div>
            <div id="edit-category-body" slot="body">
                <label for="name">Name</label>
                <TextInput bind:value={newCategoryName} placeholder={activeCategory.name}/>
            </div>
            <div id="edit-category-footer" slot="footer">
                <Button on:click={() => handlePopup("cancel", null)}>Cancel</Button>
                <Button on:click={handleEditCategory}>Edit</Button>
            </div>
        </Popup>
    {:else if showAddCategoryPopup}
        <Popup --width="40%" --height="50%" --body-height="33%" --footer-height="33%" --header-height="33%">
            <div id="add-category-header" slot="header">
                <h3>Add category</h3>
            </div>
            <div id="add-category-body" slot="body">
                <label for="name">Name</label>
                <TextInput bind:value={newCategoryName} placeholder="Enter a name"/>
            </div>
            <div id="add-category-footer" slot="footer">
                <Button on:click={() => handlePopup("cancel", null)}>Cancel</Button>
                <Button on:click={handleAddCategory}>Save</Button>
            </div>
        </Popup>
    {/if}
</template>

<style>
    #main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #title {
        font-weight: 300;
        color: rgba(39, 39, 39, 0.801);
        font-size: 30px;
    }

    .config-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 75%;
        align-items: center;
    }

    .section-display {
        display: grid;
        grid-template-columns: repeat(4, 24%);
        width: 100%;
        height: 200px;
        align-items: start;
        overflow-y: auto;
        gap: 10px;
        border: 1px inset gray;
        box-shadow: 1px 1px black;
    }

    :global(.section-options) {
        padding: 5px;
        font-family: 'Courier New', Courier, monospace;
        border: 1px inset black;
        margin: 5px;
    }

    .section-title {
        font-size: 20px;
        color: rgb(32, 32, 32);
        font-weight: 400;
        border-bottom: 5px solid rgba(28, 188, 252, 0.377);
        border-radius: 5px;
        padding-bottom: 5px;
    }

    .section-actions {
        display: flex;
        margin-bottom: 10px;
        justify-content: start;
        width: 100%;
    }

    #edit-category-header {
        display: flex;
        justify-content: center;
    }

    #edit-category-body {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    #edit-category-footer {
        display: flex;
        justify-content: space-evenly;
    }

    #add-category-header {
        display: flex;
        justify-content: center;
    }

    #add-category-body {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    #add-category-footer {
        display: flex;
        justify-content: space-evenly;
    }

</style>