// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { emailsDataMockData } from '../mails.json.js'


const EMAIL_KEY = 'emails'
const SENT_EMAILS = 'sent_emails'
_emailComposeFromJson()

export const emailService = {
    getFilterFromQueryString,
    query,
    remove,
    // get,
    // save,
    getEmptyEmail,
    // saveNewEmail,
    addSentEmailToLocalStorage,

}

console.log('check wires')

function getFilterFromQueryString(searchParams) {
    const txt = searchParams.get('txt') || ''
    const status = searchParams.get('status') || ''
    return {
        txt,
        status,
    }
}


const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStarred: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}



function _emailComposeFromJson() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                utilService.saveToStorage(EMAIL_KEY, emailsDataMockData.items);
                emails = emailsDataMockData.items
            }
            return emails
        })
        .catch(error => {
            console.error("Error in _emailComposeFromJson:", error)
            throw error
        })
}

function getEmptyEmail(recipient = '', subject = '', message = '') {
    return { recipient, subject, message }
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                console.log(filterBy.txt)
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regExp.test(email.subject))
            }

            if (filterBy.status === 'inbox') {
                emails = emails.filter(email => {
                    return email.to === loggedinUser.email && email.removedAt === null
                })

            } else if (filterBy.status === 'outbox') {
                emails = emails.filter(email => {
                    return email.from === loggedinUser.email && email.removedAt === null
                })
            } else if (filterBy.status === 'trash') {
                emails = emails.filter(email => {
                    return email.removedAt !== null
                })
            }
            // console.log('query' , emails)
            return emails
        })
}


function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

// function save(email) {
//     if (email.id) {
//         return storageService.put(EMAIL_KEY, email)
//     } else {
//         return storageService.post(EMAIL_KEY, email)
//     }
// }

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}




function addSentEmailToLocalStorage(to, subject, body) {
    // console.log('item', email)
    // const bookInfo = item.volumeInfo
    const email = {
        id: utilService.makeId(),
        to: to,
        from: 'momo@momo.com',
        subject: subject || 'No subject',
        body: body || 'No inner message',
        isRead: true,
        sentAt: Math.floor(Date.now() / 1000),
        removedAt: null,
        isStarred: false,
        labels: [],
    }
    return storageService.post(EMAIL_KEY, email)
}


// function sentEmail() {
//     console.log('item', email)
//     const email = {
//         // id: item.id,
//         id: utilService.makeId(),
//         subject: subject || 'No subject',
//         body: body || 'No inner message',
//         isRead: false,
//         sentAt: 1678233930594,
//         removedAt: null,
//         from: 'momo@momo.com',
//         to: 'user@appsus.com',

//     }
//     return save(email)
// }
