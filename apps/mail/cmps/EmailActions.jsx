export function EmailActions({ onRemoveEmail, onStarredEmail }) {


    return (
        <section className="actions-btns-container">

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onRemoveEmail()
                }}
                className="email-btn material-symbols-rounded">
                mail
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onRemoveEmail()
                }}
                className="email-btn material-symbols-rounded">
                delete
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onRemoveEmail()
                }}
                className="email-btn star material-symbols-rounded">
                star
            </button>
        </section>
    )
}