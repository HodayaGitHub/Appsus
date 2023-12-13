// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onRemoveEmail }) {
    const ulProps = {
        className: "emails-list",
        title: 'EmailsList'
    }

    console.log(ulProps)
    return (

        // <div>blah blah</div>
        // <ul {...ulProps} >
        <ul>
            {emails.map(email =>
                <li className="clean-list" key={email.id}>
                    <EmailPreview email={email} />
                    <section>
                        <button className="email-btn" onClick={() => onRemoveEmail(email.id)}>
                            <img src="../../assets/img/icons/email-icons/trash.svg" alt="Remove email" />
                        </button>
                        {/* <button onClick={() => onRemoveEmail(email.id)}>Remove email</button> */}
                        {/* <button><Link to={`/email/${email.id}`}>Details</Link></button> */}
                        {/* <button><Link to={`/email/edit/${email.id}`}>Edit</Link></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}