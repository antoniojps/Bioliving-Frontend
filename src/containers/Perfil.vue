<template>
  <div>
    <el-row :gutter="24" style="margin-left:auto;margin-right:auto;" v-if="ajaxFeito">
      <div v-if="auth" v-cloak>
        <el-col class="perfil marginBottomLarge">
          <div class="perfil__lft">
            <div class="perfil--foto__wrapper">
              <div class="perfil--foto">
              </div>
            </div>
            <div class="perfil--titulo">
              <div class="perfil__estatutos">
                <el-estatuto></el-estatuto>
              </div>
              <h1>{{utilizador.nome}} {{utilizador.apelido}}</h1>
              <h2>{{utilizador.email}}</h2>
            </div>
          </div>
          <div class="perfil__rgt">
            <p><b>Utilizador desde: </b> 2017-06-04</p>
          </div>
        </el-col>
        <hr>
        <el-col :gutter="24" :xs="24" :sm="24" :md="12" :lg="12" class="paddingVertBase">
          <h2>Informações</h2>
          <el-form ref="utilizadorForm" :model="utilizadorForm" label-width="120px" label-position="left"
                   v-if="utilizador">
            <el-form-item label="Nome">
              <el-input v-model="utilizadorForm.nome" placeholder="Nome"></el-input>
            </el-form-item>

            <el-form-item label="Apelido">
              <el-input v-model="utilizadorForm.apelido" placeholder="Apelido"></el-input>
            </el-form-item>

            <el-form-item label="Genero">
              <el-select v-model="utilizadorForm.genero" placeholder="Genero">
                <el-option
                  v-for="genero in generos"
                  :key="genero.value"
                  :label="genero.label"
                  :value="genero.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Localização">
              <localizacao-input
                @localInput="guardarLocalId"
                :placeholder="utilizador.morada"
              ></localizacao-input>
            </el-form-item>

            <el-form-item label="Data de nascimento">
              <el-date-picker
                format="yyyy-MM-dd"
                v-model="utilizadorForm.dataNascimento"
                type="date"
                placeholder="Data de nascimento">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="Sobre mim pequeno">
              <el-input type="textarea" :rows="2" v-model="utilizadorForm.sobreMini"
                        placeholder="Descreve-te em poucas palavras"></el-input>
            </el-form-item>

            <el-form-item label="Sobre mim maior">
              <el-input type="textarea" :rows="5" v-model="utilizadorForm.sobre"
                        placeholder="Descreve-te com mais palavras"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">Atualizar</el-button>
            </el-form-item>

          </el-form>


          <div class="perfil--loading" v-if="!utilizador"
               v-loading="!utilizador"
               element-loading-text="A carregar perfil...">
          </div>
        </el-col>
        <el-col :gutter="24" :xs="24" :sm="24" :md="12" :lg="12" class="perfil--right paddingVertBase">
          <el-tabs type="card" @tab-click="tabClick">
            <el-tab-pane label="Interesses">
              <user-interesses v-if="ajaxFeito" :idUtilizador="idUtilizador"></user-interesses>
            </el-tab-pane>
            <el-tab-pane label="Certificados">
              <user-certificados v-if="ajaxFeito && certificadosActive" :idUtilizador="idUtilizador"></user-certificados>
            </el-tab-pane>
            <el-tab-pane label="Inscrições">
              <user-inscricoes v-if="ajaxFeito && inscricoesActive" :idUtilizador="idUtilizador"></user-inscricoes>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <div v-else v-cloak>
        <h3>Por favor faça login para aceder a esta página</h3>
      </div>
    </el-row>
  </div>
</template>

