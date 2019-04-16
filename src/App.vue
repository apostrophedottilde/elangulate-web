<template>
  <div id="app">
    <header-navbar></header-navbar>
    <div class="row">
      <div class="col-2">

      </div>
      <div class="col-8">
        <router-view/>
      </div>
      <div class="col-2">

      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavbar from './components/HeaderNavbar'
import LoginPage from './components/LoginPage'
import UserRegistrationPage from './components/UserRegistrationPage'
import BrowseThreadsPage from './components/RelevantJournalEntries'
import JournalEntry from "./components/JournalEntry";

export default {
  name: 'app',
  components: {
    BrowseThreadsPage,
    UserRegistrationPage,
    HeaderNavbar,
    JournalEntry,
    LoginPage,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
  margin-top: 60px;
}
</style>
