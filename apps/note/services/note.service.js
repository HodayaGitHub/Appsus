import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTES_STORAGE_KEY = 'appsusNotes'

const NOTE_TYPE_TEXT = 'text'
const NOTE_TYPE_IMAGE = 'image'
const NOTE_TYPE_VIDEO = 'video'
const NOTE_TYPE_TOTO = 'todo'

export const noteService = {
    query,
    get,
    create,
}

function query(filterBy) {
    const prmAllNotes = storageService.get(NOTES_STORAGE_KEY)
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

function create(type = NOTE_TYPE_TEXT, content = '') {
    const note = {
        type,
        content,
        createdAt: Date.now(),
    }
}

function _createNotes() {

}