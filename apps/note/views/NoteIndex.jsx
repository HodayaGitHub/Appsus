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

    useEffect(() => {
        const newSearchParams = noteService.noteToSearchParams(noteToEdit)
        setSearchParams(newSearchParams)
    }, [noteToEdit])

    useEffect(() => {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }, [])

    function onSetNoteToEdit(note) {
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, ...note}))
    }

    function onSaveNote() {
        noteService.save(noteToEdit)
            .then(notes => renderNotes(notes))
            .catch(err => console.error(err))
    }
    
    function onDeleteNote(noteId) {
        noteService.remove(noteId)
            .then(notes => renderNotes(notes))
            .catch(err => console.error(err))
    }

    function onDuplicateNote(note) {
        const newNote = { ...note }
        newNote.id = undefined
        noteService.save(newNote)
            .then(notes => renderNotes(notes))
            .catch(err => console.error(err))
    }

    function renderNotes(notes) {
        const newNote = noteService.create()
        newNote.type = noteToEdit.type
        setNoteToEdit(newNote)
        setNotes(notes)
    }
    
    return (
        <React.Fragment>
            <AppHeader />
            <AppAside />
            <main className="note-index">
                <CreateNote
                    onSaveNote={onSaveNote}
                    noteToEdit={noteToEdit}
                    onSetNoteToEdit={onSetNoteToEdit}
                />
                <NoteList
                    notes={notes}
                    onDeleteNote={onDeleteNote}
                    onSetNoteToEdit={onSetNoteToEdit}
                    onDuplicateNote={onDuplicateNote}
                />
            </main>
        </React.Fragment>
    )
}
