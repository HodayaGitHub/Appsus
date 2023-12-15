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
        }
        props.onSetNoteToEdit({ [name]: value })
    }

    function onAddTodoItem() {
        const todoText = props.noteToEdit.todoText
        if (! todoText) return
        const newTodoItem = noteService.createTodoItem(todoText)
        props.noteToEdit.todo.push(newTodoItem)
        props.onSetNoteToEdit({ todoText: '', todo: props.noteToEdit.todo })
    }

    function onDeleteTodoItem(itemId) {
        const itemIdx = props.noteToEdit.todo.findIndex(item => item.id === itemId)
        props.noteToEdit.todo.splice(itemIdx, 1)
        props.onSetNoteToEdit({ todo: props.noteToEdit.todo })
    }

    function onCreateNote(ev) {
        ev.preventDefault()
        if (props.noteToEdit.type === 'video') {
            let value = props.noteToEdit.video
            const regexMatch = value.match(YOUTUBE_URL_REGEX)
            const videoId = regexMatch && regexMatch[1] || 'dQw4w9WgXcQ'
            value = `https://www.youtube.com/embed/${videoId}`
            props.noteToEdit.video = value
        }
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
                <React.Fragment>
                    <ToDo items={props.noteToEdit.todo} onDeleteTodoItem={onDeleteTodoItem} />
                    <label className="todo">
                        <span>Todo:</span>
                        <input type="text" name="todoText" value={props.noteToEdit.todoText} onChange={onChangeNote} />
                    </label>
                    <button type="button" onClick={onAddTodoItem}>Add</button>
                </React.Fragment>
            }
            <div className="color">
            {
                noteService.NOTE_COLORS_B.map((color, idx) => {
                    return (
                        <label key={color} className={`color-b-${String(idx).padStart(2, '0')}`}>
                            <input
                                type="radio"
                                name="color"
                                value={color}
                                checked={props.noteToEdit.color === color}
                                onChange={onChangeNote}
                            />
                        </label>
                    )
                })
            }
            </div>
            <button className="create">{props.noteToEdit.id ? 'Save' : 'Create'}</button>
        </form>
    )
}