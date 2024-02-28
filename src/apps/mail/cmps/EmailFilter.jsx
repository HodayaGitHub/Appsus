
import { useState, useEffect } from 'react';


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
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }



    const { txt } = filterByToEdit
    return (

        <section className="search-email">
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt"></label>
                <input value={txt}
                    onChange={handleChange}
                    type="text"
                    id="txt"
                    name="txt" 
                    placeholder="Search Email"
                    />


            </form>
            {console.log(txt)}
        </section>
    )
}