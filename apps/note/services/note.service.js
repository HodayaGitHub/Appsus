import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTES_STORAGE_KEY = 'notes'

const NOTE_TYPE_TEXT = 'text'
const NOTE_TYPE_IMAGE = 'image'
const NOTE_TYPE_VIDEO = 'video'
const NOTE_TYPE_TODO = 'todo'

const NONE_STRING_KEYS = ['todo', 'labels', 'pinned', 'archived', 'trashed', 'createdAt']

const NOTE_COLORS_A = [
    'rgb(255, 190, 011)',
    'rgb(251, 086, 007)',
    'rgb(255, 000, 110)',
    'rgb(131, 056, 236)',
    'rgb(058, 134, 255)',
]

const NOTE_COLORS_B = [
    '#ffffff',
    '#faafa8',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#b4ddd3',
    '#d4e4ed',
    '#aeccdc',
    '#d3bfdb',
    '#f6e2dd',
    '#e9e3d4',
    '#efeff1',
]

export const noteService = {
    NOTE_COLORS_A,
    NOTE_COLORS_B,
    query,
    filterNotes,
    get,
    getDefaultFilter,
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

function query(createNotes=true) {
    const prmNotes = storageService.query(NOTES_STORAGE_KEY)
        .then(notes => {
            if (notes.length === 0 && createNotes) notes = _createNotes()
            return notes
        })
    return prmNotes
}

function filterNotes(notes, filterBy) {
    filterBy = { ...getDefaultFilter(), ...filterBy }
    notes = notes.filter(note => {
        const isShown =
            (filterBy.trashed === note.trashed) &&
            (filterBy.archived === note.archived)
        return isShown
    })
    if (filterBy.pinned !== undefined) {
        notes = notes.filter(note => {
            const isShown =
                (filterBy.pinned === note.pinned)
            return isShown
        })
    }
    return notes
}

function getDefaultFilter() {
    const defaultFilter = {
        pinned: undefined,
        trashed: false,
        archived: false,
    }
    return defaultFilter
}

function get(noteId) {
    const prmNote = storageService.get(NOTES_STORAGE_KEY, noteId)
    return prmNote
}

function save(note) {
    const saveNoteToStorage = note.id ? storageService.put : storageService.post
    const prmNote = saveNoteToStorage(NOTES_STORAGE_KEY, note)
    return prmNote
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
        color: NOTE_COLORS_B[0],
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
    const prmNote = query()
        .then(notes => {
            const pinnedNotes = filterNotes(notes, { pinned: true })
            note.pinnedOrder = pinnedNotes.length
            return save(note)
        })
    return prmNote
}

function archive(note, isArchived=true) {
    if (note.archived === isArchived) return Promise(note)
    note.trashed = false
    note.archived = isArchived
    const prmNote = save(note)
    return prmNote
}

function trash(note, isTrashed=true) {
    if (note.trashed === isTrashed) return Promise(note)
    note.archived = false
    note.trashed = isTrashed
    const prmNote = save(note)
    return prmNote
}

function remove(noteId) {
    return storageService.remove(NOTES_STORAGE_KEY, noteId)
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