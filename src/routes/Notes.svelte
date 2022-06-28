<script lang="ts">
    import Button from "../lib/Button.svelte";
    import Note from "../lib/Note.svelte";
    import Popup from "../lib/Popup.svelte";
    import { addNote, removeNote, getNotes, createNote, searchNote, removeAllNotes, favoriteNote, filterNotes, getCategories } from "../service/notes";
    import { debounce } from "../service/utils";

    let notes = getNotes();
    let categories = getCategories();

    let newNoteName = "";
    let newNoteText = "";
    let newNoteDate = "";
    let newNoteFavorite = false;
    let newNoteCategory = categories[0];

    let showAddNotePopup = false;
    let showRemoveAllPopup = false;

    let searchValue = "";
    let showFavs = false;
    let searchDate = "";

    function handleAddNote() {
        const newNote = createNote(newNoteName, newNoteText, newNoteFavorite, new Date(newNoteDate.replaceAll("-", "/")), newNoteCategory);
        addNote(newNote)
        newNoteName = "";
        newNoteText = "";
        newNoteDate = "";
        newNoteFavorite = false;
        handleCancel();
        notes = getNotes();
    }

    function handleDeleteNote(id: string) {
        removeNote(id)
        notes = getNotes();
    }

    function handleFavorite(id: string, favorite: boolean) {
        favoriteNote(id, favorite);
        notes = getNotes();
    }

    function handleRemoveAll() {
        removeAllNotes();
        notes = getNotes();
        handleCancel();
    }

    function handleCancel() {
        showAddNotePopup = false;
        showRemoveAllPopup = false;
        newNoteName = "";
        newNoteText = "";
        newNoteDate = "";
        newNoteFavorite = false;
    }

    function handleSearch() {
        debounce(() => {
            notes = searchNote(searchValue)
        }, 500)()
    }

    function handleSearchCancel() {
        searchValue = "";
        notes = getNotes();
    }

    function handleShowFavs() {
        if (showFavs) {
            notes = filterNotes((note) => {
                return note.favorite === showFavs;
            })
        } else {
            notes = getNotes()
        }
    }

    function handleShowByDate() {
        if (searchDate !== "") {
            notes = filterNotes((note) => {
                const d1 = new Date(note.date)
                const d2 = new Date(searchDate.replaceAll("-", "/"))
                d1.setHours(0,0,0,0)
                d2.setHours(0,0,0,0)
                return d1.toLocaleDateString() === d2.toLocaleDateString()
            })
        } else {
            notes = getNotes();
        }
    }

</script>

