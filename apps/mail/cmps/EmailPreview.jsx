import { EmailActions } from './EmailActions.jsx'


export function EmailPreview({ email, onRemoveEmail, onStarredEmail, onReadChange }) {
    return (
        // <article className="email-preview">
        <React.Fragment>
            <div>
                <h1>{email.subject}</h1>
                <span>{email.body}</span>

                <EmailActions onRemoveEmail={onRemoveEmail} onStarredEmail={onStarredEmail} onReadChange={onReadChange} />

            </div>
        </React.Fragment>
        // </article>

    )
}