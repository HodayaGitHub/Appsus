import { useState, useEffect } from 'react';
import { EmailList } from './EmailList.jsx'
import { AppAside } from '../../../cmps/AppAside.jsx'

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

    // const buttons = [
    //     {
    //         label: 'Inbox',
    //         icon: '../../assets/img/icons/email-icons/inbox.svg',
    //         alt: 'Inbox',
    //         onClick: () => onSetFilterBy('inbox'),
    //     },
    //     {
    //         label: 'Outbox',
    //         icon: '../../assets/img/icons/email-icons/outbox.svg',
    //         alt: 'Outbox',
    //         onClick: () => onSetFilterBy('outbox'),
    //     },
    //     {
    //         label: 'Trash',
    //         icon: '../../assets/img/icons/email-icons/trash.svg',
    //         alt: 'Trash',
    //         onClick: () => onSetFilterBy('trash'),
    //     },
    // ]



    return 
        // <AppAside dynamicClass="" buttons={buttons} />
    
}
