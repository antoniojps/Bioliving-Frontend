<template>

  <!-- TODO: Versao da nav com login efetuado -->

  <div class="nav">
    <div class="nav__brand" @click="redirectHome">
      <div class="nav__brand--logo"></div>
    </div>
    <!-- Mobile nav -->
    <div class="nav__right nav__right--mobile mobile">
      <div class="nav__right--search">
      </div>
      <div class="nav__right--links">
        <i class="fa fa-search size-lg paddingLarge" aria-hidden="true"></i>
        <i class="fa fa-user size-lg paddingLarge" aria-hidden="true" @click="dialogVisible = true"></i>
      </div>
    </div>
    <!-- Desktop nav -->
    <div class="nav__right desktop">
      <div class="nav__right--search">
        <app-event-search></app-event-search>
      </div>
      <div class="nav__right--links">
        <el-tabs v-model="nomeAtivo" @tab-click="handleClick">
          <el-tab-pane label="Eventos da Bioliving" name="/"></el-tab-pane>
          <el-tab-pane label="Entrar" name="login" v-if="!auth"></el-tab-pane>
          <el-tab-pane label="Inscrever" name="inscrever" v-if="!auth"></el-tab-pane>
          <el-tab-pane label="Sair" name="logout" v-if="auth"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <app-login-popup
      :dialogOpen="dialogVisible"
      :dialogType="dialogTypeProp"
      @dialogClose="dialogClosed"
      @dialogChange="dialogChanged"
    >
    </app-login-popup>

  </div>
</template>

<script>

  // Helpers Vuex
  import {mapGetters} from 'vuex';

  // Autenticacao Helpers
  import Autenticacao from './../../custom/autenticacao';


  //Componentes
  import EventSearch from '../event-search/EventSearch.vue';
  import LoginPopup from '../global/LoginPopup/LoginPopup.vue';

  export default {
    components: {
      'app-event-search': EventSearch,
      'app-login-popup': LoginPopup
    },
    data() {
      return {
        dialogVisible: false,
        dialogTypeProp: 'Entrar',
        nomeAtivo: '/'
      };
    },
    methods: {

      // quando clicam numa lista do menu mudar route para essa
      handleClick() {
        if (this.nomeAtivo === '/') {
          this.$router.push('/');
        }
        else if (this.nomeAtivo === 'login') {
          this.dialogTypeProp = 'Entrar';
          this.dialogVisible = true;
        } else if (this.nomeAtivo === 'inscrever') {
          this.dialogTypeProp = 'Inscrever';
          this.dialogVisible = true;
        } else if (this.nomeAtivo === 'logout') {
           this.logout();
        }
      },
      redirectHome(){
        // redirecionar para index e atualiar active no menu
        this.$router.push('/');
        this.nomeAtivo = '/';
      },
      // Eventos dialogClose e dialogChange
      dialogClosed(){
        this.dialogVisible = !this.dialogVisible;
        this.nomeAtivo = '/';
      },
      dialogChanged(dados){
        this.dialogTypeProp = dados[0];
        this.nomeAtivo = dados[1];

      },
      // Login feito
      logout(){
        this.$Progress.start();
        this.$http.delete('login').then((response) => {
          return Autenticacao.autenticar();
        }).then(response => {
          this.$Progress.finish();
          this.$message({
            message: 'Até à próxima!',
            type: 'success'
          });
        })
      }
    },
    mounted(){
      // definir menu activo antes de montar (Ver Vue Lifecycle)
      this.nomeAtivo = this.$route.path;
    },

    watch: {
      '$route'(to, from) {
        this.activeName = this.$route.path;
      }
    },
    computed: {
      // spread operator
      ...mapGetters([
        'auth',
        'idUtilizador',
        'publicoScope',
        'normalScope',
        'socioScope',
        'colaboradorScope',
        'adminScope'
      ])
    }

  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

  .nav {
    width: 100%;
    min-width: 315px;
    margin-bottom: $spacingLarge;
    border-bottom: $borderSize $colorBase7 solid;
    display: flex;
  }

  .nav__brand {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-right: $borderSize $colorBase7 solid;
    padding: 0;
    @include screen(md) {
      padding: $spacingBase;
    }
    &--logo {
      margin: $spacingBase;
      width: 60px;
      height: 36px;
      background: {
        image: url('http://imgh.us/bioliving-logo.svg');
      }
    }
  }

  .nav__right {
    display: flex;
    align-items: center;
    width: 100%;
    padding: $spacingLarge;

    &--mobile {
      padding: 0
    }

    & i {
      color: $colorBase6;
      transition: all .4s;
      &:hover, &:focus {
        color: $colorBase;

      }
      &:active {
        color: $colorVerde;
      }
    }

    &--search {
      flex-grow: 1;
      padding-right: $spacingBase;
    }

    &--links {
      flex-grow: 15;
      padding: {
        left: $spacingBase;
        right: $spacingBase;
      }
      text-align: right;

      ul {
        list-style-type: none;
        li {
          display: inline;
          padding: {
            left: $spacingLarge;
          }
        }
      }

    }
  }

  // Element UI Customizações

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__header {
    border-bottom: 0;
  }

  .el-tabs__nav {
    float: right;
  }

  .el-tabs__item.is-active {
    color: $colorVerde;
  }

  .el-tabs__active-bar {
    background-color: $colorVerde;
  }

  .el-input__inner:focus {
    border-color: $colorVerde;
  }

  .el-dialog__body {
    padding: $sizeBase;
  }

  .el-form--label-top .el-form-item__label {
    float: left;
  }

  .el-dialog--tiny {
    width: 90%;

    @include screen(md) {
      width: 50%;
    }
    @include screen(lg) {
      width: 50%;
    }
    @include screen(lg) {
      width: 30%;
    }
  }

</style>

