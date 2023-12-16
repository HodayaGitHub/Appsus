import { AppAside } from "../../../cmps/AppAside.jsx"
import { AppHeader } from "../../../cmps/AppHeader.jsx"
import { CreateNote } from "../cmps/CreateNote.jsx"
import { CraeteNoteExpand } from "../cmps/CreateNoteExpand.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex(props) {
    const [pinnedNotes, setPinnedNotes] = useState(null)
    const [unpinnedNotes, setUnpinnedNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [noteToEdit, setNoteToEdit] = useState(noteService.searchParamsToNote(searchParams))
    const [isEditInPlace, setIsEditInPlace] = useState(true)
    const [filterBy, setFilterBy] = useState(noteService.searchParamsToSearchFilter(searchParams))

    useEffect(() => {
        const newSearchParams = noteService.noteToSearchParams(noteToEdit)
        newSearchParams.searchString = filterBy.string
        setSearchParams(newSearchParams)
    }, [noteToEdit, filterBy])

    useEffect(() => {
        noteService.query()
            .then(notes => setNotes(notes))
    }, [filterBy])

    function setNotes(notes) {
        if (! notes) notes = [...pinnedNotes, ...unpinnedNotes]
        else if (! Array.isArray(notes)) {
            const note = notes
            notes = [...pinnedNotes, ...unpinnedNotes]
            if (notes.every(_note => _note.id !== note.id)) notes.push(note)
        }
        notes.sort((note1, note2) => note2.createdAt - note1.createdAt)
        const newPinnedNotes = noteService.filterNotes(notes, { ...filterBy, pinned: true })
        newPinnedNotes.sort((note1, note2) =>  note2.pinnedOrder - note1.pinnedOrder)
        const newUnpinnedNotes = noteService.filterNotes(notes, { ...filterBy, pinned: false })
        setPinnedNotes(newPinnedNotes)
        setUnpinnedNotes(newUnpinnedNotes)
    }

    function onSetIsEditInPlace(newIsEditInPlace) {
        setIsEditInPlace(newIsEditInPlace)
    }

    function onSetNoteToEdit(note) {
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, ...note}))
    }

    function onSaveNote() {
        clearNoteToEdit()
        noteService.save(noteToEdit)
            .then(note => {
                setNotes(note)
            })
            .catch(err => console.error(err))
    }

    function onPinNote(note) {
        clearNoteToEdit()
        noteService.pin(note, ! note.pinned, pinnedNotes.length)
            .then(() => {
                setNotes()
            })
            .catch(err => console.error(err))
    }

    function onArchiveNote(note) {
        clearNoteToEdit()
        noteService.archive(note, ! note.archived)
            .then(() => {
                setNotes()
            })
            .catch(err => console.error(err))
    }

    function onTrashNote(note) {
        clearNoteToEdit()
        noteService.trash(note, ! note.trashed)
            .then(() => {
                setNotes()
            })
            .catch(err => console.error(err))
    }
    
    function onDeleteNote(noteId) {
        clearNoteToEdit()
        noteService.remove(noteId)
            .then(() => {
                setPinnedNotes(prevPinnedNotes => prevPinnedNotes.filter(note => note.id !== noteId))
                setUnpinnedNotes(prevUnpinnedNotes => prevUnpinnedNotes.filter(note => note.id !== noteId))
            })
            .catch(err => console.error(err))
    }

    function onDuplicateNote(note) {
        const newNote = { ...note }
        newNote.id = undefined
        clearNoteToEdit()
        noteService.save(newNote)
            .then(note => {
                setNotes(note)
            })
            .catch(err => console.error(err))
    }

    function clearNoteToEdit() {
        const newNote = noteService.create()
        setNoteToEdit(newNote)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(() => ({ ...noteService.getDefaultFilter(), ...newFilterBy }))
    }

    const APP_ASIDE_BUTTONS = [
        {
            class: '',
            icon: ! filterBy.archived && ! filterBy.trashed ? 
                props.SVG_ICONS.notes.selected :
                props.SVG_ICONS.notes.notSelected,
            text: 'Notes',
            onClick: () => onSetFilterBy(),
        },
        {
            class: '',
            icon: filterBy.archived ?
                props.SVG_ICONS.archive.selected :
                props.SVG_ICONS.archive.notSelected,
            text: 'Archive',
            onClick: () => onSetFilterBy({ archived: true}),
        },
        {
            class: '',
            icon: filterBy.trashed ?
                props.SVG_ICONS.trash.selected :
                props.SVG_ICONS.trash.notSelected,
            text: 'Trash',
            onClick: () => onSetFilterBy({ trashed: true }),
        },
    ]

    const noteListProps = {
        SVG_ICONS: props.SVG_ICONS,
        isEditInPlace,
        noteToEdit,
        onPinNote,
        onArchiveNote,
        onTrashNote,
        onDeleteNote,
        onSetIsEditInPlace,
        onSetNoteToEdit,
        onSaveNote,
        onDuplicateNote,
    }

    return (
        <React.Fragment>
            <AppHeader
                SVG_ICONS={props.SVG_ICONS}
                onSetFilterBy={onSetFilterBy}
                filterBy={filterBy}
            />
            <AppAside buttons={APP_ASIDE_BUTTONS}/>
            <main className="note-index">
                <CraeteNoteExpand
                    isEditInPlace={isEditInPlace}
                    noteToEdit={noteToEdit}
                    onSetIsEditInPlace={onSetIsEditInPlace}
                    onSetNoteToEdit={onSetNoteToEdit}
                    onSaveNote={onSaveNote}
                />
                <h3>Pinned</h3>
            {
                ! pinnedNotes && <section>Loading...</section> ||
                <NoteList
                    notes={pinnedNotes}
                    pinned='pinned'
                    { ...noteListProps }
                />
            }
                <h3>Unpinned</h3>
            {
                ! unpinnedNotes && <section>Loading...</section> ||
                <NoteList
                    notes={unpinnedNotes}
                    pinned='unpinned'
                    { ...noteListProps }
                />
            }
            </main>
        </React.Fragment>
    )
}
