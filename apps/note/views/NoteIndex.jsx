import { AppAside } from "../../../cmps/AppAside.jsx"
import { AppHeader } from "../../../cmps/AppHeader.jsx"
import { CreateNote } from "../cmps/CreateNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [noteToEdit, setNoteToEdit] = useState(noteService.searchParamsToNote(searchParams))
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        const newSearchParams = noteService.noteToSearchParams(noteToEdit)
        setSearchParams(newSearchParams)
    }, [noteToEdit])

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }, [filterBy])

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
        noteService.query(filterBy, false)
            .then(notes => setNotes(notes))
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...newFilterBy }))
    }

    const APP_ASIDE_BUTTONS = [
        {
            class: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM360-200q-17 0-28.5-11.5T320-240q0-17 11.5-28.5T360-280h240q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H360Zm-30-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>,
            text: 'Notes',
            onClick: () => onSetFilterBy({ trashed: false, archived: false}),
        },
        {
            class: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-560q-17 0-28.5 11.5T440-520v128l-36-36q-11-11-28-11t-28 11q-11 11-11 28t11 28l104 104q12 12 28 12t28-12l104-104q11-11 11-28t-11-28q-11-11-28-11t-28 11l-36 36v-128q0-17-11.5-28.5T480-560Zm-280-80v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z"/></svg>,
            text: 'Archive',
            onClick: () => onSetFilterBy({ trashed: false, archived: true}),
        },
        {
            class: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>,
            text: 'Trash',
            onClick: () => onSetFilterBy({ trashed: true, archived: false}),
        },
    ]

    return (
        <React.Fragment>
            <AppHeader />
            <AppAside buttons={APP_ASIDE_BUTTONS}/>
            <main className="note-index">
                <CreateNote
                    onSaveNote={onSaveNote}
                    noteToEdit={noteToEdit}
                    onSetNoteToEdit={onSetNoteToEdit}
                />
                <NoteList
                    notes={notes}
                    onPinNote={onPinNote}
                    onArchiveNote={onArchiveNote}
                    onTrashNote={onTrashNote}
                    onDeleteNote={onDeleteNote}
                    onSetNoteToEdit={onSetNoteToEdit}
                    onDuplicateNote={onDuplicateNote}
                />
            </main>
        </React.Fragment>
    )
}
