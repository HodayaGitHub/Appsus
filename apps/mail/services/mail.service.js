// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { emailsDataMockData } from '../mails.json.js'


const EMAIL_KEY = 'emails'
const SENT_EMAILS = 'sent_emails'
_createEmailsFromJson()

export const emailService = {
    getFilterFromQueryString,
    query,
    remove,
    // get,
    // save,
    getEmptyEmail,
    saveNewEmail,
    addSentEmailToLocalStorage,

}



console.log('check wires')


// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }

function getFilterFromQueryString(searchParams) {
    const txt = searchParams.get('txt') || ''
    return {
        txt,
    }
}



const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}



function _createEmailsFromJson() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                utilService.saveToStorage(EMAIL_KEY, emailsDataMockData.items);
                emails = emailsDataMockData.items
            }
            return emails
        })
        .catch(error => {
            console.error("Error in _createEmailsFromJson:", error)
            throw error
        })
}

function saveNewEmail() {


}

function getEmptyEmail(recipient = '', subject = '', message = '') {
    return { recipient, subject, message }
}

function query(filterBy) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                console.log(filterBy.txt)
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regExp.test(email.subject))
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

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}



function addSentEmailToLocalStorage(to, subject, body,) {
    console.log('item', email)
    // const bookInfo = item.volumeInfo
    const email = {
        id: utilService.makeId(),
        to,
        subject: subject || 'No subject',
        body: body || 'No inner message',
        isRead: false,
        sentAt: Math.floor(Date.now() / 1000),
        removedAt: null,
        from: 'momo@momo.com',
    }
    return save(email)
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
