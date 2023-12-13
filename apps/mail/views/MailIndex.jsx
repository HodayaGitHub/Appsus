// import {}
const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

import { emailService } from '../services/mail.service.js'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'


export function MailIndex() {

    const [emails, setEmails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromQueryString(searchParams))

    useEffect(() => {
        console.log(loadEmails())
        console.log(filterBy)
        setSearchParams(filterBy)

        return () => {
            console.log('Bye Bye')
        }
    }, [filterBy])

    function loadEmails() {
        emailService
            .query(filterBy)
            .then(emails => setEmails(emails))
            .catch(err => console.log('err:', err))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemoveEmail(emailId) {
        emailService.remove(emailId)
            .then(() => {
                setEmails(prevEmails => {
                    return prevEmails.filter(email => email.id !== emailId)
                })
                showSuccessMsg(`Email successfully removed! ${emailId}`)
            })
            .catch(err => console.log('err:', err))

    }

    const { txt } = filterBy

    if (!emails) return <div>Loading...</div>

    return (
        <div>
            <h1>mail app</h1>
            <EmailFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
            {console.log(emails)}
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />

        </div>
    )
}

