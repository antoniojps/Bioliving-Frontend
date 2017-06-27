<template>
  <el-dialog
    :title="dialogTypeProp"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="handleClose"
    v-if="!auth"
  >
        <span slot="footer" class="dialog-footer">

    <!-- TODO melhorar responsive dos botoes em mobile -->
          <!-- login form -->
         <el-form :model="formLogin" ref="formLogin" :rules="rulesLogin" label-position="top"
                  v-if="dialogTypeProp==='Entrar'" @keyup.enter.native="submitForm('formLogin')">

    <el-form-item label="E-mail" :label-width="formLabelWidth" prop="email">
      <el-input v-model="formLogin.email" auto-complete="off"></el-input>
    </el-form-item>
           <el-form-item label="Password" :label-width="formLabelWidth" prop="password">
      <el-input v-model="formLogin.password" auto-complete="off" type="password"></el-input>
    </el-form-item>
  </el-form>
          <!-- /login form -->

          <!-- Register form -->
         <el-form :model="formRegister" ref="formRegister" :rules="rulesRegister" label-position="top"
                  v-if="dialogTypeProp==='Inscrever'">
           <div class="pic-upload">
               <p v-if="formRegister.nome">{{formRegister.nome}} {{formRegister.apelido}}</p>
               <p v-else>Foto de perfil</p>
           <el-upload
             class="avatar-uploader"
             :class="{paddingBottom:imageUrl}"
             :action="uploadUrl"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
             <p class="faded size-sm" v-if="!imageUploaded"><i class="fa fa-file-image-o" aria-hidden="true"></i> Formato JPG ou PNG e máximo de 2MB </p>
               </div>
    <el-form-item label="Nome" :label-width="formLabelWidth" prop="nome" class="formLogin--inline" style="float:left">
      <el-input v-model="formRegister.nome" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Apelido" :label-width="formLabelWidth" prop="apelido" class="formLogin--inline">
      <el-input v-model="formRegister.apelido" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="E-mail" :label-width="formLabelWidth" prop="emailRegistro">
      <el-input v-model="formRegister.emailRegistro" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" :label-width="formLabelWidth" prop="passwordRegistro">
      <el-input v-model="formRegister.passwordRegistro" auto-complete="off" type="password"></el-input>
      <password-meter :password="formRegister.passwordRegistro"></password-meter>

    </el-form-item>

           <el-form-item label="Confirmação da Password" :label-width="formLabelWidth" prop="passwordNd">
      <el-input v-model="formRegister.passwordNd" auto-complete="off" type="password"></el-input>
    </el-form-item>


  </el-form>
          <!-- /Register form -->

    <el-button class="expandir marginBottom" @click="handleClose">Cancelar</el-button>
    <el-button type="primary" @click="submitForm('formLogin')" v-if="dialogTypeProp==='Entrar'" :loading="loggingIn">Entrar</el-button>
    <el-button
      type="primary"
      @click="submitForm('formRegister')"
      v-if="dialogTypeProp==='Inscrever'"
      :loading="loggingIn">
      Inscrever
    </el-button>
          <el-button
            class="expandir grey"
            v-if="dialogTypeProp==='Inscrever'"
            style="color:black"
            @click="$emit('dialogChange',['Entrar','login'])">
            Já tem conta? Entrar
          </el-button>
           <el-button v-if="dialogTypeProp==='Entrar'" @click="$emit('dialogChange',['Inscrever','inscrever'])"
                      class="expandir grey" style="color:black">Inscrever</el-button>
  </span>
  </el-dialog>
</template>

