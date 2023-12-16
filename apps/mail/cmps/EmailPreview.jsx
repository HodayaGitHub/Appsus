import { EmailActions } from './EmailActions.jsx'


export function EmailPreview({ email, onRemoveEmail, onStarredEmail, onReadChange }) {

    const [name] = email.from.split('@')

    return (
        // <article className="email-preview">
        <React.Fragment>
            <div class="email-preview">
                
                <div className="email-preview-title">
                    <span className="email-subject">{email.subject}</span>
                    <EmailActions email={email}
                        onRemoveEmail={onRemoveEmail}
                        onStarredEmail={onStarredEmail}
                        onReadChange={onReadChange} />
                </div>

                <div className="sender-details">
                    <span><strong>{name}</strong></span>
                    <span>{`<${email.from}>`}</span>
                </div>

                <span className="email-body">{email.body}</span>


            </div>
        </React.Fragment>
        // </article>

    )
}