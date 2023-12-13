export function EmailPreview({ email }) {
    return (
        // <article className="email-preview">
        <React.Fragment>
            <span>{email.subject}</span>
            <span>{email.body}</span>
        </React.Fragment>

        // </article>
    )
}