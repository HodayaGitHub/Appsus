export function EmailPreview({ email }) {
    return (
        <article className="email-preview">
            <h2>Subject: {email.subject}</h2>
        </article>
    )
}