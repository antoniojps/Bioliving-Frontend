<template>

  <!-- TODO: Versao da nav com login efetuado -->

  <div class="nav">
    <router-link to="/">
      <div class="nav__brand" @click="redirectHome" style="padding:1rem">
        <div class="nav__brand--logo"></div>
      </div>
    </router-link>
    <!-- Mobile nav -->
    <div class="nav__right nav__right--mobile mobile">
      <div class="nav__right--links">
        <a href="#/home/login"><i class="fa fa-user size-lg paddingLarge" aria-hidden="true" @click="dialogVisibleProp = true"></i></a>
        <a href="#"><i class="fa fa-calendar size-lg paddingLarge" aria-hidden="true" ></i></a>
      </div>
    </div>
    <!-- Desktop nav -->
    <div class="nav__right desktop">

      <div class="nav__right--links">

        <div class="nav__user" v-if="auth">
          <el-popover ref="popover2" placement="bottom" width="200" trigger="hover">
            <ul class="nav__user--ul">
              <router-link to="../perfil" class="nav__user--link">
                <li><i class="fa fa-user-o"></i> Meu perfil</li>
              </router-link>
              <router-link to="../ajuda" class="nav__user--link">
                <li><i class="fa fa-info"></i> Ajuda</li>
              </router-link>
              <li>
                <div style="width:100%; height:100%" @click="logout"><i class="fa fa-sign-out"></i> Sair</div>
              </li>
            </ul>
          </el-popover>

          <router-link to="/perfil"><div class="nav__user--photo" v-popover:popover2>
          </div></router-link>
        </div>

        <el-tabs class="nav__tabs" v-model="nomeAtivo" @tab-click="handleClick">
          <el-tab-pane label="Eventos da Bioliving" name="/"></el-tab-pane>
          <el-tab-pane label="Criar Evento" name="criarEvento" v-if="colaboradorScope"></el-tab-pane>
          <el-tab-pane label="Gestão" name="gestao" v-if="adminScope"></el-tab-pane>
          <el-tab-pane label="Entrar" name="login" v-if="!auth"></el-tab-pane>
          <el-tab-pane label="Inscrever" name="inscrever" v-if="!auth"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <app-login-popup
      :dialogOpen="dialogVisibleProp"
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
    props: ['dialogVisible'],
    components: {
      'app-event-search': EventSearch,
      'app-login-popup': LoginPopup
    },
    data() {
      return {
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
          this.$router.push('/home/login');
          this.dialogVisibleProp = true;

        } else if (this.nomeAtivo === 'inscrever') {
          this.dialogTypeProp = 'Inscrever';
          this.$router.push('/home/inscrever');
          this.dialogVisibleProp = true;
        } else if (this.nomeAtivo === 'logout') {
          this.logout();
        } else if(this.nomeAtivo==='criarEvento'){
          this.$router.push('/criar-evento');
        } else if(this.nomeAtivo==='gestao'){
          this.$router.push('/gestao');
        }
      },
      redirectHome(){
        // redirecionar para index e atualiar active no menu
        this.$router.push('/');
        this.nomeAtivo = '/';
      },
      redirect(router){
        this.$router.push(router);
      },
      // Eventos dialogClose e dialogChange
      dialogClosed(){
        this.dialogVisibleProp = !this.dialogVisibleProp;
        this.$router.push('/');
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
          location.href = '/';
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
      ]),
      dialogVisibleProp(){
          return this.dialogVisible;
      }
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

    &__tabs {
      display: inline;
    }
    &__user {
      display: inline;
      &--photo {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        text-align: center;
        padding-top: 10px;
        transform: translateY(10%);
        cursor: pointer;
        background-image: url(http://loremflickr.com/50/50);
        background-color: $colorBg;
        border: $borderSize $colorBase7 solid;
        margin-right: $sizeBase;
        transition: all 250ms ease-in;
        &:hover{
          opacity:0.8;
          border:$borderSize*1.5 $colorVerde solid;
        }
      }
      &--link {
        text-decoration: none;
      }
      &--ul {
        list-style-type: none;

        li {
          padding: $spacingBase;
          font-size: $sizeBase;
          border: {
            top: $borderSize $colorBase7 solid;
          }
          color: $colorBase4;
          i {
            width: 10%;
            text-align: center;
            text-decoration: none;
            padding-right: $spacingSmall;
          }

        }
        li:hover {
          color: $colorVerde;
          cursor: pointer;
        }
      }
    }
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
      display: flex;
      align-items: baseline;
      justify-content: flex-end;

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

