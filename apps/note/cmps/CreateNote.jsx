import { noteService } from "../services/note.service.js"
import { ToDo } from "./Todo.jsx"

const YOUTUBE_URL_REGEX = /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([\w-]{7,15})(?:[\?&][\w-]+=[\w-]+)*(?:[&\/\#].*)?$/

// const { useState, useEffect } = React

export function CreateNote(props) {

    function onChangeNote(ev) {
        const name = ev.target.name
        let value = ev.target.value
        if (name === 'image') {
            const imageFile = ev.target.files && ev.target.files[0]
            if (! imageFile) return
            const fileReader = new FileReader()
            fileReader.onload = () => {
                value = fileReader.result
                props.onSetNoteToEdit({ [name]: value })
            }
            fileReader.readAsDataURL(imageFile)
            return
        } else if (name === 'video') {
            const regexMatch = value.match(YOUTUBE_URL_REGEX)
            const videoId = regexMatch && regexMatch[1] || 'dQw4w9WgXcQ'
            value = `https://www.youtube.com/embed/${videoId}`
        }
        props.onSetNoteToEdit({ [name]: value })
    }

    function onAddTodo(todoText) {
        const newTodo = noteService.createTodo(todoText)
        props.noteToEdit.todo.push(newTodo)
        const items = props.noteToEdit.todo.slice()
        props.onSetNoteToEdit({ todo: items })
    }

    function onDeleteTodo(itemId) {
        const itemIdx = props.noteToEdit.todo.findIndex(item => item.id === itemId)
        props.noteToEdit.todo.splice(itemIdx, 1)
        const items = props.noteToEdit.todo
        props.onSetNoteToEdit({ todo: items })
    }

    function onCreateNote(ev) {
        ev.preventDefault()
        props.onSaveNote()
    }
    
    return (
        <form onSubmit={onCreateNote}className="create-note">
            <label className="type">
                <span>Type:</span>
                <select name="type" value={props.noteToEdit.type} onChange={onChangeNote}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="todo">ToDo</option>
                </select>
            </label>
            <label className="title">
                <span>Title:</span>
                <input type="text" name="title" value={props.noteToEdit.title} onChange={onChangeNote} />
            </label>
            {
                props.noteToEdit.type === 'text' &&
                <label className="text">
                    <span>Text:</span>
                    <textarea name="text" rows="3" value={props.noteToEdit.text} onChange={onChangeNote} />
                </label>
            }
            {
                props.noteToEdit.type === 'image' &&
                <label className="image">
                    <span>Image:</span>
                    <input type="file" name="image" accept="image/*" onChange={onChangeNote} />
                </label>
            }
            {
                props.noteToEdit.type === 'video' &&
                <label className="video">
                    <span>Video:</span>
                    <input type="url" name="video" value={props.noteToEdit.video} onChange={onChangeNote} />
                </label>
            }
            {
                props.noteToEdit.type === 'todo' &&
                <label className="todo">
                    <span>Todo:</span>
                    <ToDo items={props.noteToEdit.todo} onAddTodo={onAddTodo} onDeleteTodo={onDeleteTodo} />
                </label>
            }
            <button className="create">Create</button>
        </form>
    )
}