<script>

  import Estatuto from '../components/global/Estatuto/Estatuto.vue';
  import Interesses from '../components/interesses/Interesses.vue';
  import Certificados from '../components/Certificados/Certificados.vue';
  import Inscricoes from '../components/Inscricoes/Inscricoes.vue';
  import LocalizacaoInput from '../components/global/LocalizacaoSearch/LocalizacaoInput.vue';
  import {mapGetters} from 'vuex';
  import Helper from '../custom/Helpers';
  import moment from 'moment';

  export default {

    props:['query'],

    beforeUpdate(){
      if (!this.auth) {
        this.$router.replace('../');
      }
    },

    components: {
      'el-estatuto': Estatuto,
      'user-certificados' : Certificados,
      'user-inscricoes' : Inscricoes,
      'user-interesses': Interesses,
      'localizacao-input': LocalizacaoInput
    },


    data(){
      return {
        urlUtilizador: `utilizadores/${this.idUtilizador}`,
        generos: [
          {
            value: 1,
            label: 'Masculino'
          },
          {
            value: 0,
            label: 'Feminino'
          }
        ],
        utilizador: '',
        utilizadorForm: {
          nome: '',
          apelido: '',
          genero: '',
          dataNascimento: '',
          sobre: '',
          sobreMini: '',
          telemovel: '',
          idLocal: '',
        },
        ajaxFeito: false,
        requestAtivo: false,
        certificadosActive: false,
        inscricoesActive : false
      }
    },
    methods: {
      guardarLocalId(id){
        this.utilizadorForm.idLocal = id;
      },
      tabClick(tab, event){

        // Certificados
        if(tab.index==="1"){
          this.certificadosActive = true;
          // Interesses
        } else if(tab.index==="2"){
          this.inscricoesActive = true;
        }

        console.log(this.inscricoesActive);
      },
      onSubmit() {
        this.requestAtivo = true;
        if(this.utilizadorForm.genero === 'Masculino') this.utilizadorForm.genero = 1;
        else if(this.utilizadorForm.genero === 'Feminino') this.utilizadorForm.genero = 0;
        else {
          this.utilizadorForm.genero = this.utilizador.genero;
        }

        this.utilizadorForm.dataNascimento = moment(this.utilizadorForm.dataNascimento).format('YYYY-MM-DD');

        this.utilizadorForm.email = this.utilizador.email;

        Helper.limparObj(this.utilizadorForm);

        this.$Progress.start();

        this.$http.put(this.urlUtilizador, this.utilizadorForm).then(
          resposta => {
            this.$Progress.finish();
            this.$message({
              message: 'Perfil atualizado',
              type: 'success'
            });
            return resposta.json();

          }, resposta => {

            this.$Progress.fail();
            return resposta.json();

          }).then(data => {

        })

        this.requestAtivo = false;

      },
      getDados(){
        this.$http.get(this.urlUtilizador).then(resposta => {
          // 200 OK
          return resposta.json()
        }, resposta => {
          // erro
          return false;
        }).then((data) => {
          // dados
          this.utilizador = data.data[0];
          this.setDados();

        })
      },
      setDados(){
        this.utilizadorForm.nome = this.utilizador.nome ? this.utilizador.nome : '';
        this.utilizadorForm.apelido = this.utilizador.apelido ? this.utilizador.apelido : '';
        this.utilizadorForm.genero = this.utilizador.genero ? this.generoComputed : '';
        this.utilizadorForm.dataNascimento = this.utilizador.data_nascimento ? this.utilizador.data_nascimento : '';
        this.utilizadorForm.sobre = this.utilizador.sobre ? this.utilizador.sobre : '';
        this.utilizadorForm.sobreMini = this.utilizador.sobre_mini ? this.utilizador.sobre_mini : '';
        this.utilizadorForm.telemovel = this.utilizador.telemovel ? this.utilizador.telemovel : '';
      }
    },
    computed: {
      ...mapGetters([
        'getConcluido',
        'auth',
        'idUtilizador',
        'publicoScope',
        'normalScope',
        'socioScope',
        'colaboradorScope',
        'adminScope'
      ]),
      generoComputed(){
        if (this.utilizador.genero === "1") {
          return 'Masculino';
        } else if (this.utilizador.genero === "0") {
          return 'Feminino';
        }
      },
      generoUncomputed(){
        if (this.utilizadorForm.genero === 'Masculino') {
          return 1;
        } else if (this.utilizadorForm.genero === "Feminino") {
          return 0;
        }
      }
    },
    watch: {
      getConcluido(){
        if (this.getConcluido === false) {
          this.urlUtilizador = `utilizadores/${this.idUtilizador}`;
          this.getDados();
          this.ajaxFeito = true;
        }
      }
    }
  }
</script>

<style lang="scss">

  @import '../assets/scss/styles.scss';

  .perfil {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @include screen(sm) {
      flex-direction: row;
    }

    &--foto__wrapper {
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      @include screen(sm) {
        width: auto;
      }
    }
    &__lft {
      display: flex;
      flex-direction: column;
      h1, h2 {
        display: block;
        text-align: center;
        @include screen(sm) {
          text-align: left;
        }
      }
      @include screen(sm) {
        flex-direction: row;
      }
      align-items: flex-start;
    }

    &__rgt {
      display: flex;
      justify-content: center;
      p {
        display: block;
      }
      @include screen(sm) {
        justify-content: flex-start;
      }
    }

    &--foto {
      min-width: 120px;
      max-width: 120px;
      height: 120px;
      border-radius: 100%;
      border: $borderSize $colorBase7 solid;
      margin-right: 0;
      margin-bottom: $spacingLarge;

      @include screen(sm) {

        margin-right: $sizeXXLarge;

      }
      background-image: url(http://loremflickr.com/120/120);
      background-position: center;
      background-size: cover;
    }

    &--titulo {
      width: 100%;
      h1 {
        padding-bottom: $spacingSmall;
      }
    }

    &__estatutos {
      display: flex;
      justify-content: center;
      @include screen(sm) {
        justify-content: flex-start;
      }
    }

    &--loading {
      min-height: 20vh;

    }

    &--right {
      .el-tabs__nav {
        float: left;
      }
    }

  }
</style>

