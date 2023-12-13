import { emailService } from "../services/mail.service.js"
// const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
import { UserMsg } from "./cmps/UserMsg.jsx"


export function CreateEmail() {
    const [newEmail, setNewEmail] = useState(emailService.getEmptyEmail())
    const { recipient, subject, message } = newEmail

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
          .addSentEmailToLocalStorage(...newEmail)
          .then(() => {
            console.log(newEmail)
            showSuccessMsg(`Email sent successfully`)
          })
          .catch(err => {
            console.log('err:', err)
            showErrorMsg("Couldn't send email")
          })
      }






      


    return (
        <section className="create-email">

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipient">Recipient:</label>
                    <input
                        type="email"
                        id="recipient"
                        name="recipient"
                        value={recipient}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
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
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Send Email</button>

            </form>

        </section>

    )
}