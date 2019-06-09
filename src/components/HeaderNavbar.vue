<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar-dark bg-dark fixed-top">
        <b-navbar-brand href="#">elangulizer</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link class="nav-link" :to="{ name: 'new-journal-entry', params: { id: 1234 } }">Make A journal entry</router-link>
                <router-link class="nav-link" :to="{ name: 'relevant-journal-entries', params: { id: 1234 } }">Browse latest Entries</router-link>
                <router-link class="nav-link" :to="{ name: 'user-registration-page' }">Sign up</router-link>
                <router-link class="nav-link" :to="{ name: 'login-page', params: { id: 1234 } }">Login</router-link>
                <div class="nav-link" v-on:click="logout">Logout</div>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template slot="button-content"><em>User</em></template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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