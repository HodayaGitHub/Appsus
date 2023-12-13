// import {EmailFilter} from './EmailFilter.jsx'
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onRemoveEmail }) {
    const ulProps = {
        className: "emails-list",
        title: 'EmailsList'
    }

    // console.log(ulProps)
    return (

        // <div>blah blah</div>
        // <ul {...ulProps} >
        <div className="emails-container">
            {emails.map(email =>
                <section className="clean-list email-item" key={email.id}>
                    <EmailPreview email={email} />
                    <section className="actions-btns-container">
                        <img className="email-btn" src="../../assets/img/icons/email-icons/trash.svg" alt="Remove email" onClick={() => onRemoveEmail(email.id)} />
                        <img className="email-btn" src="../../assets/img/icons/email-icons/envelop.svg" alt="Remove email" onClick={() => onRemoveEmail(email.id)} />
                        <img className="email-btn" src="../../assets/img/icons/email-icons/share.svg" alt="Remove email" onClick={() => onRemoveEmail(email.id)} />


                        {/* <button className="email-btn" onClick={() => onRemoveEmail(email.id)}>
                            <img src="../../assets/img/icons/email-icons/trash.svg" alt="Remove email" />
                        </button>
                        <button className="email-btn" onClick={() => onRemoveEmail(email.id)}>
                            <img src="../../assets/img/icons/email-icons/trash.svg" alt="Remove email" />
                        </button> */}

                    </section>
                </section>
            )}
        </div>
    )
}