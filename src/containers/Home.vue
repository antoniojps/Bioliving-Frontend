<template>
  <el-row :gutter="24" style="margin-left:auto;margin-right:auto;">

    <el-col style=" text-align:center">
      <h1>Natureza e Educação para Todos</h1>

      <el-button icon="delete" class="btn--delete home__pesquisa--delete" @click="apagarPesquisa"></el-button>

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
        placeholder="Desde"
        format="yyyy-MM-dd"
        @change="searchEventos"
      >
      </el-date-picker>
      <el-date-picker
        class="home__pesquisa"
        v-model="dataFim"
        type="date"
        placeholder="Até"
        format="yyyy-MM-dd"
        @change="searchEventos"

      >
      </el-date-picker>
      <el-button type="primary" icon="search" class="home__pesquisa--btn--marginBottom" @click="searchEventos">
        Pesquisar
      </el-button>

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
                        :lng="evento.lng"
                        :tipoEventoIcon="evento.tipo_classe"
                        :auth="auth"
                        :key="evento.id_eventos">
        </event-sugestao>


        <div class="home__pesquisa--semResultados" style="min-height:40vh" v-if="semResultados">
          <h3 class="regular faded">
            Procuramos e procuramos mas infelizmente não conseguimos encontrar nenhum evento...</h3>
        </div>

      </div>
    </el-col>


  </el-row>

</template>

<script>
  import EventSugestao from './../components/event/event-sugestoes/EventSugestao.vue';
  import lodashDebounce from 'lodash.debounce';
  import queryString from 'query-string';
  import {mapGetters} from 'vuex';
  import H from './../custom/Helpers';


  export default {
    components: {
      'event-sugestao': EventSugestao
    },
    data(){
      return {
        inputSearch: '',
        ajaxFeito: false,
        erro: false,
        semResultados: false,
        dataInicio: '',
        dataFim: '',
        eventos: {}
      }
    },

    methods: {

      searchEventos: lodashDebounce(function () {
        // Pesquisa
          if (this.ajaxFeito) {
            this.$http.get(`pesquisa/eventos${this.queryParams}`).then(resposta => {
              // 200 -> login feito
              this.erro = false;
              this.semResultados = false;
              return resposta.json()
            }, resposta => {
              // 401
              if (resposta.status === 404) {
                this.semResultados = true;
              } else {
                this.erro = true;
              }
              return false;
            }).then((data) => {
              // Se user esta logado guardar informaçao na store, caso contrario guardar false
              this.eventos = data;
            })
          }
      }, 250, {'maxWait': 5000})
      ,

      getDados(){

        this.$http.get(`pesquisa/eventos`).then(resposta => {
          // 200 OK
          this.erro = false;
          this.semResultados = false;
          return resposta.json()
        }, resposta => {
          // erro
          if (resposta.status === 404) {
            this.semResultados = true;
          } else {
            this.erro = true;
          }
          return false;
        }).then((data) => {
          this.eventos = data;
          this.ajaxFeito = true;

        })
      },
      apagarPesquisa(){
        this.inputSearch = '';
        this.dataInicio = '';
        this.dataFim = '';
      }

    },

    watch: {

      getConcluido(){
        if (this.getConcluido) {
          this.getDados();
        }
      }
      ,
      inputSearch(){ this.searchEventos()}
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
      unixDataInicio(){
        if(this.dataInicio)
        return new Date(this.dataInicio).getTime()/1000;
      },
      unixDataFim(){
        if(this.dataFim)
        return new Date(this.dataFim).getTime()/1000;
      },
      queryParams(){
        let obj = {
          msg: this.inputSearch,
          dataMin: this.unixDataInicio,
          dataMax: this.unixDataFim
        };



        // Limpar keys com valores undefined;
        H.limparObj(obj);
        return `?${queryString.stringify(obj)}`;
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  .home {
    &__pesquisa {
      &--btn {
        width: 83%;
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
          &--delete {
            width: 8%;
            @include screen(sm) {
              width: auto;
            }
          }
        }
      }
      &.el-date-editor.el-input {
        width: 49%;
        @include screen(md) {
          width: 20%;
        }
      }
      &--semResultados {
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        h3 {
          width: 100%;
        }

      }
    }
  }

</style>

