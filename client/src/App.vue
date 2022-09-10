<template>
  <div class="app">
    <nav-bar/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar},
  mounted() {
    if(localStorage.getItem('isAuth')) {
      this.$store.dispatch('checkIfUserAuth');
    }
  }
}
</script>

<style>
/** {*/
/*  box-sizing: border-box;*/
/*  padding: 0;*/
/*  margin: 0;*/
/*}*/
.app {
  padding: 2% 20%;
}
</style>