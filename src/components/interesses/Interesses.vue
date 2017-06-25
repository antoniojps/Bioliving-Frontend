<template>
  <div class="interesses__wrapper"
       v-infinite-scroll="procurarMaisInteresses"
       infinite-scroll-disabled="busy"
       >

    <transition-group name="el-fade-in-linear" v-if="interesses && !erro && !semResultados">
      <div v-for="interesse in interesses" :key="interesse.eventos_id_eventos">
        <events-interesse :evento="interesse" :idUtilizador="idUtilizador"
                          @removido="getInteresses()"></events-interesse>
      </div>
    </transition-group>

    <div class="interesses--erro" v-if="erro">
      <h3><i class="fa fa-sad" aria-hidden="true"></i> Não conseguimos concluir a pesquisa de eventos que lhe interessam
      </h3>
    </div>

    <div class="interesses--erro" v-if="!interesses && !erro && !semResultados" v-loading="!interesses"
         style="min-height:50vh; display:flex; align-items:center; justify-content:center;"
         element-loading-text="A carregar interesses...">
    </div>

    <div class="interesses--erro align-center" v-if="semResultados">
      <h3><i class="fa fa-sad" aria-hidden="true"></i> Sem eventos que lhe interessem?</h3>
      <router-link to="../">
        <el-button type="primary" size="mini">Pesquisar eventos</el-button>
      </router-link>
    </div>

  </div>
</template>

<script>
  import Interesse from './Interesse.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      'events-interesse': Interesse
    },


    mounted(){
      this.getInteresses();
    },

    props: ['idUtilizador'],
    data(){
      return {
        interesses: [],
        loading: true,
        semResultados: false,
        erro: false,
        busy: false,
        proxPagina: false,
        fimResultados: false
      }
    },
    methods: {

      getInteresses(){
        this.$http.get(`utilizadores/${this.idUtilizador}/interesses?by=dataEvento&order=DESC&results=3`).then(resposta => {
          // 200 OK
          return resposta.json()
        }, resposta => {
          // erro
          return resposta.json();
        }).then((data) => {
          // Acrescentar
          if(data.status === 200) {
            this.interesses = data.data;
            if (data.proxPagina) this.proxPagina = data.proxPagina;
            else this.proxPagina = false;

            this.semResultados = false;
            this.erro = false;

          } else if (data.status === 404 ){
            this.semResultados = true;
          } else {
            this.erro = true;
          }

        })
      },
      procurarMaisInteresses(){
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
            this.interesses.push.apply(this.interesses, data.data);
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

  .interesses {
    &__wrapper {
      border: $borderSize $colorBase7 solid;
      border-radius: $radius;
      max-height: 50vh;
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

