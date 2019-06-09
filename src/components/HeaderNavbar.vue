<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar-dark bg-dark fixed-top">
        <b-navbar-brand href="#">elangulizer</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link class="nav-link" :to="{ name: 'new-journal-entry', params: { id: 1234 } }">Make A journal entry</router-link>
                <router-link class="nav-link" :to="{ name: 'relevant-journal-entries', params: { id: 1234 } }">Browse latest Entries</router-link>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
                    <template slot="button-content"><em>User</em></template>
                    <b-dropdown-item>
                        <router-link class="nav-link" :to="{ name: 'user-registration-page' }">Sign up</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link class="nav-link" :to="{ name: 'login-page', params: { id: 1234 } }">Login</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <div class="nav-link" v-on:click="logout">Logout</div>
                    </b-dropdown-item>
                </b-nav-item-dropdown>

            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'header-navbar',
        data: () => {
            return {}
        },
        methods: {
            logout: function() {
                this.$cookie.delete('jwt');
                this.$router.push('RelevantJournalEntries');
            },
        }
    }
</script>

<style scoped>

</style>