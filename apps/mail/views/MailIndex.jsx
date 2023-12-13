// import {}
const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

import { emailService } from '../services/mail.service.js'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { CreateEmail } from '../cmps/CreateEmail.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"




export function MailIndex() {

    const [emails, setEmails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromQueryString(searchParams))
    const [isFormVisible, setFormVisibility] = useState(false)

    const { txt } = filterBy

    useEffect(() => {
        loadEmails()
        // console.log(loadEmails())
        // console.log(filterBy)
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
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Error while trying to delete an email ${emailId}`)

            })

    }

    const handleCreateEmailClick = () => {
        setFormVisibility(prevVisibility => !prevVisibility)
    }


    if (!emails) return <div>Loading...</div>
    return (
        <main className="mail-index">


            <EmailFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
            <img
                className="email-btn create-email-btn"
                src="../../assets/img/icons/email-icons/plus.png"
                alt="compose email"
                onClick={handleCreateEmailClick}
            />

            {isFormVisible && <CreateEmail />}


        </main>
    )
}

