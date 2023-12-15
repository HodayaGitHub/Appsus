import { AppAside } from "../../../cmps/AppAside.jsx"
import { AppHeader } from "../../../cmps/AppHeader.jsx"
import { CreateNote } from "../cmps/CreateNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

const SVG_NOTES = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM360-200q-17 0-28.5-11.5T320-240q0-17 11.5-28.5T360-280h240q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H360Zm-30-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>
const SVG_PIN = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
const SVG_ARCHIVE = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-560q-17 0-28.5 11.5T440-520v128l-36-36q-11-11-28-11t-28 11q-11 11-11 28t11 28l104 104q12 12 28 12t28-12l104-104q11-11 11-28t-11-28q-11-11-28-11t-28 11l-36 36v-128q0-17-11.5-28.5T480-560Zm-280-80v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z"/></svg>
const SVG_TRASH = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>
const SVG_DELETE = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Zm200 316 76 76q11 11 28 11t28-11q11-11 11-28t-11-28l-76-76 76-76q11-11 11-28t-11-28q-11-11-28-11t-28 11l-76 76-76-76q-11-11-28-11t-28 11q-11 11-11 28t11 28l76 76-76 76q-11 11-11 28t11 28q11 11 28 11t28-11l76-76Z"/></svg>
const SVG_DUPLICATE = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z"/></svg>
const SVG_SEARCH = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>

const SVG_NOTES_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM360-200q-17 0-28.5-11.5T320-240q0-17 11.5-28.5T360-280h240q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H360Zm-30-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Z"/></svg>
const SVG_PIN_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Z"/></svg>
const SVG_ARCHIVE_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 160q-17 0-28.5 11.5T440-520v128l-36-36q-11-11-28-11t-28 11q-11 11-11 28t11 28l104 104q12 12 28 12t28-12l104-104q11-11 11-28t-11-28q-11-11-28-11t-28 11l-36 36v-128q0-17-11.5-28.5T480-560Z"/></svg>
const SVG_TRASH_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280Z"/></svg>
const SVG_DELETE_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm200-284 76 76q11 11 28 11t28-11q11-11 11-28t-11-28l-76-76 76-76q11-11 11-28t-11-28q-11-11-28-11t-28 11l-76 76-76-76q-11-11-28-11t-28 11q-11 11-11 28t11 28l76 76-76 76q-11 11-11 28t11 28q11 11 28 11t28-11l76-76Z"/></svg>
const SVG_DUPLICATE_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Z"/></svg>
const SVG_SEARCH_SELECTED = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>

const SVG_ICONS = {
    notes: {
      notSelected: SVG_NOTES,
      selected: SVG_NOTES_SELECTED,
    },
    pin: {
      notSelected: SVG_PIN,
      selected: SVG_PIN_SELECTED,
    },
    archive: {
      notSelected: SVG_ARCHIVE,
      selected: SVG_ARCHIVE_SELECTED,
    },
    trash: {
      notSelected: SVG_TRASH,
      selected: SVG_TRASH_SELECTED,
    },
    delete: {
      notSelected: SVG_DELETE,
      selected: SVG_DELETE_SELECTED,
    },
    duplicate: {
      notSelected: SVG_DUPLICATE,
      selected: SVG_DUPLICATE_SELECTED,
    },
    search: {
      notSelected: SVG_SEARCH,
      selected: SVG_SEARCH_SELECTED,
    },
}
  
export function NoteIndex() {
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
            class: "",
            icon: SVG_NOTES,
            text: 'Notes',
            onClick: () => onSetFilterBy(),
        },
        {
            class: "",
            icon: SVG_ARCHIVE,
            text: 'Archive',
            onClick: () => onSetFilterBy({ archived: true}),
        },
        {
            class: "",
            icon: SVG_TRASH,
            text: 'Trash',
            onClick: () => onSetFilterBy({ trashed: true }),
        },
    ]

    return (
        <React.Fragment>
            <AppHeader onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
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
                    SVG_ICONS={SVG_ICONS}
                    notes={pinnedNotes}
                    pinned='pinned'
                    onPinNote={onPinNote}
                    onArchiveNote={onArchiveNote}
                    onTrashNote={onTrashNote}
                    onDeleteNote={onDeleteNote}
                    onSetNoteToEdit={onSetNoteToEdit}
                    onDuplicateNote={onDuplicateNote}
                />
            }
                <h3>Unpinned</h3>
            {
                ! unpinnedNotes && <section>Loading...</section> ||
                <NoteList
                    SVG_ICONS={SVG_ICONS}
                    notes={unpinnedNotes}
                    pinned='unpinned'
                    onPinNote={onPinNote}
                    onArchiveNote={onArchiveNote}
                    onTrashNote={onTrashNote}
                    onDeleteNote={onDeleteNote}
                    onSetNoteToEdit={onSetNoteToEdit}
                    onDuplicateNote={onDuplicateNote}
                />
            }
            </main>
        </React.Fragment>
    )
}
