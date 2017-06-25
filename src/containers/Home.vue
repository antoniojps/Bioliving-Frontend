<template>
  <el-row :gutter="24" style="margin-left:auto;margin-right:auto;">

    <el-col style=" text-align:center">
      <h1>Natureza e Educação para Todos</h1>
      <el-tooltip content="Apagar dados de pesquisa" placement="top">
        <el-button icon="delete" class="btn--delete home__pesquisa--delete" @click="apagarPesquisa"></el-button>
      </el-tooltip>
      <el-tooltip content="Nome do evento" placement="top">
        <el-input class="home__pesquisa--btn"
                  placeholder="Procure eventos"
                  icon="search"
                  v-model="inputSearch"
                  :on-icon-click="searchEventos"
        >
        </el-input>
      </el-tooltip>
      <el-tooltip content="Eventos a partir desta data" placement="top">
        <el-date-picker
          v-model="dataInicio"
          class="home__pesquisa"
          placeholder="Desde"
          format="yyyy-MM-dd"
          @change="searchEventos"
        >
        </el-date-picker>
      </el-tooltip>
      <el-tooltip content="Eventos até esta data" placement="top">
        <el-date-picker
          class="home__pesquisa"
          v-model="dataFim"
          type="date"
          placeholder="Até"
          format="yyyy-MM-dd"
          @change="searchEventos"

        >
        </el-date-picker>
      </el-tooltip>
      <el-button type="primary" icon="search" class="home__pesquisa--btn--marginBottom" @click="searchEventos">
        Pesquisar
      </el-button>
    </el-col>
    <el-col :xs="24" v-infinite-scroll="loaderMaisEventos"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check>
      <!-- loading -->

      <div class="home--loading" style="min-height:40vh" v-loading="!ajaxFeito"
           element-loading-text="A carregar eventos..." v-if="!ajaxFeito">
      </div>

      <!-- ajaxFeito -->
      <div v-else>
        <transition-group name="el-fade-in-linear">
          <event-sugestao v-for="evento in eventos"
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
        </transition-group>


        <div class="home__pesquisa--semResultados" style="min-height:20vh" v-if="loadScroll" v-loading="loadScroll"
             element-loading-text="A carregar mais eventos..."
        >

        </div>
        <div class="home__pesquisa--semResultados" style="min-height:20vh"
             v-if="!semResultados && !proxPagina && !loadScroll">
          <h3 class="regular faded">
            Final dos resultados
          </h3>
        </div>


        <div class="home__pesquisa--semResultados" style="min-height:40vh"
             v-if="semResultados && !proxPagina && !loadScroll">
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
        eventos: ['oi'],
        busy: false,
        proxPagina: false,
        numeroResultados: 8,
        loadScroll: false
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
            this.eventos = data.data;
            if (data.proxPagina) this.proxPagina = data.proxPagina;
            else this.proxPagina = false;
          })
        }
      }, 250, {'maxWait': 5000})
      ,

      getDados(){

        this.$http.get(`pesquisa/eventos?results=${this.numeroResultados}`).then(resposta => {
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
          // Acrescentar
          this.eventos = data.data;
          if (data.proxPagina) {
            this.proxPagina = data.proxPagina;
          }
          else {
            this.proxPagina = false;
          }
          this.ajaxFeito = true;
        })
      },

      loaderMaisEventos(){
        if (this.proxPagina) {
          this.loadScroll = true;
          this.busy = true;
          this.$http.get(this.proxPagina).then(resposta => {
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
            // Acrescentar
            this.eventos.push.apply(this.eventos, data.data);
            this.ajaxFeito = true;
            if (data.proxPagina) this.proxPagina = data.proxPagina;
            else this.proxPagina = false;
            this.busy = false;
          })
        } else {
          this.loadScroll = false;
        }
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
      inputSearch(){
        this.searchEventos()
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
      unixDataInicio(){
        if (this.dataInicio)
          return new Date(this.dataInicio).getTime() / 1000;
      },
      unixDataFim(){
        if (this.dataFim)
          return new Date(this.dataFim).getTime() / 1000;
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
    &--loader {
      width: 100%;
      height: 20vh;
      background-color: black;
      display: block;
    }
  }

</style>

