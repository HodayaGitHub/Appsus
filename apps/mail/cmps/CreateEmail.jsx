import { emailService } from "../services/mail.service.js"
// const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function CreateEmail() {
    const [recipient, setRecipient] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value)
    }

    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <section className="create-email">
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipient">Recipient:</label>
                    <input
                        type="email"
                        id="recipient"
                        value={recipient}
                        onChange={handleRecipientChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={handleSubjectChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        required
                    />
                </div>
                <button type="submit">Send Email</button>

            </form>

        </section>
    )
}