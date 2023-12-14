
const { useState } = React

export function EmailActions({ onRemoveEmail, onStarredEmail }) {
    const [isStarred, setIsStarred] = useState(false)

    const handleStarClick = (e) => {
        e.stopPropagation();
        onStarredEmail();
        setIsStarred((prevIsStarred) => !prevIsStarred)
    };

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
                onClick={handleStarClick}
                className={`email-btn star material-symbols-rounded ${isStarred ? 'starred' : ''}`}>
                star
            </button>
        </section>
    )
}