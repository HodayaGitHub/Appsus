// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { LongTxt } from '../../../cmps/LongTxt.jsx'

import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onRemoveEmail }) {
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
                    {(selectedEmailId === email.id) && (<EmailPreview email={email} />)}

                    {!(selectedEmailId === email.id) &&
                        (<React.Fragment>
                            <LongTxt txt={email.subject} length={20} />
                            <LongTxt txt={email.body} length={80} />

                            <section className="actions-btns-container">
                                <img
                                    className="email-btn"
                                    src="../../assets/img/icons/email-icons/delete.svg"
                                    alt="Remove email"
                                    onClick={() => onRemoveEmail(email.id)}
                                />

                                <img
                                    className="email-btn"
                                    src="../../assets/img/icons/email-icons/envelop.svg"
                                    alt="Remove email"
                                    onClick={() => onRemoveEmail(email.id)}
                                />

                                <img
                                    className="email-btn"
                                    src="../../assets/img/icons/email-icons/share.svg"
                                    alt="Remove email"
                                    onClick={() => onRemoveEmail(email.id)}
                                />
                            </section>
                        </React.Fragment>
                        )}
                </section>
            ))}
        </div>
    )
}