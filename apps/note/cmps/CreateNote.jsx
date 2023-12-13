import { noteService } from "../services/note.service.js"

const { useState } = React

export function CreateNote(props) {
    const [note, setNote] = useState(noteService.create())
    const [type, setType] = useState('text')

    function onChangeNote(ev) {
        const name = ev.target.name
        const value = ev.target.value
        if (name === 'image') {
            // const imageFile = ev.target.files && ev.target.files[0]
            // if (imageFile) {
            //     const fileReader = new FileReader()
            //     fileReader.onload = () => fileReader.result
            //     fileReader.readAsDataURL(imageFile)
            // }
        }
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
            <label className="type">
                <span>Type:</span>
                <select name="type" value={type} onChange={ev => setType(ev.target.value)}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="todo">Todo</option>
                </select>
            </label>
            {
                type === 'text' &&
                <label className="content">
                    <span>Content:</span>
                    <textarea name="content" rows="3" value={note.content} onChange={onChangeNote} />
                </label>
            }
            {
                type === 'image' &&
                <label className="image">
                    <input type="file" name="image" accept="image/*" onChange={onChangeNote} />
                </label>
            }
            {
                type === 'video' &&
                <label className="video">
                    <input type="url" name="video" onChange={onChangeNote} />
                </label>
            }
            {
                type === 'todo' &&
                <label className="todo">
                    <span>Todo</span>
                </label>
            }
            <button className="create">Create</button>
        </form>
    )
}