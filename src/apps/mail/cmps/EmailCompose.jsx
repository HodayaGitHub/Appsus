import { emailService } from "../services/mail.service.js"
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';


import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"


export function EmailCompose({ isFormVisible, setFormVisibility }) {
    const [newEmail, setNewEmail] = useState(emailService.getEmptyEmail())
    const { recipient, subject, message } = newEmail
    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        console.log(field, ':', value)
        setNewEmail(prevEmail => ({ ...prevEmail, [field]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(newEmail)
        emailService
            .addSentEmailToLocalStorage(newEmail.recipient, newEmail.subject, newEmail.message)
            .then(() => {
                console.log(newEmail)
                showSuccessMsg(`Email sent successfully`)
                navigate('/mail')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg("Couldn't send email")
            })
    }

    const handleClose = () => {
        setFormVisibility(false)
    }

    return (
        isFormVisible &&
        <section className="compose-email-container main-layout">
            <div className="new-email-title">
                <span>New Email</span>
                <span className="compose-email-close" onClick={handleClose}>X</span>
            </div>

            <form className="compose-email" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="recipient">To:</label>
                    <input
                        type="email"
                        id="recipient"
                        name="recipient"
                        value={recipient}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message"></label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="send-btn-container"><button className="send-email-btn" type="submit">Send</button> </div>


            </form>

        </section>

    )
}