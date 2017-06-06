<template>
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Eventos da Bioliving" name="/"></el-tab-pane>
          <el-tab-pane label="Entrar" name="/login"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <app-login-popup
      :dialogOpen="dialogVisible"
      :dialogType="dialogType"
      @dialogClose="dialogClosed">

    </app-login-popup>

  </div>
</template>

<script>
  import EventSearch from '../event-search/EventSearch.vue';
  import LoginPopup from '../global/LoginPopup.vue';

  export default {
    components: {
      'app-event-search': EventSearch,
      'app-login-popup': LoginPopup
    },
    data() {
      return {
        activeName: this.$route.path,
        dialogVisible: false,
        dialogType: 'Entrar'
      };
    },
    methods: {
      // quando clicam numa lista do menu mudar route para essa
      handleClick(action) {
          if (this.activeName === '/') {
            this.$router.push('/');
          }
          else if(this.activeName==='/login'){
            this.dialogType ='Entrar';
            this.dialogVisible = true;
          } else {
            this.dialogType = 'Inscrever';
            this.dialogVisible = true;

          }
      },
      redirectHome(){
        // redirecionar para index e atualiar active no menu
        this.$router.push('/');
        this.activeName = this.$route.path;
      },
      dialogClosed(){
        this.dialogVisible = !this.dialogVisible;
        this.activeName = this.$route.path;
      }
    },
    created(){
      // definir menu activo antes de criar montar (Ver Vue Lifecycle)
      this.activeName = this.$route.path;
    },

    watch: {
      '$route'(to, from) {
        this.activeName = this.$route.path;
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

