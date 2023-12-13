import { noteService } from "../services/note.service.js"

const { useState } = React

export function CreateNote(props) {
    const [note, setNote] = useState(noteService.create())

    function onChangeNote(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setNote(prevNote => ({ ...prevNote, [name]: value }))
    }

    function onCreateNote(ev) {
        ev.preventDefault()
        props.onSetNote(note)
            .then(() => setNote(noteService.create()))
    }

    return (
        <form onSubmit={onCreateNote}className="create-note">
            <label className="title">
                <span>Title:</span>
                <input type="text" name="title" value={note.title} onChange={onChangeNote} />
            </label>
            <label className="content">
                <span>Content:</span>
                <textarea name="content" rows="3" value={note.content} onChange={onChangeNote} />
            </label>
            <button className="create">Create</button>
        </form>
    )
}