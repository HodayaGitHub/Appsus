import { useState } from 'react';

export function EmailActions({ onRemoveEmail, onStarredEmail, onReadChange, email }) {

    const handleStarClick = (e) => {
        e.stopPropagation()
        onStarredEmail()
    }

    return (
        <section className="actions-btns-container">

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onReadChange()
                }}
                className={`email-btn material-symbols-rounded ${email.isRead ? 'read' : 'unread'}`}>
                {console.log(email)}
                {email.isRead ? 'drafts' : 'mail'}
            </button>

            <button
                onClick={handleStarClick}
                className={`email-btn star material-symbols-rounded ${email.isStarred ? 'starred' : ''}`}>
                star
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onRemoveEmail()
                }}
                className="email-btn material-symbols-rounded">
                delete
            </button>


        </section>
    )
}