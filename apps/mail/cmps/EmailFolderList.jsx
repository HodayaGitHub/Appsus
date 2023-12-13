const { useState, useEffect } = React

export function EmailFolderList({ emails, filterBy, onSetFilter }) {
    console.log('filterBy', filterBy)
    const [filteredEmails, setFilteredEmails] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filteredEmails)
    }, [filteredEmails])

    function applyFilter(folderType) {
        let folderFilter = {} // Define folderFilter here

        console.log(folderType)
        switch (folderType) {
            case 'inbox':
                folderFilter = { to: 'user@appsus.com', removedAt: null }
                break
            case 'outbox':
                folderFilter = { from: 'user@appsus.com', removedAt: null }
                break
            case 'trash':
                folderFilter = { removedAt: { $ne: null } }
                break
            default:
                folderFilter = {}
                break
        }
        setFilteredEmails((prevFilter) => ({ ...prevFilter, ...folderFilter }))
    }

    return (
        <section className="actions-btns-container">
            <img
                className="email-btn"
                src="../../assets/img/icons/email-icons/inbox.svg"
                alt="Remove email"
                onClick={() => applyFilter('inbox')}
            />
            <img
                className="email-btn"
                src="../../assets/img/icons/email-icons/outbox.svg"
                alt="Remove email"
                onClick={() => applyFilter('outbox')}
            />
            <img
                className="email-btn"
                src="../../assets/img/icons/email-icons/trash.svg"
                alt="Remove email"
                onClick={() => applyFilter('trash')}
            />
        </section>
    )
}
