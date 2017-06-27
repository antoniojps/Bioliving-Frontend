<template>
  <el-row :gutter="24" v-if="colaboradorScope" style="margin-left:auto;margin-right:auto;">

    <el-col :gutter="24" :xs="24" :sm="24" :md="24" :lg="24">
      <h1>Criar Evento</h1>

      <div class="criarEvento">
        <div class="criarEvento__steps">
          <el-steps :space="200" :active="passo" class="steps__margin--fix">
            <el-step title="Facebook" description="Sincronizar"></el-step>
            <el-step title="Nome" description="data..."></el-step>
            <el-step title="Foto" description="preço..."></el-step>
            <el-step title="Descrição" description="participantes..."></el-step>
          </el-steps>
        </div>
      </div>
    </el-col>

    <el-col :gutter="24" :xs="24" :sm="24" :md="24" :lg="24" class="marginVertBase criarEventoCol" v-if="passo===1">
      <!-- Sincronizar facebook -->
      <div class="criarEvento__st">
        <h3>Sincronizar com os eventos do facebook</h3>
        <el-input placeholder="https://www.facebook.com/events/..." v-model="facebookUrl" style="width:50%;"></el-input>

        <!-- loading -->
        <div style="width:100%;min-height:10vh;" v-if="facebookLoading" v-loading="facebookLoading"
             element-loading-text="Loading..."></div>

        <!-- get feito -->
        <p class="paddingVertLarge" v-if="!facebookSincronizado">
          Submeta aqui o link do evento para sincronizar os dados.</p>

        <p class="paddingVertLarge" v-else>
          Facebook sincronizado!</p>

        <!-- /Sincronizar facebook -->
      </div>
    </el-col>

    <el-col :gutter="24" :xs="24" :sm="24" :md="24" :lg="24" class="marginVertBase criarEventoCol" v-if="passo===2">
      <!-- Sincronizar facebook -->

      <div class="criarEvento__nd">

        <p>Nome do evento</p>
        <el-input placeholder="Nome do evento" v-model="formEvento.nomeEvento" style="width:auto"></el-input>

        <div class="block">
          <p>Data do Evento</p>
          <el-date-picker
            v-model="formEvento.data"
            type="datetime"
            placeholder="Pick a day">
          </el-date-picker>
        </div>
        <div class="block">
          <p style="margin-top:.5rem">Data do Fim</p>
          <el-date-picker
            v-model="formEvento.dataFim"
            type="datetime"
            placeholder="Pick a day">
          </el-date-picker>
        </div>

        <p style="margin-top:.5rem; padding-bottom: 0;">Localização</p>
        <div
          class="marginVertBase center">
          <localizacao-input @localInput="setLocal" placeholder="Local do evento"></localizacao-input>
          </div>
        <p>Tipo de evento</p>
        <el-select v-model="tipoDeEventoSelect" placeholder="Select" class="expandir">
          <el-option
            v-for="item in tiposDeEventos"
            :key="item.id_tipo_evento"
            :label="item.nome_tipo_evento"
            :value="item.id_tipo_evento"
          >
          </el-option>
        </el-select>
        </div>
    </el-col>


    <div v-if="passo===3">
      <el-col :gutter="24" :xs="24" :sm="12" :md="12" :lg="12" class="marginVertBase">
        <div class="criarEvento__rd criarEvento__rd--lft">
          <p>Pequena descrição</p>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Escreva uma pequena descrição..."
            v-model="formEvento.descricaoPeq">
          </el-input>
        </div>
      </el-col>
      <el-col :gutter="24" :xs="24" :sm="12" :md="12" :lg="12" class="marginVertBase">
        <div class="criarEvento__rd criarEvento__rd--rgt">
          <p>Imagem do evento</p>

          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <p class="paddingVertBase" v-if="!formEvento.preco">Preço em €</p>
          <p class="paddingVertBase" v-else>Preço {{formEvento.preco}}€</p>
          <el-input-number v-model="formEvento.preco" :min="0" ></el-input-number>

          <p class="paddingVertBase">Desconto sócio?
            <el-switch
              class="marginBase"
              v-model="descontoSocio"
              on-text=""
              off-text=""
              on-color="#20a0ff">
            </el-switch>
          </p>
          <div v-if="descontoSocio">
            <el-input-number size="small" v-model="formEvento.descontoSocio" :min="0" :max="100"></el-input-number>
            <p class="paddingVertBase">Desconto: {{formEvento.descontoSocio}}%</p>
            <p>Preço do sócio: €{{formEvento.preco - (formEvento.preco * formEvento.descontoSocio / 100)}}</p>

          </div>
        </div>
      </el-col>
    </div>

    <el-col :gutter="24" :xs="24" :sm="24" :md="24" :lg="24" class="marginVertBase" v-if="passo===4">
      <div class="criarEvento__th">
        <div class="criarEvento__th--input paddingVertBase">
          <p>Descrição</p>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Escreva uma pequena descrição..."
            v-model="formEvento.descricao">
          </el-input>
          <div class="criadorPart">
            <div class="criadorPart__max">
              <p>Máx. Participantes</p>
              <el-input placeholder="Máximo de participantes" v-model="formEvento.maxParticipantes"></el-input>
            </div>
            <div class="criadorPart__min">
              <p>Min. Participantes</p>
              <el-input placeholder="Minimo de participantes" v-model="formEvento.minParticipantes"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-col>

    <el-col>
      <el-button-group class="btn--passos">


        <el-button type="primary" size="small" icon="arrow-left" @click="antPasso" style="width:40%"
                   class="btn--passos__mobile">
          Previous Page
        </el-button>


        <el-button type="primary" size="small" class="btn--passos__mobile" style="width: 40%" @click="proxPasso"
                   v-if="passo!==4">
          Next Page
          <i class="el-icon-arrow-right el-icon-right"></i></el-button>

        <el-button type="primary" size="small" class="btn--passos__mobile" style="width: 40%" @click="postEvento"
                   v-else>
          Criar evento
          <i class="el-icon-arrow-right el-icon-right"></i></el-button>

      </el-button-group>
    </el-col>


  </el-row>

  <el-row style="margin-left:auto;margin-right:auto; min-height:100%;" v-else>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="gestao__nav">
      <h1 style="text-align:center" class="paddingLarge">Sem acesso</h1>
    </el-col>
  </el-row>

