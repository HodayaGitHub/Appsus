
export function AppSearch(props) {
    console.log(props)

    return (
        <form className="app-search" onSubmit={ev => ev.preventDefault()}>
            <button className="search-button">
                {props.SVG_ICONS.search.notSelected}
            </button>
            <input
                type="text"
                name="search-input"
                value={props.filterBy.string}
                onChange={ev => props.onSetFilterBy({ string: ev.target.value })}
            />
        </form>
    )
}