<template>
    <div id="main">
        <div id="actions">
            <Button on:click={() => showAddNotePopup = true}>Add note</Button>
            <Button on:click={() => showRemoveAllPopup = true}>Remove all</Button>
        </div>
        <div id="search">
            <input id="search-bar" type="text" placeholder="Search a note" bind:value={searchValue} on:input={handleSearch}>
            {#if searchValue !== ""}
                <Button on:click={handleSearchCancel}>Cancel</Button>
            {/if}
            <label for="filter-favs">Show favorites</label>
            <input type="checkbox" name="filter-favs" id="filter-favs" bind:checked={showFavs} on:change={handleShowFavs}>
            <div id="date-filter">
                <label for="filter-date">Filter by date</label>
                <input type="date" name="filter-date" id="filter-date" on:change={handleShowByDate} bind:value={searchDate}>
            </div>
        </div>
        <div id="notes">
            {#each notes as note}
                <Note 
                on:delete={() => handleDeleteNote(note.id)} 
                on:favorite={() => handleFavorite(note.id, !note.favorite)}
                name={note.name} 
                text={note.text} 
                date={note.date} 
                category={note.category}
                favorite={note.favorite} />
            {/each}
        </div>
        {#if showAddNotePopup}
            <Popup --width="40%" --height="90%" --body-height="70%" --footer-height="20%" --header-height="10%" >
                <div id="add-note-header" slot="header">
                    <h3>Add note</h3>
                </div>
                <div id="add-note-body" slot="body">
                    <div>
                        <label for="name">Name</label>
                        <input maxlength="20" type="text" name="name" bind:value={newNoteName}>
                    </div>
                    <div>
                        <label for="date">Date</label>
                        <input type="date" name="date" bind:value={newNoteDate}>
                    </div>
                    <div id="favorite-field">
                        <input type="checkbox" name="favorite" bind:checked={newNoteFavorite}>
                        <label for="favorite">Favorite</label>
                    </div>
                    <div>
                        <label for="category">Category</label>
                        <select name="category" bind:value={newNoteCategory}>
                            {#each categories as category}
                                <option value={category}>{category.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div id="text-field">
                        <label for="text">Text</label>
                        <textarea name="text" id="" cols="30" rows="10" bind:value={newNoteText}></textarea>
                    </div>
                </div>
                <div id="add-note-footer" slot="footer">
                    <Button on:click={handleCancel}>Cancel</Button>
                    <Button on:click={handleAddNote}>Save</Button>
                </div>
            </Popup>
        {:else if showRemoveAllPopup}
            <Popup --width="40%" --height="50%" --body-height="33%" --footer-height="33%" --header-height="33%">
                <div id="remove-all-header" slot="header">
                    <h3>Remove all</h3>
                </div>
                <div id="remove-all-body" slot="body">
                    <p>Are you sure you want to remove all notes?</p>
                </div>
                <div id="remove-all-footer" slot="footer">
                    <Button on:click={handleCancel}>Cancel</Button>
                    <Button on:click={handleRemoveAll}>Continue</Button>
                </div>
            </Popup>
        {/if}
    </div>
</template>

<style>
#main {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
#notes {
    display: grid;
    grid-template-columns: repeat(3, 33%);
    gap: 10px;
}
#add-note-header, #remove-all-header {
    display: flex;
    justify-content: center;
}
#add-note-body {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    padding: 5px;
    gap: 5px;
    justify-content: center;
    align-items: center;
}

#remove-all-body {
    display: flex;
    align-items: center;
    justify-content: center;
}

#add-note-footer, #remove-all-footer {
    display: flex;
    justify-content: space-evenly;
}
#add-note-body > div > input, #add-note-body > div > textarea, #add-note-body > div > select {
    border: 1px inset black;
    box-shadow: 1px 1px black;
    width: 80%;
    max-width: 90%;
    min-width: 50%;
    max-height: 200px;
}

#add-note-body > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
}

#add-note-body > div > input:hover, #add-note-body > div > textarea:hover, #add-note-body > div > input:focus, #add-note-body > div > textarea:focus {
    border: 1px inset orange;
    outline: none;
}

#add-note-body > div > label {
    font-family: 'Courier New', Courier, monospace;
    margin: 10px 0px;
}

#favorite-field {
    display: flex;
    flex-direction: row !important;
    justify-content: center;
    align-items: center;
    justify-self: center;
    align-self: end;
}

#favorite-field > label {
    margin: 0 !important
}

#text-field {
    grid-column: span 2;
}

#search-bar {
    width: 300px;
    border: 1px inset black;
    padding: 5px;
    box-shadow: 1px 1px 1px black;
}

#search-bar:focus, #search-bar:hover {
    outline: none;
    border: 1px inset orange;
}

#search {
    display: flex;
    align-items: center;
    gap: 10px;
}

#date-filter {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: start;
    justify-content: center;
    margin-left: 10px;
}

#date-filter > input {
    width: 100px;
    border: 1px inset black;
    box-shadow: 1px 1px 1px black;
}

#date-filter > input:hover, #date-filter > input:focus {
    outline: none;
    border: 1px solid orange;
}

#search > label, #search > div > label {
    font-weight: 600;
    color: rgb(2, 2, 65);
}

</style>