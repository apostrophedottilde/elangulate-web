<template>
  <div id="app">
    <header-navbar></header-navbar>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-0">

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12">
        <router-view/>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-0">

      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavbar from './components/HeaderNavbar'

export default {
  name: 'app',
  components: {
    HeaderNavbar,
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
