import { AppAside } from "../../../cmps/AppAside.jsx"
import { AppHeader } from "../../../cmps/AppHeader.jsx"
import { CreateNote } from "../cmps/CreateNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex(props) {
    const [pinnedNotes, setPinnedNotes] = useState(null)
    const [unpinnedNotes, setUnpinnedNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [noteToEdit, setNoteToEdit] = useState(noteService.searchParamsToNote(searchParams))
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        const newSearchParams = noteService.noteToSearchParams(noteToEdit)
        setSearchParams(newSearchParams)
    }, [noteToEdit])

    useEffect(() => {
        setNotes()
    }, [filterBy])

    function setNotes(createNotes) {
        noteService.query(createNotes)
            .then(notes => {
                notes.reverse()
                const pinnedNotes = noteService.filterNotes(notes, { ...filterBy, pinned: true })
                pinnedNotes.sort((note1, note2) =>  note2.pinnedOrder - note1.pinnedOrder)
                const unpinnedNotes = noteService.filterNotes(notes, { ...filterBy, pinned: false })
                setPinnedNotes(pinnedNotes)
                setUnpinnedNotes(unpinnedNotes)
            })
    }

    function onSetNoteToEdit(note) {
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, ...note}))
    }

    function onSaveNote() {
        noteService.save(noteToEdit)
            .then(() => renderNotes())
            .catch(err => console.error(err))
    }

    function onPinNote(note) {
        noteService.pin(note, ! note.pinned)
            .then(() => renderNotes())
            .catch(err => console.error(err))
    }

    function onArchiveNote(note) {
        noteService.archive(note, ! note.archived)
            .then(() => renderNotes())
            .catch(err => console.error(err))
    }

    function onTrashNote(note) {
        noteService.trash(note, ! note.trashed)
            .then(() => renderNotes())
            .catch(err => console.error(err))
    }
    
    function onDeleteNote(noteId) {
        noteService.remove(noteId)
            .then(() => renderNotes())
            .catch(err => console.error(err))
    }

    function onDuplicateNote(note) {
        const newNote = { ...note }
        newNote.id = undefined
        noteService.save(newNote)
            .then(() => renderNotes())
            .catch(err => console.error(err))
    }

    function renderNotes() {
        const newNote = noteService.create()
        newNote.type = noteToEdit.type
        setNoteToEdit(newNote)
        setNotes(false)
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
        onPinNote,
        onArchiveNote,
        onTrashNote,
        onDeleteNote,
        onSetNoteToEdit,
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
                <CreateNote
                    onSaveNote={onSaveNote}
                    noteToEdit={noteToEdit}
                    onSetNoteToEdit={onSetNoteToEdit}
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
