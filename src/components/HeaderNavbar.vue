<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">indymorning</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'new-journal-entry', params: { id: 1234 } }">Make A journal entry</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'relevant-journal-entries', params: { id: 1234 } }">Browse latest Entries</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'user-registration-page' }">Sign up</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'login-page', params: { id: 1234 } }">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" v-on:click="logout">Logout</div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
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
                this.$router.push('BrowseListingsPage');
            },
            searchThreads: function() {
                this.$router.push('BrowseThreadsPage');
            }
        }
    }
</script>

<style scoped>

</style>