<template>
  <div class="data__wrapper"
       v-infinite-scroll="procurarMaisData"
       infinite-scroll-disabled="busy"
  >
    <transition-group name="el-fade-in-linear" v-if="dados && !erro && !semResultados">
      <div v-for="data in dados" :key="data.eventos_id_eventos">
        <events-inscricao
          :evento="data"
          :idUtilizador="idUtilizador"
        ></events-inscricao>
      </div>
    </transition-group>

    <div class="data--erro" v-if="erro">
      <h3><i class="fa fa-sad" aria-hidden="true"></i> Não foi possivel concluir a pesquisa
      </h3>
    </div>

    <div class="data--erro" v-if="!dados && !erro && !semResultados" v-loading="!dados"
         style="min-height:50vh; display:flex; align-items:center; justify-content:center;"
         element-loading-text="A carregar...">
    </div>

    <div class="data--erro align-center" v-if="semResultados">
      <h3><i class="fa fa-sad" aria-hidden="true"></i> Sem inscrições? Inscreva-se num evento!</h3>
      <router-link to="../">
        <el-button type="primary" size="mini">Pesquisar eventos</el-button>
      </router-link>
    </div>

  </div>
</template>

<script>
  import Inscricao from './Inscricao.vue';
  import {mapGetters} from 'vuex';

  export default {


    components: {
      'events-inscricao': Inscricao
    },


    mounted(){
      this.getData();
    },

    props: ['idUtilizador'],

    data(){
      return {
        dados : [],
        loading: true,
        semResultados: false,
        erro: false,
        busy: false,
        proxPagina: false,
        fimResultados: false
      }
    },
    methods: {

      getData(){
        this.$http.get(`utilizadores/${this.idUtilizador}/inscritos?results=4`).then(resposta => {
          // 200 OK
          return resposta.json()
        }, resposta => {
          // erro
          return resposta.json();
        }).then((data) => {
          if(data.status === 200) {
            this.dados = data.data;
            if (data.proxPagina) this.proxPagina = data.proxPagina;
            else this.proxPagina = false;

            console.log(this.dados);


            this.semResultados = false;
            this.erro = false;

          } else if (data.status === 404 ){
            this.semResultados = true;
          } else {
            this.erro = true;
          }
        })
      },
      procurarMaisData(){
        if(this.proxPagina && !this.fimResultados){
          this.busy = true;
          this.$http.get(this.proxPagina).then(resposta => {
            // 200 OK
            return resposta.json()
          }, resposta => {
            // erro
            return resposta.json();
          }).then((data) => {
            console.log(data.status);
            if(data.status === 200){
            // Acrescentar
            this.dados.push.apply(this.dados, data.data);
            console.log(this.dados);
            if (data.proxPagina) this.proxPagina = data.proxPagina;
            else this.proxPagina = false;
            this.fimResultados = false;
            } else {
              this.fimResultados = true;
            }
            this.busy = false;
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'auth'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';
  .data {
    &__wrapper {
      border: $borderSize $colorBase7 solid;
      border-radius: $radius;
      min-height: 50vh;
      max-height:50vh;
      overflow-y: scroll;
    }
    &--erro, &--erro, &--loading {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      height: 10vh;
      h3 {
        text-align: center;
        width: 100%;
        color: $colorBase6;
      }
    }
  }

</style>

