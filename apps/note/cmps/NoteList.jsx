
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
                        className="delete"
                        onClick={() => props.onDeleteNote(note.id)}
                        >Delete
                    </button>
                </article>
            )
        }
        </section>
    )
}
