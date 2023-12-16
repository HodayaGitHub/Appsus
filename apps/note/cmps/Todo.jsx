

export function ToDo(props) {
    
    return (
        <section className="todo">
            <ul>
            {
                props.items.map(item => {
                    return (
                        <li key={item.id}>
                            <span>{item.text}</span>
                            <button
                                type="button"
                                onClick={() => props.onDeleteTodoItem(item.id)}
                            >
                                x
                            </button>
                        </li>
                    )
                })
            }
            </ul>
        </section>
    )
}