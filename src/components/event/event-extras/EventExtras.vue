<template>
  <div class="paddingVertLarge" v-if="extras">

    <event-extra v-if="data"  :titulo="horaTitulo" :descricao="humanizarHorario" icon="fa-calendar-o" :descricaoExtra="horaInicio" iconSm="fa-clock-o"></event-extra>
    <event-extra v-for="(extra,index) in extras"
                 :titulo="extra.titulo"
                 :descricao="extra.descricao"
                 :icon="extra.descricao_classe"
                 :descricaoExtra="extra.descricao_pequena"
                 :iconSm="extra.descricao_pequena_classe"
                 :index="index"
                 :data="data"
                 :key="extra.titulo">

    </event-extra>
  </div>
</template>

<script>
  import EventExtra from './EventExtra.vue';
  import moment from 'moment';

  export default {

    props:['idEvento','data'],
    mounted(){
      Vue.http.get(`eventos/${this.idEvento}/extras`).then(resposta => {
        // 200 -> dados obtidos
        return resposta.json()
      }, resposta => {
        // erro

        return false;
      }).then((data) => {
        if (data.status === '200') {
          this.extras = data.data;
          this.ajaxFeito = true;
        } else {
          this.extras = true;
          this.ajaxErro = true;
        }
      });
    },
    components: {
      'event-extra': EventExtra
    },

    data(){
      return {
        ajaxFeito: false,
        ajaxErro: false,
        extras: false
      }
    },

    computed:{
      horaTitulo(){
        return moment(this.data).locale('pt').calendar(null, {
          sameDay: '[Hoje!]',
          nextDay: '[Amanhã!]',
          nextWeek: '[Este] dddd!',
          lastDay: '[Foi ontem...]',
          lastWeek: '[Foi] dddd',
          sameElse: 'DD/MM/YYYY'
        });
      },
      humanizarHorario(){
        return `${moment(this.data).locale('pt').format("dddd")}, ${moment(this.data).locale('pt').fromNow()} - ${moment(this.data).locale('pt').format('LL')}`;
      },
      horaInicio(){
        return `Começa às ${moment(this.data).format('HH:mm a')}`;
      }
    }
  }
</script>

<style lang="scss">

</style>

