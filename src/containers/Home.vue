<template>
  <el-row :gutter="24" style="margin-left:auto;margin-right:auto;">

    <el-col style=" text-align:center">
      <h1>Natureza e Educação para Todos</h1>


      <el-input class="home__pesquisa--btn"
                placeholder="Procure eventos"
                icon="search"
                v-model="inputSearch"
                :on-icon-click="searchEventos"
      >
      </el-input>

      <el-date-picker
        v-model="dataInicio"
        class="home__pesquisa"
        type="date"
        placeholder="Desde">
      </el-date-picker>
      <el-date-picker
        class="home__pesquisa"
        v-model="dataFim"
        type="date"
        placeholder="Até">
      </el-date-picker>
      <el-button type="primary" icon="search" class="home__pesquisa--btn--marginBottom">Pesquisar</el-button>

    </el-col>
    <el-col :xs="24">
      <!-- loading -->
      <div class="home--loading" style="min-height:40vh" v-loading="!ajaxFeito"
           element-loading-text="A carregar eventos..." v-if="!ajaxFeito">
      </div>

      <!-- ajaxFeito -->
      <div v-else>
        <event-sugestao v-for="evento in eventos.data"
                        :idEvento="evento.id_eventos"
                        :nome="evento.nome_evento"
                        :dataEvento="evento.data_evento"
                        :foto="evento.fotos"
                        :tipoEvento="evento.nome_tipo_evento"
                        :lat="evento.lat"
                        :lng:="evento.lng"
                        :key="evento.id_eventos">
        </event-sugestao>
      </div>
    </el-col>


  </el-row>

</template>

<script>
  import EventSugestao from './../components/event/event-sugestoes/EventSugestao.vue';
  import lodashDebounce from 'lodash.debounce';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      'event-sugestao': EventSugestao
    },
    data(){
      return {
        inputSearch: '',
        ajaxFeito: false,
        erro: false,
        dataInicio: '',
        dataFim: '',
        eventos: {}
      }
    },

    methods: {
      searchEventos(){
        console.log('eventos');
      },
      getDados(){
        console.log('getDados');
        this.$http.get(`pesquisa/eventos`).then(resposta => {
          // 200 OK
          this.erro = false;
          return resposta.json()
        }, resposta => {
          // erro
          this.erro = true;
          return false;
        }).then((data) => {
          this.eventos = data;
          this.ajaxFeito = true;

        })
      }
    },

    watch: {

      getConcluido(){
        if (this.getConcluido) {
          this.getDados();
        }
      }
      ,
      inputSearch: lodashDebounce(function (inputSearch) {
        if (this.ajaxFeito) {
          this.$http.get(`pesquisa/eventos?msg=${inputSearch}`).then(resposta => {
            // 200 -> login feito
            this.erro = false;
            return resposta.json()
          }, resposta => {
            // 401
            this.erro = true;
            return false;
          }).then((data) => {
            // Se user esta logado guardar informaçao na store, caso contrario guardar false
            this.eventos = data;
          })
        }
      }, 250, {'maxWait': 5000}),
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
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  .home {
    &__pesquisa {
      &--btn {
        width: 100%;
        margin-bottom: $spacingBase;
        @include screen(md) {
          width: auto;
          margin-bottom: 0;
        }
        &--marginBottom {
          width: 100%;
          margin-top: $spacingBase;
          @include screen(md) {
            width: auto;
            margin-bottom: 0;
          }
        }
      }
      &.el-date-editor.el-input {
        width: 49%;
        @include screen(md) {
          width: 20%;
        }
      }
    }
  }

</style>

