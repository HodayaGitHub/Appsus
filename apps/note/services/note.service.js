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
    setFilter,
    get,
    save,
    create,
    createTodoItem,
    pin,
    archive,
    trash,
    remove,
    noteToSearchParams,
    searchParamsToNote,
}

let gFilter = {}

function query() {
    const prmNotes = storageService.query(NOTES_STORAGE_KEY)
        .then(notes => {
            if (notes.length === 0) notes = _createNotes()
            notes = _filterNotes(notes)
            return notes
        })
    return prmNotes
}

function _filterNotes(notes) {
    notes = notes.filter(note => ! note.trashed && ! note.archived)
    let pinnedNotes = notes.filter(note => note.pinned)
    let unpinnedNotes = notes.filter(note => ! note.pinned)
    notes = [...pinnedNotes, ...unpinnedNotes]
    return notes
}

function setFilter(filterBy) {
    gFilter = { ...gFilter, ...filterBy}
}

function get(noteId) {
    const prmNote = storageService.get(NOTES_STORAGE_KEY, noteId)
    return prmNote
}

function save(note) {
    let prmNotes
    const saveNote = note.id ? storageService.put : storageService.post
    prmNotes = saveNote(NOTES_STORAGE_KEY, note)
        .then(notes => _filterNotes(notes))
    return prmNotes
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

function pin(note, isPinnded=true) {
    note.pinned = isPinnded
    const prmNotes = save(note)
    return prmNotes
}

function archive(note, isArchived=true) {
    note.archived = isArchived
    const prmNotes = save(note)
    return prmNotes
}

function trash(note, isTrashed=true) {
    note.trashed = isTrashed
    const prmNotes = save(note)
    return prmNotes
}

function remove(noteId) {
    const prmNotes = storageService.remove(NOTES_STORAGE_KEY, noteId)
        .then(notes => _filterNotes(notes))
    return prmNotes
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