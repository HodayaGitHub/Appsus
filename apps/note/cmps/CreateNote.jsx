import { noteService } from "../services/note.service.js"
import { ToDo } from "./Todo.jsx"

const YOUTUBE_URL_REGEX = /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([\w-]{7,15})(?:[\?&][\w-]+=[\w-]+)*(?:[&\/\#].*)?$/

const { useState } = React

export function CreateNote(props) {
    const [note, setNote] = useState(noteService.create())

    function onChangeNote(ev) {
        const name = ev.target.name
        let value = ev.target.value
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
        } else if (name === 'video') {
            const regexMatch = value.match(YOUTUBE_URL_REGEX)
            const videoId = regexMatch && regexMatch[1] || 'dQw4w9WgXcQ'
            value = `https://www.youtube.com/embed/${videoId}`
        }
        setNote(prevNote => ({ ...prevNote, [name]: value }))
    }

    function onAddTodo(todoText) {
        setNote(prevNote => {
            const newTodo = noteService.createTodo(todoText)
            prevNote.todo.push(newTodo)
            const newNote = { ...prevNote }
            return newNote
        })
    }

    function onCreateNote(ev) {
        ev.preventDefault()
        props.onSetNote(note)
            .then(() => setNote(noteService.create()))
    }
    
    return (
        <form onSubmit={onCreateNote}className="create-note">
            <label className="type">
                <span>Type:</span>
                <select name="type" value={note.type} onChange={onChangeNote}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="todo">ToDo</option>
                </select>
            </label>
            <label className="title">
                <span>Title:</span>
                <input type="text" name="title" value={note.title} onChange={onChangeNote} />
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
                    <span>Image:</span>
                    <input type="file" name="image" accept="image/*" onChange={onChangeNote} />
                </label>
            }
            {
                note.type === 'video' &&
                <label className="video">
                    <span>Video:</span>
                    <input type="url" name="video" value={note.video} onChange={onChangeNote} />
                </label>
            }
            {
                note.type === 'todo' &&
                <label className="todo">
                    <span>Todo:</span>
                    <ToDo items={note.todo} onAddTodo={onAddTodo} />
                </label>
            }
            <button className="create">Create</button>
        </form>
    )
}