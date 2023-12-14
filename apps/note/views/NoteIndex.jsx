import { CreateNote } from "../cmps/CreateNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }, [])

    function onSetNote(note) {
        return noteService.save(note)
            .then(notes => setNotes(notes))
            .catch(err => console.error(err))
    }
    
    function onDeleteNote(noteId) {
        return noteService.remove(noteId)
            .then(notes => setNotes(notes))
            .catch(err => console.error(err))
    }

    return (
        <main className="note-index">
            <CreateNote onSetNote={onSetNote} />
            <NoteList notes={notes} onDeleteNote={onDeleteNote} />
        </main>
    )
}