</template>

<script>
  import {mapGetters} from 'vuex';
  import lodashDebounce from 'lodash.debounce';
  import LocalizacaoInput from '../components/global/LocalizacaoSearch/LocalizacaoInput.vue'
  import TipoEvento from '../components/TipoEvento/TipoEvento.vue'
  import H from '../custom/Helpers';
  import moment from 'moment';
  export default {

    mounted(){
      this.$http.get('tiposEventos').then(
        resposta => {
          // Ok


          return resposta.json();
        }, resposta => {
          // Erro

        }).then(data => {
        this.tiposDeEventos = data.data;
      })
    },

    components: {
      'localizacao-input': LocalizacaoInput,
      'tipo-evento-input': TipoEvento
    },

    data(){
      return {
        totalDesconto: 0,
        descontoSocio: false,
        dialogImageUrl: '',
        dialogVisible: false,
        passo: 1,
        formEvento: {
          nomeEvento: '',
          data: '',
          dataFim: '',
          idLocal: '',
          tipoEvento: '',
          tipoEventoIco: '',
          descricaoPeq: '',
          preco: '',
          descontoSocio: '',
          foto: '',
          descricao: '',
          maxParticipantes: '',
          minParticipantes: '',
          facebookId: ''
        },
        extras: [],
        colaboradores: [],
        facebookUrl: '',
        facebookSincronizado: false,
        facebookLoading: false,
        facebookData: '',
        tiposDeEventos: '',
        tipoDeEventoSelect: '',
        erro: ''
      }
    },

    methods: {

      postEvento(){

        this.$http.post('eventos', {
          nomeEvento: this.formEvento.nomeEvento,
          data: this.dataFormatada,
          descricao: this.formEvento.descricao,
          descricaoShort: this.formEvento.descricaoPeq,
          maxParticipantes: this.formEvento.maxParticipantes,
          minParticipantes: this.formEvento.minParticipantes,
          dataFim: this.dataFimFormatada,
          facebook: this.formEvento.facebookId,
          preco: this.formEvento.preco,
          descontoSocio: this.formEvento.descontoSocio,
          tipo: this.tipoDeEventoSelect,
          local: this.formEvento.idLocal

        }).then(
          resposta => {
            this.eventoCriado = true;
            this.$Progress.finish();
            return resposta.json();
          }, resposta => {

            this.eventoCriado = false;
            this.$Progress.fail();
            return resposta.json();

          }).then(data => {

            console.log(this.eventoCriado);

          // Envia id do local
            if(this.eventoCriado){


              this.$message({
                message: 'Evento criado!.',
                type: 'success'
              });
            } else {

              this.erro = data.data;

              let erroStr = this.erro.join(' ');

              this.$message({
                message: 'Erro',
                type: 'success'
              });

            }
        })


      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      sincronizarFacebook: lodashDebounce(function () {
        /* Obter dados sobre o evento no facebook */
        this.facebookLoading = true;
        this.$http.get(`terceiros/facebook/evento/${this.facebookId}`).then(resposta => {
          // 200 -> login feito
          this.facebookSincronizado = true;
          return resposta.json()
        }, resposta => {
          this.facebookSincronizado = false;
        }).then((data) => {
          // Se user esta logado guardar informaçao na store, caso contrario guardar false
          if (this.facebookSincronizado) {
            this.facebookData = data.data;
            this.mergeFacebookComDados();
          }
          this.facebookLoading = false;

        })
      }, 250, {'maxWait': 5000}),

      mergeFacebookComDados(){
        this.formEvento.nomeEvento = this.facebookData.name;
        this.formEvento.data = this.facebookData.start_time;
        this.formEvento.dataFim = this.facebookData.end_time;
        this.formEvento.descricao = this.facebookData.description;
        this.formEvento.descricaoPeq = this.facebookData.description.splice;
        this.formEvento.foto = this.facebookData.cover.source;
        this.formEvento.facebookId = this.facebookData.id;
        this.proxPasso();
        this.$message({
          message: 'Facebook sincronizado.',
          type: 'success'
        });
      },

      setLocal(local){
        this.formEvento.idLocal = local;
      },

      proxPasso(){
        if (this.passo < 4) {
          this.passo++;
        }
      },
      antPasso(){
        if (this.passo > 1) {
          this.passo--;
        }
      }

    },

    computed: {

      dataFimFormatada(){
        if (this.formEvento.dataFim) {
          return moment(this.formEvento.dataFim).unix();
        } else {
          return '';
        }
      },

      dataFormatada(){
        if (this.formEvento.data) {
          return moment(this.formEvento.data).unix();
        } else {
          return '';
        }
      },

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

      facebookId(){
        const fbUrlMatch = this.facebookUrl.match(/(?:https?\:\/\/)?(?:www\.)?(?:facebook\.(?:com)|m\.facebook\.?com)\/(?:events\/)?([0-9-_]{10,20})/);

        if (fbUrlMatch) {
          return fbUrlMatch[1];
        } else {
          return '';
        }
      }
    },
    watch: {
      facebookUrl(){
        if (this.facebookId) {
          this.sincronizarFacebook();
        }
      }
    }
  }
</script>

<style lang="scss">

  @import '../assets/scss/styles.scss';

  .criadorPart {
    display: flex;
    justify-content: space-between;
    padding-top: $spacingLarge;
    &__min {
      width: 45%;
    }
    &__max {
      width: 45%;
    }
  }

  .btn--passos {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    &__mobile {
      width: 90%;

    }
    .el-button + .el-button {
      width: 100%;
      margin-left: 0;
      margin-bottom: 0;

    }

  }

  .el-step__icon {
    display: block;
    line-height: 22px;
  }

  .localizacao {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .criarEvento {
    &--Fix {
      transform: translateX(5%);
      width: 95%;
      @include screen(sm) {
        width: 20%;
      }
    }

    &__st {
      width: 100%;
      @include screen(sm) {
        width: 700px;
      }
      margin-left: auto;
      margin-right: auto;
      margin-bottom: $spacingLarge;
      text-align: center;
    }

    &__nd {
      width: 200px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: $spacingLarge;
    }
    &__rd {
      margin-bottom: $spacingLarge;
      &--lft {
        width: 300px;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        @include screen(md) {
          float: right;
          text-align: right;
        }
      }
      &--rgt {
        text-align: center;
        @include screen(md) {
          text-align: left;
        }
      }
    }

    &__th--input {
      width: 60%;
      margin-left: auto;
      margin-right: auto;
    }

    .center {
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
    }

    display: flex;
    @include screen(lg) {
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
    }

    &__steps {
      overflow-x: scroll;
      margin-bottom: $spacingLarge;
      @include screen(md) {
        overflow-x: auto;
      }
      padding-bottom: $spacingLarge;
    }

    .steps__margin--fix {
      margin-left: 10rem;
    }

  }


</style>

