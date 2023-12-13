import { noteService } from "../services/note.service.js"

const { useState } = React

export function CreateNote(props) {
    const [note, setNote] = useState(noteService.create())

    function onChangeNote(ev) {
        const name = ev.target.name
        let value = ev.target.value
        console.log(name, value)
        if (name === 'image') {
            const imageFile = ev.target.files && ev.target.files[0]
            if (imageFile) {
                const fileReader = new FileReader()
                fileReader.onload = () => {
                    value = fileReader.result
                    setNote(prevNote => ({ ...prevNote, [name]: value }))
                }
                fileReader.readAsDataURL(imageFile)
            }
        } else setNote(prevNote => ({ ...prevNote, [name]: value }))
    }

    function onCreateNote(ev) {
        ev.preventDefault()
        props.onSetNote(note)
            .then(() => setNote(noteService.create()))
    }
    
    console.log(note)
    return (
        <form onSubmit={onCreateNote}className="create-note">
            <label className="title">
                <span>Title:</span>
                <input type="text" name="title" value={note.title} onChange={onChangeNote} />
            </label>
            <label className="type">
                <span>Type:</span>
                <select name="type" value={note.type} onChange={onChangeNote}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="todo">Todo</option>
                </select>
            </label>
            {
                note.type === 'text' &&
                <label className="text">
                    <span>Text:</span>
                    <textarea name="text" rows="3" value={note.text} onChange={onChangeNote} />
                </label>
            }
            {
                note.type === 'image' &&
                <label className="image">
                    <input type="file" name="image" accept="image/*" onChange={onChangeNote} />
                </label>
            }
            {
                note.type === 'video' &&
                <label className="video">
                    <input type="url" name="video" onChange={onChangeNote} />
                </label>
            }
            {
                note.type === 'todo' &&
                <label className="todo">
                    <span>Todo</span>
                </label>
            }
            <button className="create">Create</button>
        </form>
    )
}