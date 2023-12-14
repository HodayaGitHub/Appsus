
const { useState, useEffect } = React

export function ToDo(props) {
    // const [items, setItems] = useState(props.items)
    const [todoText, setTodoText] = useState('')

    function onChangeTodo(ev) {
        const value = ev.target.value
        setTodoText(value)
    }

    function onAddTodo() {
        props.onAddTodo(todoText)
        setTodoText('')
    }

    function onDeleteTodo(itemId) {
        console.log(itemId)
        props.onDeleteTodo(itemId)
    }
    
    return (
        <section className="todo">
            <ul>
            {
                props.items.map(item => {
                    return (
                        <li key={item.id}>
                            <span>{item.text}</span>
                            <button type="button" onClick={() => onDeleteTodo(item.id)}>x</button>
                        </li>
                    )
                })
            }
            </ul>
            <input type="text" name="new-todo" value={todoText} onChange={onChangeTodo} />
            <button type="button" onClick={onAddTodo}>Add</button>
        </section>
    )
}