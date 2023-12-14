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

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    const { txt, status } = filterBy

    useEffect(() => {
        loadEmails()
        setSearchParams(filterBy)
        loadEmailsFromStorage()
        // console.log('emails', emails)
        // loadEmailsFromStorage()

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
        // console.log('emails from storage', emailsFromStorage)
        // console.log('emailId', emailId)
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


    const buttons = [
        {
            label: 'Inbox',
            icon: '../../assets/img/icons/email-icons/inbox.svg',
            alt: 'Inbox',
            onClick: () => onSetFilterBy('inbox'),
        },
        {
            label: 'Outbox',
            icon: '../../assets/img/icons/email-icons/outbox.svg',
            alt: 'Outbox',
            onClick: () => onSetFilterBy('outbox'),
        },
        {
            label: 'Trash',
            icon: '../../assets/img/icons/email-icons/trash.svg',
            alt: 'Trash',
            onClick: () => onSetFilterBy('trash'),
        },
    ]



    if (!emails) return <div>Loading...</div>
    return (
        <React.Fragment>
            <AppHeader />
            <AppAside dynamicClass="" buttons={buttons} />

            <main className="mail-index">

                <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
                <img
                    className="email-btn compose-email-btn"
                    src="../../assets/img/icons/email-icons/plus.png"
                    alt="compose email"
                    onClick={handleEmailComposeClick}
                />

                <EmailFolderList
                    filterBy={filterBy}
                    onSetFilter={onSetFilter} emails={emails}
                />

                {isFormVisible && <EmailCompose />}


            </main>
        </React.Fragment>

    )
}

