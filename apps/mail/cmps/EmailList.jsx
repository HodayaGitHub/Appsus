// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { EmailActions } from './EmailActions.jsx'
import { EmailPreview } from './EmailPreview.jsx'
import { SentAt } from './SentAt.jsx'

export function EmailList({ emails, onRemoveEmail, onStarredEmail, onReadChange }) {
    const [selectedEmailId, setSelectedEmailId] = useState(null)


    const toggleEmailPreview = (emailId) => {
        setSelectedEmailId(selectedEmailId === emailId ? null : emailId)
    }
    return (
        <div className="emails-container">

            {emails.length === 0 && (<div>'No emails found'</div>)}

            {emails.map((email) => (
                <section
                    className={`clean-list email-item ${selectedEmailId === email.id ? 'selected' : ''} ${email.isRead ? 'read' : 'unread'}`}
                    key={email.id}
                    onClick={(event) => toggleEmailPreview(email.id, event)}

                >

                    {/* <button
                onClick={handleStarClick}
                className={`email-btn star material-symbols-rounded ${email.isStarred ? 'starred' : ''}`}>
                star
            </button> */}
                    {(selectedEmailId === email.id) && (
                        <EmailPreview
                            onRemoveEmail={() => onRemoveEmail(email.id)}
                            email={email}
                            onStarredEmail={() => onStarredEmail(email.id)}
                            onReadChange={() => onReadChange(email.id)}

                        />
                    )}

                    {!(selectedEmailId === email.id) && (
                        <React.Fragment>
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