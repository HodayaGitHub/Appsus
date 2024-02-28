// import {}
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { emailService } from '../services/mail.service.js'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { EmailFolderList } from '../cmps/EmailFolderList.jsx'
import { AppAside } from '../../../cmps/AppAside.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'
import { Pagination } from '../cmps/Pagination.jsx'


export function MailIndex() {

    const [emails, setEmails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromQueryString(searchParams))
    const [isFormVisible, setFormVisibility] = useState(false)
    const [emailsFromStorage, setEmailsToStorage] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const emailsPerPage = 5

    const indexOfLastEmail = currentPage * emailsPerPage
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage
    const currentEmails = emails ? emails.slice(indexOfFirstEmail, indexOfLastEmail) : []



    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        loadEmails()
        setSearchParams(filterBy)
        loadEmailsFromStorage()



        return () => {
            // console.log('Bye Bye')
        }
    }, [filterBy, currentPage])

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

    const [filterByLabel, setFilterByLabel] = useState(filterBy);

    useEffect(() => {
        onSetFilter(filterByLabel);
    }, [filterByLabel]);

    function onSetFilterByLabel(label) {
        setFilterByLabel((prevFilter) => {
            const updatedFilter = { ...prevFilter, label: label }; // Corrected property name

            return updatedFilter;
        });
    }

    function onStarredEmail(emailId) {
        emailService.starredEmail(emailId)
        loadEmails()
    }

    function onReadChange(emailId) {
        emailService.toggleReadEmail(emailId)
        loadEmails()
    }

    function onReadEmail(emailId) {
        emailService.readEmail(emailId)
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

                <div className="email-category-container">

                    <span class="email-category-item" onClick={() => onSetFilterByLabel('primary')}>
                        <span className="email-category material-symbols-rounded">inbox </span>
                        Primary
                    </span>

                    <span class="email-category-item" onClick={() => onSetFilterByLabel('promotions')}>
                        <span className="email-category material-symbols-rounded">sell</span>
                        Promotions
                    </span>

                    <span class="email-category-item" onClick={() => onSetFilterByLabel('social')}>
                        <span className="email-category material-symbols-rounded">group</span>
                        Social
                    </span>

                </div>

                <EmailList emails={emails}
                    onStarredEmail={onStarredEmail}
                    onRemoveEmail={onRemoveEmail}
                    onReadChange={onReadChange}
                    onReadEmail={onReadEmail} />

                <Pagination
                    emailsPerPage={emailsPerPage}
                    totalEmails={emails.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />

                <EmailFolderList
                    filterBy={{ status: filterBy.status }}
                    onSetFilter={onSetFilter} emails={emails}
                />





                {isFormVisible && <EmailCompose isFormVisible={isFormVisible} setFormVisibility={setFormVisibility} />}


            </main>
        </React.Fragment>

    )
}

