export const emailsDataMockData = () => {

    const emailsData = {
        "items": [
            {
                id: 'e101',
                subject: 'Meeting Tomorrow',
                body: `Let's discuss the agenda for our meeting tomorrow.`,
                isRead: false,
                sentAt: 1678133930594, 
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e102',
                subject: 'Weekend Plans',
                body: 'Any exciting plans for the weekend?',
                isRead: true,
                sentAt: 1678233930594, 
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e103',
                subject: 'Project Update',
                body: `Here's the latest update on our ongoing project.`,
                isRead: true,
                sentAt: 1678333930594, 
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e104',
                subject: 'Happy Birthday!',
                body: 'Wishing you a fantastic birthday filled with joy and laughter.',
                isRead: false,
                sentAt: 1678433930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e105',
                subject: 'Coffee Chat?',
                body: 'Would you be up for a coffee chat sometime this week?',
                isRead: false,
                sentAt: 1678533930594, 
                removedAt: null,
                from: 'user@appsus.com',
                to: 'momo@momo.com',
            },
            {
                id: 'e106',
                subject: 'New Project Proposal',
                body: 'Exciting new project proposal to discuss. Let me know your thoughts.',
                isRead: false,
                sentAt: 1678633930594, 
                removedAt: null,
                from: 'user@appsus.com',
                to: 'momo@momo.com',
            },
        ]
    }

    return Promise.resolve(emailsData);
}
