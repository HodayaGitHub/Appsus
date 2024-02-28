import { noteService } from "../services/note.service.js"
import { ToDo } from "./Todo.jsx"

import { useState, useEffect } from 'react';

const YOUTUBE_URL_REGEX = /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([\w-]{7,15})(?:[\?&][\w-]+=[\w-]+)*(?:[&\/\#].*)?$/

export function CraeteNoteExpand(props) {
    const [isShowColors, setIsShowColors] = useState(false)

    useEffect(() => {
        if (! props.isInFocus) {
            onCreateNote()
            setIsShowColors(false)
        }
    }, [props.isInFocus])

    function onSetType(ev) {
        const type = ev.target.className
        props.onSetNoteToEdit({ type })
    }

    function onChangeNote(ev) {
        let name = ev.target.name
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
            const type = props.noteToEdit.type
            if (type === 'text' && ! props.noteToEdit.text) return
            if (type === 'todo' && ! props.noteToEdit.todo.length) return
            if (type === 'image' && ! props.noteToEdit.image) return
            if (type === 'video' && ! props.noteToEdit.video) return
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

    return (
        <div className="create-note-expand"
            onClick={ev => props.onSetIsInFocus(ev, true)}
        >
        {
            props.isInFocus &&
            <div className="input-container">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={props.isEditInPlace && props.noteToEdit.title || ''}
                    onInput={onChangeNote}
                />
            </div>
        }
            <div className="input-container">
            {
                props.noteToEdit.type === 'text' &&
                <textarea
                    ref={el => {
                        if (el && el.style.height !== el.scrollHeight) {
                            props.setTextareaHeight(el)
                        }
                    }}
                    rows="1"
                    name="text"
                    placeholder="Take a note..."
                    value={props.isEditInPlace && props.noteToEdit.text || ''}
                    onInput={onChangeNote}
                />
            }
            {
                props.noteToEdit.type === 'todo' &&
                <div className="input-container">
                    <ToDo
                        items={props.isEditInPlace && props.noteToEdit.todo || []}
                        onDeleteTodoItem={onDeleteTodoItem}
                        onChange={onChangeNote}
                    />
                    <input
                        type="text"
                        name="todoText"
                        value={props.isEditInPlace && props.noteToEdit.todoText || ''}
                        onChange={onChangeNote}
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
                    />
                </div>
            }
            </div>
        {
            props.isInFocus &&
            <section className="buttons-container">
                <section className="type-buttons-container">
                    <button
                        className="text"
                        onClick={onSetType}
                    >
                        {props.SVG_ICONS.note.notSelected}
                    </button>
                    <button
                        className="todo"
                        onClick={onSetType}
                    >
                        {props.SVG_ICONS.todo.notSelected}
                    </button>
                    <button
                        className="image"
                        onClick={onSetType}
                    >
                        {props.SVG_ICONS.image.notSelected}
                    </button>
                    <button
                        className="video"
                        onClick={onSetType}
                    >
                        {props.SVG_ICONS.video.notSelected}
                    </button>
                    <button
                        className="color"
                        onClick={() => setIsShowColors(prev => ! prev)}
                    >
                        {props.SVG_ICONS.colors.notSelected}
                    </button>
                </section>
                <button
                    className="close"
                    onClick={ev => props.onSetIsInFocus(ev, false)}
                >
                    Close
                </button>
            </section>
        }
        {
            isShowColors &&
            <div className={`colors-container`}>
            {
                noteService.NOTE_COLORS_B.map((color, idx) => {
                    return (
                        <label
                            key={color}
                            className={`color color-b-${String(idx).padStart(2, '0')}`}
                        >
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
        }
        </div>
    )
}