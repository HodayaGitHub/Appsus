export function SentAt({email, emailTimeStemp}) {

    const date = new Date(email.sentAt)

    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })


    return (

        <span className="sent-at">{formattedDate}</span>


    )

}