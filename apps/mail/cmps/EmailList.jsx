// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { EmailActions } from './EmailActions.jsx'

import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onRemoveEmail, onStarredEmail }) {
    const [selectedEmailId, setSelectedEmailId] = useState(null)


    const toggleEmailPreview = (emailId) => {
        setSelectedEmailId(selectedEmailId === emailId ? null : emailId)
    }

    return (
        <div className="emails-container">
            {emails.map((email) => (
                <section
                    className={`clean-list email-item ${selectedEmailId === email.id ? 'selected' : ''}`}
                    key={email.id}
                    onClick={() => toggleEmailPreview(email.id)}
                >
                    {(selectedEmailId === email.id) && (
                        <EmailPreview
                            onRemoveEmail={() => onRemoveEmail(email.id)}
                            email={email}
                            onStarredEmail={() => onStarredEmail(email.id)}
                        />)}

                    {!(selectedEmailId === email.id) &&
                        (<React.Fragment>

                            <LongTxt txt={email.subject} length={20} />
                            <LongTxt txt={email.body} length={80} />

                            <EmailActions
                                onRemoveEmail={() => onRemoveEmail(email.id)}
                                onStarredEmail={() => onStarredEmail(email.id)}


                            />

                        </React.Fragment>
                        )}
                </section>
            ))}
        </div>
    )
}