export function EmailPreview({ email }) {
    return (
        <article className="email-preview">
            <span>{email.subject}</span>
        </article>
    )
}