import { EmailActions } from './EmailActions.jsx'


export function EmailPreview({ email, onRemoveEmail }) {
    return (
        // <article className="email-preview">
        <React.Fragment>
            <div>
                <h1>{email.subject}</h1>
                <span>{email.body}</span>

                <EmailActions onRemoveEmail={onRemoveEmail} />

            </div>
        </React.Fragment>
        // </article>

    )
}