<script>

  import {mapMutations, mapGetters} from 'vuex';
  import Autenticacao from './../../../custom/autenticacao';
  import PasswordMeter from './PasswordMeter.vue';

  export default {
    components: {
      'password-meter': PasswordMeter
    },
    props: {
      dialogOpen: {
        type: Boolean,
        default: false
      },
      dialogType: {
        type: String
      },
      query: {
        type: String
      }
    }
    ,
    data(){

      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Por favor escreva a password'));
        } else {
          if (this.formRegister.passwordNd !== '') {
            this.$refs.formRegister.validateField('passwordNd')
          }
          callback();
        }
      };

      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Por favor escreva a password de novo'));
        } else if (value !== this.formRegister.passwordRegistro) {
          callback(new Error('As password não são iguais'));
        } else {
          callback();
        }
      };

      return {
        imageUrl: '',
        imageUploaded: false,
        dialogOpenProp: this.dialogOpen,
        formLogin: {
          email: '',
          password: ''
        },
        rulesLogin: {
          email: [
            {required: true, message: 'Por favor escreva o seu e-mail'},
            {type: 'email', message: 'Por favor escreva um email válido'}
          ],
          password: [
            {required: true, message: 'Por favor escreva a sua password'},
            {min: 8, message: 'A password tem de ter pelo menos 8 caractéres'}
          ]
        },
        loggingIn: false,
        loginSucedido: false,
        formRegister: {
          nome: '',
          apelido: '',
          emailRegistro: '',
          passwordRegistro: '',
          passwordNd: ''
        },
        rulesRegister: {
          // RegEx para todos os caracteres inclusive latins e outros com minimo de uma letra e maximo de 50 (50 é o que o Facebook utiliza e é limite da base de dados)
          // https://stackoverflow.com/questions/21170097/what-regular-expression-to-use-for-name-with-international-characters
          nome: [
            {required: true, message: 'Por favor escreva o seu nome'},
            {
              pattern: /^([a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ," "]{1,50})$/,
              message: 'Por favor escreva um nome válido'
            }
          ],
          apelido: [
            {required: true, message: 'Por favor escreva o seu apelido'},
            {
              pattern: /^([a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ," "]{1,50})$/,
              message: 'Por favor escreva um apelido válido'
            }
          ],
          emailRegistro: [
            {required: true, message: 'Por favor escreva o seu e-mail'},
            {type: 'email', message: 'Por favor escreva um e-mail válido'}
          ],
          passwordRegistro: [
            {required: true, message: 'Por favor escreva a sua password'},
            {min: 8, message: 'Por favor escreva uma password maior'},
            {validator: validatePass, trigger: 'blur'}]
          ,
          passwordNd: [
            {required: true, message: 'Por favor escreva a sua password'},
            {min: 8, message: 'Por favor escreva uma password maior'},
            {validator: validatePass2, trigger: 'blur'}]

        },
        formLabelWidth: '200px'
      }
    },
    computed: {
      dialogVisible(){
        return this.dialogOpen;
      },
      btnText(){
        return this.dialogTypeProp === 'Inscrever' ? 'Inscrever' : 'Entrar';
      },
      ...mapGetters([
        'auth'
      ]),
      uploadUrl(){
        return `${this.$http.options.root}/imagens/avatar`;
      },
      dialogTypeProp(){
        return this.dialogType;
      }

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUploaded = true;
        this.imageUrl = res.imagens.url;

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('Foto de perfil tem de ter o formato PNG ou JPG');
        }
        if (!isLt2M) {
          this.$message.error('Foto de perfil não pode exceder 1 MB de tamanho');
        }

        return (isJPG || isPNG ) && isLt2M;
      },

      handleClose() {

        this.$emit('dialogClose');
        this.$router.push({path: '/'})
      },
      // todo vue-resource send authorization request, obter JWT, verificar JWT e guardar na localstorage
      loginHandler(){
        if (this.dialogTypeProp === 'Entrar') {
          // LOGIN HANDLER
          console.log(this.auth);
          this.loggingIn = true;
          this.$Progress.start();

          // Enviar authorization request
          this.$http.post('login', {email: this.formLogin.email, password: this.formLogin.password}).then(
            resposta => {
              // Login bem sucedido
              this.$Progress.finish();
              this.loggingIn = false;
              Autenticacao.autenticar();
              this.handleClose();
              this.loginSucedido = true;
              return resposta.json();

            }, resposta => {

              // Login falhado

              this.loginSucedido = false;
              this.$Progress.fail();
              this.loggingIn = false;
              return resposta.json();

            }).then(data => {

            // Mostrar erro
            if (!this.loginSucedido) {
              this.$message({
                message: data.info,
                type: 'warning'
              });
            } else {
              this.$message({
                message: 'Bem-vindo!',
                type: 'success'
              });
            }
          })
          // Vuex Mutation state de acordo com resposta
        }
        else if (this.dialogTypeProp === 'Inscrever') {
          // Enviar authorization request
          this.$http.post('create', {
            email: this.formRegister.emailRegistro,
            password: this.formRegister.passwordRegistro,
            apelido: this.formRegister.apelido,
            nome: this.formRegister.nome
          }).then(
            resposta => {
              // Login bem sucedido
              this.$Progress.finish();
              this.loggingIn = false;
              Autenticacao.autenticar();
              this.handleClose();
              this.loginSucedido = true;
              return resposta.json();

            }, resposta => {

              // Login falhado

              this.loginSucedido = false;
              this.$Progress.fail();
              this.loggingIn = false;
              return resposta.json();

            }).then((data) => {

            // Mostrar erro
            if (!this.loginSucedido) {
              this.$message({
                message: data.info,
                type: 'warning'
              });
            } else {
              this.$message({
                message: 'Bem-vindo!',
                type: 'success'
              });
            }
          })
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loginHandler();
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .el-form--label-top .el-form-item__label {
    float: left;
  }

  .pic-upload {
    width: 100%;
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed $colorBase4;
    width: auto;
    padding: $spacingBase;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: $colorVerde;
  }

  .avatar-uploader-icon {
    font-size: $sizeMedium;
    color: $colorBase6;
    width: $spacingLarge * 3;
    height: $spacingLarge * 3;
    line-height: $spacingLarge * 3;
    text-align: center;
  }

  .avatar {
    width: $spacingLarge * 4;
    height: $spacingLarge * 4;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
  }

  .formLogin {
    &--inline {
      width: 49%;
      text-align: left;
      display: inline-block;

    }
  }


</style>

