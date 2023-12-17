// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { EmailActions } from './EmailActions.jsx'
import { EmailPreview } from './EmailPreview.jsx'
import { SentAt } from './SentAt.jsx'

export function EmailList({ emails, onRemoveEmail, onStarredEmail, onReadChange, onReadEmail }) {
    const [selectedEmailId, setSelectedEmailId] = useState(null)

    const toggleEmailPreview = (emailId) => {
        setSelectedEmailId(selectedEmailId === emailId ? null : emailId)
    }

    const handleStarClick = (e, emailId) => {
        e.stopPropagation()
        onStarredEmail(emailId)
    }



    return (
        <div className="emails-container">

            {emails.length === 0 && (
                <div className="no-results">
                    No messages matching your search were found.
                </div>
            )}

            {emails.map((email) => (
                <section
                    className={`clean-list email-item ${selectedEmailId === email.id ? 'selected' : ''} ${email.isRead ? 'read' : 'unread'}`}
                    key={email.id}
                    onClick={(event) => toggleEmailPreview(email.id, event)}
                >


                    {(selectedEmailId === email.id) && (
                        < EmailPreview
                            // onClick={onReadEmail(email.id)}
                            onRemoveEmail={() => onRemoveEmail(email.id)}
                            email={email}
                            onStarredEmail={() => onStarredEmail(email.id)}
                            onReadChange={() => onReadChange(email.id)}
                            onReadEmail={() => onReadEmail(email.id)}
                        />
                    )}

                    {!(selectedEmailId === email.id) && (
                        <React.Fragment>
                            <span
                                onClick={(e) => handleStarClick(e, email.id)}
                                className={`email-btn star material-symbols-rounded ${email.isStarred ? 'starred' : ''}`}>
                                star
                            </span>
                            <LongTxt dynamicClass="email-subject" txt={email.subject} length={20} />
                            <LongTxt dynamicClass="email-content" txt={email.body} length={120} />
                            <SentAt email={email}></SentAt>

                            {/* <EmailActions
                                email={email}
                                onRemoveEmail={() => onRemoveEmail(email.id)}
                                onStarredEmail={() => onStarredEmail(email.id)}
                                onReadChange={() => onReadChange(email.id)}
                            /> */}
                        </React.Fragment>
                    )}
                </section>
            ))}
        </div>
    )
}