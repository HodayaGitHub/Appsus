const { useState, useEffect } = React
import { EmailList } from './EmailList.jsx'


export function EmailFolderList({ emails, filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(folderType) {
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, status: folderType }

            return updatedFilter
        })
    }

    // function onSetFilterBy(folderType) {
    //     onSetFilter((prevFilter) => {
    //         const updatedFilter = { ...prevFilter, status: folderType }

    //         return updatedFilter
    //     })
    // }


    return (
        <React.Fragment>
            <section className="actions-btns-container">
                <img
                    className="email-btn"
                    src="../../assets/img/icons/email-icons/inbox.svg"
                    alt="Inbox"
                    onClick={() => onSetFilterBy('inbox')}
                />
                <img
                    className="email-btn"
                    src="../../assets/img/icons/email-icons/outbox.svg"
                    alt="Outbox"
                    onClick={() => onSetFilterBy('outbox')}
                />
                <img
                    className="email-btn"
                    src="../../assets/img/icons/email-icons/trash.svg"
                    alt="Trash"
                    onClick={() => onSetFilterBy('trash')}
                />
            </section>
        </React.Fragment>
    )
}
