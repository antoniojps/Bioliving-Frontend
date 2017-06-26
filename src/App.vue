<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <app-nav :dialogVisible="login"></app-nav>
    <router-view class="app__content"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Nav from './components/global/Nav.vue';
  import Footer from './components/global/Footer.vue';

  export default {
    name: 'app',
    components: {
      'app-nav': Nav,
      'app-footer': Footer
    },
    computed:{
      login(){
        return this.$route.path === '/home/login' || this.$route.path === '/home/inscrever';
      }
    }
  }
</script>

<style lang="scss">
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .app__content {
    flex: 1;
  }

</style>
