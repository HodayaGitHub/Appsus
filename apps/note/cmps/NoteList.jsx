const { useRef } = React

export function NoteList(props) {

    function onFocusNote(ev, note) {
        props.onSetNoteToEdit(note)
    }

    function onChangeNote(ev, note) {
        const field = ev.target.name
        const value = ev.target.value
        note[field] = value
        props.onSetNoteToEdit(note)
    }

    function onBlurNote(ev, note) {
        props.onSaveNote()
    }

    if (! props.notes) return <section>Loading...</section>
    return (
        <section className={`note-list ${props.pinned}`}>
        {
            props.notes.map(note =>
                <article key={note.id} style={{backgroundColor: note.color}}>
                    <div className="input-container">
                        <input
                            type="text"
                            name="title"
                            value={note.title}
                            onFocus={ev => onFocusNote(ev, note)}
                            onChange={ev => onChangeNote(ev, note)}
                            onBlur={ev => onBlurNote(ev, note)}
                        />
                    </div>
                    {
                        note.type === 'text' &&
                        <div className="input-container">
                            <input
                                type="text"
                                name="text"
                                value={note.text}
                                onFocus={ev => onFocusNote(ev, note)}
                                onChange={ev => onChangeNote(ev, note)}
                                onBlur={ev => onBlurNote(ev, note)}
                            />
                        </div>
                    }
                    {
                        note.type === 'image' &&
                        <img src={note.image} alt="image" />
                    }
                    {
                        note.type === 'video' &&
                        <iframe src={note.video}></iframe>
                    }
                    {
                        note.type === 'todo' &&
                        <ul>
                        {
                            note.todo.map(item => {
                                return <li key={item.id}>{item.text}</li>
                            })
                        }
                        </ul>
                    }
                    <button
                        className="edit"
                        onClick={() => props.onSetNoteToEdit(note)}
                        >Edit
                    </button>
                    <button
                        className="Pin"
                        onClick={() => props.onPinNote(note)}
                        >{note.pinned ? props.SVG_ICONS.pin.selected : props.SVG_ICONS.pin.notSelected }
                    </button>
                    <button
                        className="archive"
                        onClick={() => props.onArchiveNote(note)}
                        >{note.archived ? props.SVG_ICONS.archive.selected : props.SVG_ICONS.archive.notSelected }
                    </button>
                    <button
                        className="trash"
                        onClick={() => props.onTrashNote(note)}
                        >{note.trashed ? props.SVG_ICONS.trash.selected : props.SVG_ICONS.trash.notSelected }
                    </button>
                {
                    note.trashed &&
                    <button
                        className="delete"
                        onClick={() => props.onDeleteNote(note.id)}
                        >{props.SVG_ICONS.delete.notSelected}
                    </button>
                }
                {
                    ! note.trashed &&
                    <button
                        className="duplicate"
                        onClick={() => props.onDuplicateNote(note)}
                        >{props.SVG_ICONS.duplicate.notSelected}
                    </button>
                }
                </article>
            )
        }
        </section>
    )
}
