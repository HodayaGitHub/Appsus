// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { EmailActions } from './EmailActions.jsx'

import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onRemoveEmail, onStarredEmail, onReadChange }) {
    const [selectedEmailId, setSelectedEmailId] = useState(null)


    const toggleEmailPreview = (emailId) => {
        setSelectedEmailId(selectedEmailId === emailId ? null : emailId)
    }
    return (
        <div className="emails-container">

            {emails.length === 0 && (<div>'No email found'</div>)}

            {emails.map((email) => (
                <section
                    className={`clean-list email-item ${selectedEmailId === email.id ? 'selected' : ''}`}
                    key={email.id}
                    onClick={(event) => toggleEmailPreview(email.id, event)}
                >
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
                            <LongTxt txt={email.subject} length={20} />
                            <LongTxt txt={email.body} length={80} />

                            <EmailActions
                                email={email}
                                onRemoveEmail={() => onRemoveEmail(email.id)}
                                onStarredEmail={() => onStarredEmail(email.id)}
                                onReadChange={() => onReadChange(email.id)}
                            />
                        </React.Fragment>
                    )}
                </section>
            ))}
        </div>
    )
}