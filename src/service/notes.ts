import { setForLocalStorage, getFromLocalStorage } from "./utils";

export type Note = {
    name: string,
    text: string,
    favorite: boolean,
    category: Category,
    date: Date,
    id: string
}

export type Category = {
    name: string
}

export function addNote(note: Note) {
    let notes = getFromLocalStorage('notes') || [];
    notes.push(note);
    setForLocalStorage('notes', notes);
}

export function removeNote(id: string) {
    let notes = getFromLocalStorage('notes') || [];
    setForLocalStorage('notes', notes.filter((note: Note) => note.id !== id))
}

export function removeAllNotes() {
    setForLocalStorage('notes', []);
}

export function getNotes(): Note[] {
    return getFromLocalStorage('notes') || [];
}

export function createNote(name: string, text: string, favorite = false, date = new Date(), category: Category): Note {
    return {
        name,
        text,
        favorite,
        category,
        date: date,
        id: Date.now() + name
    }
}

export function favoriteNote(id: string, favorite: boolean) {
    let notes = getFromLocalStorage("notes") || [];
    notes.forEach((note: Note) => {
        if (id === note.id) {
            note.favorite = favorite;
        }
    })

    setForLocalStorage('notes', notes)
}

export function filterNotes(filter: (note: Note) => boolean): Note[] {
    let notes = getFromLocalStorage("notes") || [];
    return notes.filter(filter);
}

export function searchNote(name: string): Note[] {
    let notes = getFromLocalStorage("notes") || [];
    return notes.filter((note: Note) => note.name.toLowerCase().includes(name.toLowerCase()))
}

export function getCategories(): Category[] {
    return getFromLocalStorage("category")
}

export function deleteCategory(name: string) {
    let categories = getFromLocalStorage("category");
    setForLocalStorage("category", categories.filter((category: Category) => category.name !== name));
}

export function editCategory(name: string, newName: string) {
    let categories = getFromLocalStorage("category");
    categories.forEach((category: Category) => {
        if (category.name === name) {
            category.name = newName;
        }
    })
    setForLocalStorage("category", categories);
}

export function addCategory(name: string) {
    let categories = getFromLocalStorage("category");
    categories.push({
        name
    })
    setForLocalStorage("category", categories);
}