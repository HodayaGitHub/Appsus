
export function NoteList(props) {

    if (! props.notes) return <section>Loading...</section>
    return (
        <section className="note-list">
        {
            props.notes.map(note =>
                <article key={note.id} style={{backgroundColor: note.color}}>
                    <h3>{note.title}</h3>
                    {
                        note.type === 'text' &&
                        <p>{note.text}</p>
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
                        >{note.pinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button
                        className="archive"
                        onClick={() => props.onArchiveNote(note)}
                        >{note.archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button
                        className="trash"
                        onClick={() => props.onTrashNote(note)}
                        >{note.trashed ? 'Untrash' : 'trash'}
                    </button>
                    <button
                        className="delete"
                        onClick={() => props.onDeleteNote(note.id)}
                        >Delete
                    </button>
                    <button
                        className="duplicate"
                        onClick={() => props.onDuplicateNote(note)}
                        >Duplicate
                    </button>
                </article>
            )
        }
        </section>
    )
}
