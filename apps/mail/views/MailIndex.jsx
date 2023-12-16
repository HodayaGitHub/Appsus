// import {}
const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

import { emailService } from '../services/mail.service.js'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { EmailFolderList } from '../cmps/EmailFolderList.jsx'
import { AppAside } from '../../../cmps/AppAside.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'



export function MailIndex() {

    const [emails, setEmails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromQueryString(searchParams))
    const [isFormVisible, setFormVisibility] = useState(false)
    const [emailsFromStorage, setEmailsToStorage] = useState(null)


    useEffect(() => {
        loadEmails()
        setSearchParams(filterBy)
        loadEmailsFromStorage()

        return () => {
            console.log('Bye Bye')
        }
    }, [filterBy])

    function loadEmails() {
        emailService
            .queryFilterBy(filterBy)
            .then(emails => setEmails(emails))
            .catch(err => console.log('err:', err))
    }

    function loadEmailsFromStorage() {
        emailService.query()
            .then(emailsSotrage => {
                setEmailsToStorage(emailsSotrage)
            })
    }


    function onRemoveEmail(emailId) {
        emailService.get(emailId)
            .then((email) => {
                console.log(email)
                if (!email.removedAt) {
                    email.removedAt = Math.floor(Date.now() / 1000)
                    console.log(email)
                    emailService.put(email)
                        .then((email) => {
                            console.log('email', email)
                            showSuccessMsg(`Email moved to trash ${emailId}`)
                            loadEmails()
                        })
                } else {
                    emailService.remove(emailId)
                        .then(() => {
                            console.log('emailId', emails.removedAt)
                            setEmails(prevEmails => {
                                return prevEmails.filter(email => email.id !== emailId)
                            })
                            showSuccessMsg(`Email successfully removed! ${emailId}`)
                        })
                        .catch(err => {
                            console.log('err:', err)
                            showErrorMsg(`Error while trying to delete an email ${emailId}`)
                        })
                }
            })
    }


    const handleEmailComposeClick = () => {
        setFormVisibility(prevVisibility => !prevVisibility)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


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


    function onStarredEmail(emailId) {
        emailService.starredEmail(emailId)
        loadEmails()
    }

    function onReadChange(emailId) {
        emailService.toggleReadEmail(emailId)
        loadEmails()

    }


    const buttons = [
        {
            class: 'email-btn',
            onClick: handleEmailComposeClick,
            icon: 'edit',
            text: 'Compose',
        },
        {
            class: 'email-btn',
            onClick: () => onSetFilterBy('inbox'),
            icon: 'inbox',
            text: 'Inbox',

        },
        {
            class: 'email-btn',
            onClick: () => onSetFilterBy('outbox'),
            icon: 'outbox',
            text: 'Outbox',

        },
        {
            class: 'email-btn',
            onClick: () => onSetFilterBy('trash'),
            icon: 'delete',
            text: 'Delete',

        },
        {
            class: 'email-btn',
            onClick: () => onSetFilterBy('starred'),
            icon: 'star',
            text: 'Starred',
        },
    ]


    if (!emails) return <div>Loading...</div>
    return (
        <React.Fragment>
            <AppHeader />
          
            <AppAside
                dynamicClass="material-symbols-rounded"
                buttons={buttons} />

            <main className="mail-index">

                <EmailFilter filterBy={{ txt: filterBy.txt }}
                    onSetFilter={onSetFilter} />


                <EmailList emails={emails}
                    onStarredEmail={onStarredEmail}
                    onRemoveEmail={onRemoveEmail}
                    onReadChange={onReadChange} />


                <EmailFolderList
                    filterBy={{ status: filterBy.status }}
                    onSetFilter={onSetFilter} emails={emails}
                />

                {isFormVisible && <EmailCompose isFormVisible={isFormVisible} setFormVisibility={setFormVisibility} />}


            </main>
        </React.Fragment>

    )
}

