<template>
  <el-dialog
    :title="dialogTypeProp"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="handleClose">
        <span slot="footer" class="dialog-footer">

    <!-- TODO melhorar responsive dos botoes em mobile -->
          <!-- login form -->
         <el-form :model="formLogin" label-position="top" v-if="dialogTypeProp==='Entrar'">
    <el-form-item label="E-mail" :label-width="formLabelWidth">
      <el-input v-model="formLogin.email" auto-complete="off"></el-input>
    </el-form-item>
           <el-form-item label="Password" :label-width="formLabelWidth">
      <el-input v-model="formLogin.password" auto-complete="off" type="password"></el-input>
    </el-form-item>
  </el-form>
          <!-- /login form -->

          <!-- Register form -->
         <el-form :model="formRegister" label-position="top" v-if="dialogTypeProp==='Inscrever'">
    <el-form-item label="E-mail" :label-width="formLabelWidth">
      <el-input v-model="formRegister.username" auto-complete="off"></el-input>
    </el-form-item>
           <el-form-item label="Password" :label-width="formLabelWidth">
      <el-input v-model="formRegister.password" auto-complete="off" type="password"></el-input>
    </el-form-item>
  </el-form>
          <!-- /Register form -->

    <el-button type="text" v-if="dialogTypeProp==='Entrar'" @click="dialogTypeProp='Inscrever'">Não tem conta? Inscreva-se</el-button>
    <el-button type="text" v-if="dialogTypeProp==='Inscrever'" @click="dialogTypeProp='Entrar'">Já tem conta? Entrar</el-button>
    <el-button @click="handleClose">Cancelar</el-button>
    <el-button type="primary" @click="loginHandler" :loading="loggingIn">{{btnText}}</el-button>
  </span>
  </el-dialog>
</template>

<script>

  import {mapMutations,mapGetters} from 'vuex';
  import Autenticacao from './../../custom/autenticacao';


  export default {
    props: {
      dialogOpen: {
        type: Boolean,
        default: false
      },
      dialogType: {
        type: String
      }
    }
    ,
    data(){
      return {
        dialogTypeProp : this.dialogType,
        dialogOpenProp: this.dialogOpen,
        formLogin: {
          email: '',
          password: ''
        },
        loggingIn: false,
        formRegister: {
          nome:'',
          apelido:'',
          email:'',
          password: ''
        },
        formLabelWidth: '200px'
      }
    },
    computed: {
      dialogVisible(){
        return this.dialogOpen;
      },
      btnText(){
        return this.dialogTypeProp==='Inscrever' ? 'Inscrever' : 'Entrar' ;
      },
      ...mapGetters([
        'auth'
      ])
    },
    methods: {
      handleClose() {
        this.$emit('dialogClose');
      },
      // todo vue-resource send authorization request, obter JWT, verificar JWT e guardar na localstorage
      loginHandler(){
        if(this.dialogTypeProp === 'Entrar'){
          // LOGIN HANDLER
          console.log(this.auth);
          this.loggingIn = true;
          this.$Progress.start();

          // Enviar authorization request
          this.$http.post('login',{email:this.formLogin.email,password:this.formLogin.password}).then(resposta => {
            this.$Progress.finish();
            this.loggingIn = false;
            Autenticacao.autenticar();
            this.$emit('dialogClose');
            return resposta.json();
          }, resposta => {
            this.$Progress.fail();
            this.loggingIn = false;
            return resposta.json();
          }).then(data=>{
            console.log(data);
          })
          // Vuex Mutation state de acordo com resposta
        }
        // todo vue-resource para registrar, obter JWT, verificar JWT e guardar na localstorage
        else if(this.dialogTypeProp === 'Inscrever'){
          // LOGIN HANDLER
          // Enviar INSERT e Authorization request
          // Guardar WST
          // Mostrar componentes de loggado
        }
      }

    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

  .el-form--label-top .el-form-item__label {
    float: left;
  }

  .el-dialog__wrapper{
    min-width:$minWidth;
  }

  .el-dialog--tiny {
    width: 90%;

    @include screen(md) {
      width: 50%;
    }
    @include screen(lg) {
      width: 50%;
    }
    @include screen(xl) {
      width: 30%;
    }
  }

</style>

