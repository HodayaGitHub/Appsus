import { noteService } from "../services/note.service.js"
import { ToDo } from "./Todo.jsx"

const { useState, useEffect } = React

const YOUTUBE_URL_REGEX = /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([\w-]{7,15})(?:[\?&][\w-]+=[\w-]+)*(?:[&\/\#].*)?$/

export function CraeteNoteExpand(props) {
    const [numElementsInFocus, setNumElementsInFocus] = useState(1)
    const [isInFocus, setIsInFocus] = useState(false)

    useEffect(() => {
        setIsInFocus(0 < numElementsInFocus)
        if (numElementsInFocus <= 0) onCreateNote()
    }, [numElementsInFocus])

    function onSetType(ev) {
        const type = ev.target.className
        props.onSetNoteToEdit({ type })
    }

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

    function onCreateNote() {
        if (! props.noteToEdit.title) {
            switch (props.noteToEdit.type) {
                case 'text': if (! props.noteToEdit.text) return
                case 'todo': if (! props.noteToEdit.todo.length) return
                case 'image': if (! props.noteToEdit.image) return
                case 'video': if (! props.noteToEdit.video) return
            }
        }
        if (props.noteToEdit.type === 'video') {
            let value = props.noteToEdit.video
            const regexMatch = value.match(YOUTUBE_URL_REGEX)
            const videoId = regexMatch && regexMatch[1] || 'dQw4w9WgXcQ'
            value = `https://www.youtube.com/embed/${videoId}`
            props.noteToEdit.video = value
        }
        props.onSaveNote()
    }

    const eventHandlers = {
        onFocus: () => setNumElementsInFocus(prev => prev + 1),
        onChange: onChangeNote,
        onBlur: () => setNumElementsInFocus(prev => Math.max(prev - 1, 0)),
    }

    return (
        <div className="create-note-expand">
        {
            isInFocus &&
            <div className="input-container">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={props.isEditInPlace && props.noteToEdit.title || ''}
                    { ...eventHandlers }
                />
            </div>
        }
            <div className="input-container">
            {
                props.noteToEdit.type === 'text' &&
                <input
                    type="text"
                    name="text"
                    placeholder="Take a note..."
                    value={props.isEditInPlace && props.noteToEdit.text || ''}
                    { ...eventHandlers }
                />
            }
            {
                props.noteToEdit.type === 'todo' &&
                <div className="input-container">
                    <ToDo
                        items={props.isEditInPlace && props.noteToEdit.todo || []}
                        onDeleteTodoItem={onDeleteTodoItem}
                        { ...eventHandlers }
                    />
                    <input
                        type="text"
                        name="todoText"
                        value={props.isEditInPlace && props.noteToEdit.todoText || ''}
                        { ...eventHandlers }
                    />
                    <button type="button" onClick={onAddTodoItem}>Add</button>
                </div>
            }
            {
                props.noteToEdit.type === 'image' &&
                <div className="input-container">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        { ...eventHandlers }
                    />
                </div>
            }
            {
                props.noteToEdit.type === 'video' &&
                <div className="input-container">
                    <input
                        type="url"
                        name="video"
                        value={props.isEditInPlace && props.noteToEdit.video || ''}
                        { ...eventHandlers }
                    />
                </div>
            }
            </div>
        {
            isInFocus &&
            <section className="buttons-container">
                <section className="types-button-container">
                    <button
                        className="text"
                        onClick={onSetType}
                        { ...eventHandlers }
                    >
                        Text
                    </button>
                    <button
                        className="todo"
                        onClick={onSetType}
                        { ...eventHandlers }
                    >
                        Todo
                    </button>
                    <button
                        className="image"
                        onClick={onSetType}
                        { ...eventHandlers }
                    >
                        Image
                    </button>
                    <button
                        className="video"
                        onClick={onSetType}
                        { ...eventHandlers }
                    >
                        Video
                    </button>
                </section>
                <button
                    className="close"
                    onClick={() => setNumElementsInFocus(0)}
                >
                    Close
                </button>
            </section>
        }
            <div className="colors-container">
            {
                noteService.NOTE_COLORS_B.map((color, idx) => {
                    return (
                        <label key={color} className={`color-b-${String(idx).padStart(2, '0')}`}>
                            <input
                                type="radio"
                                name="color"
                                value={props.isEditInPlace && color || ''}
                                checked={props.noteToEdit.color === color}
                                onChange={onChangeNote}
                            />
                        </label>
                    )
                })
            }
            </div>
        </div>
    )
}