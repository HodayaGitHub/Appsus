// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { emailsDataMockData } from '../mails.json.js'


const EMAIL_KEY = 'emails'
_createEmailsFromJson()

export const mailService = {
    // query,
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
    return emailsDataMockData().then(emailsData => {
        let emails = utilService.loadFromStorage(EMAIL_KEY)
        if (!emails || !emails.length) {
            utilService.saveToStorage(EMAIL_KEY, emailsData.items)
            emails = emailsData.items
        }
        console.log(emails)
        return emails
    }).catch(error => {
        console.error('Error loading emails:', error);
        return []
    })
}




function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}