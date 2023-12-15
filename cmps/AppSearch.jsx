
const { useState } = React

export function AppSearch(props) {
    const [searchString, setSearchString] = useState('')

    function onChangeSearchString(ev) {
        const newSearchString = ev.target.value
        console.log(newSearchString)
        setSearchString(newSearchString)
    }

    function onSubmitSearch(ev) {
        ev.preventDefault()
        props.onSetFilterBy({ string: searchString })
    }

    return (
        <form className="app-search" onSubmit={onSubmitSearch}>
            <button className="search-button">
                Search
            </button>
            <input type="text" name="search-input" value={searchString} onChange={onChangeSearchString} />
        </form>
    )
}