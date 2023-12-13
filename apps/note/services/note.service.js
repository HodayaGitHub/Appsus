import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTES_STORAGE_KEY = 'notes'

const NOTE_TYPE_TEXT = 'text'
const NOTE_TYPE_IMAGE = 'image'
const NOTE_TYPE_VIDEO = 'video'
const NOTE_TYPE_TODO = 'todo'

export const noteService = {
    query,
    get,
    save,
    create,
    remove,
}

function query(filterBy) {
    const prmAllNotes = storageService.query(NOTES_STORAGE_KEY)
        .then(notes => {
            if (notes.length === 0) notes = _createNotes()
            return notes
        })
    return prmAllNotes
}

function get(noteId) {
    const prmNote = storageService.get(NOTES_STORAGE_KEY, noteId)
    return prmNote
}

function save(note) {
    let prmAllNotes
    if (note.id) prmAllNotes = storageService.put(NOTES_STORAGE_KEY, note)
    else prmAllNotes = storageService.post(NOTES_STORAGE_KEY, note)
    return prmAllNotes
}

function create(content='', title='', labels=[], type=NOTE_TYPE_TEXT) {
    const note = {
        [type]: content,
        title,
        labels,
        type,
        archived: false,
        trashed: false,
        createdAt: Date.now(),
    }
    return note
}

function remove(noteId) {
    const prmAllNotes = storageService.remove(NOTES_STORAGE_KEY, noteId)
    return prmAllNotes
}

function _createNotes() {
    const notes = [
        create('This is my first note!', 'Title'),
        create('And this is my second note.', 'Title'),
        create('Another note just for the sake of it.', 'Title'),
    ]
    notes.forEach(note => note.id = utilService.makeId())
    utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
    return notes
}