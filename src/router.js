import Vue from 'vue'
import Router from 'vue-router'
import RelevantJournalEntries from './views/JournalEntriesHomePage'
import UserRegistrationPage from './views/UserRegistrationPage'
import LoginPage from './views/LoginPage'
import JournalEntry from './views/JournalEntryPage'
import NewThread from './views/NewJournalEntryPage'
import ChatPage from './components/ChatPage'


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: RelevantJournalEntries
        },
        {
            path: '/login',
            name: 'login-page',
            component: LoginPage
        },
        {
            path: '/user-registration',
            name: 'user-registration-page',
            component: UserRegistrationPage
        },
        {
            path: '/journal-entries/new',
            name: 'new-journal-entry',
            component: NewThread
        },
        {
            path: '/journal-entries/:threadId',
            name: 'journal-entry',
            component: JournalEntry,
            props: true
        },
        {
            path: '/journal-entries',
            name: 'relevant-journal-entries',
            component: RelevantJournalEntries
        },
        {
            path: '/chat',
            name: 'chat-page',
            component: ChatPage
        },
    ]
})
