export function EmailPreview({ email }) {
    return (
        // <article className="email-preview">
        // <React.Fragment>
        <div>
            <h1>{email.subject}</h1>
            <span>{email.body}</span>

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
        </div>
        // </React.Fragment>

        // </article>
    )
}