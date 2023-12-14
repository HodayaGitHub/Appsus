import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTES_STORAGE_KEY = 'notes'

const NOTE_TYPE_TEXT = 'text'
const NOTE_TYPE_IMAGE = 'image'
const NOTE_TYPE_VIDEO = 'video'
const NOTE_TYPE_TODO = 'todo'

const NONE_STRING_KEYS = ['todo', 'labels', 'archived', 'trashed', 'createdAt']

const NOTE_COLORS = [
    'rgb(255, 190, 011)',
    'rgb(251, 086, 007)',
    'rgb(255, 000, 110)',
    'rgb(131, 056, 236)',
    'rgb(058, 134, 255)',
]

export const noteService = {
    NOTE_COLORS,
    query,
    get,
    save,
    create,
    createTodoItem,
    remove,
    noteToSearchParams,
    searchParamsToNote,
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

function create(content='', title='', type=NOTE_TYPE_TEXT) {
    const note = {
        [NOTE_TYPE_TEXT]: '',
        [NOTE_TYPE_IMAGE]: '',
        [NOTE_TYPE_VIDEO]: '',
        [NOTE_TYPE_TODO]: [],
        todoText: '',
        [type]: content,
        title,
        labels: [],
        type,
        color: NOTE_COLORS[0],
        pinned: false,
        archived: false,
        trashed: false,
        createdAt: NaN,
    }
    return note
}

function createTodoItem(text) {
    const newTodo = {
        id: utilService.makeId(),
        text,
    }
    return newTodo
}

function remove(noteId) {
    const prmAllNotes = storageService.remove(NOTES_STORAGE_KEY, noteId)
    return prmAllNotes
}

function noteToSearchParams(note) {
    const searchParams = { ...note }
    for (const [key, value] of Object.entries(note)) {
        if (NONE_STRING_KEYS.includes(key)) {
            searchParams[key] = JSON.stringify(value)
        }
    }
    return searchParams
}

function searchParamsToNote(searchParams) {
    const newNote = create()
    for (const [key, value] of searchParams.entries()) {
        if (NONE_STRING_KEYS.includes(key)) {
            newNote[key] = JSON.parse(value)
        } else newNote[key] = value
    }
    return newNote
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