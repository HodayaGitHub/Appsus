export function NoteList(props) {
    if (! props.notes) return <section>Loading...</section>
    return (
        <section className="note-list">
        {
            props.notes.map(note =>
                <article key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
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
