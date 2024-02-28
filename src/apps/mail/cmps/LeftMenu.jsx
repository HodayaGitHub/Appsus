const buttons = [
    {
        class: 'email-btn',
        onClick: handleEmailComposeClick,
        icon: 'edit',
        text: 'Compose',
    },
    {
        class: 'email-btn',
        onClick: () => onSetFilterBy('inbox'),
        icon: 'inbox',
        text: 'Inbox',

    },
    {
        class: 'email-btn',
        onClick: () => onSetFilterBy('outbox'),
        icon: 'outbox',
        text: 'Outbox',

    },
    {
        class: 'email-btn',
        onClick: () => onSetFilterBy('trash'),
        icon: 'delete',
        text: 'Delete',

    },
    {
        class: 'email-btn',
        onClick: () => onSetFilterBy('starred'),
        icon: 'star',
        text: 'Starred',
    },
]
