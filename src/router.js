import Vue from 'vue'
import Router from 'vue-router'
import RelevantJournalEntries from './components/RelevantJournalEntries'
import UserRegistrationPage from './components/UserRegistrationPage'
import LoginPage from './components/LoginPage'
import JournalEntry from './components/JournalEntry'
import NewThread from './components/NewJournalEntry'

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
        }
    ]
})
