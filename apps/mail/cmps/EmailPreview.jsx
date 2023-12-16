import { EmailActions } from './EmailActions.jsx'


export function EmailPreview({ email, onRemoveEmail, onStarredEmail, onReadChange }) {
    return (
        // <article className="email-preview">
        <React.Fragment>
            <div>
                <span className="email-subject">{email.subject}</span>
                <span>{email.body}</span>

                <EmailActions email={email} onRemoveEmail={onRemoveEmail} onStarredEmail={onStarredEmail} onReadChange={onReadChange} />

            </div>
        </React.Fragment>
        // </article>

    )
}