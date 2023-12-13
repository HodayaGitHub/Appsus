
const { useState, useEffect } = React


export function EmailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { txt} = filterByToEdit
    return (
        <section className="">
            <h2>Search an email</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">search email </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

                <button>Submit</button>
            </form>
        </section>
    )
}