// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { emailsDataMockData } from '../mails.json.js'


const EMAIL_KEY = 'emails'
_createEmailsFromJson()

export const emailService = {
    getFilterFromQueryString,
    query,
    // get,
    // remove,
    // save,

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


function query(filterBy) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                console.log(filterBy.txt)
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regExp.test(email.subject))
            }
            console.log('query' , emails)
            return emails
        })
}


function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}