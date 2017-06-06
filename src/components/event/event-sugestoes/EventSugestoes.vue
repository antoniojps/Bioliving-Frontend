<template>
  <div class="paddingVertBase">
    <h2 class="faded">{{titulo}}</h2>
    <el-row>
      <event-sugestao v-for="evento in eventos"
                      :idEvento="evento.id_eventos"
                      :nome="evento.nome_evento"
                      :dataEvento="evento.data_evento"
                      :foto="evento.fotos.split(',')[0]"
                      :key="evento.id_eventos">
      </event-sugestao>
    </el-row>
    <el-row style="text-align:center;">
      <router-link to="/"><el-button class="btn__home containerSpacingLg" icon="arrow-right">Ver todos</el-button></router-link>
    </el-row>
  </div>
</template>

<script>

  // TODO vue-resource, lembrar que fotos sera array!!

  import EventSugestao from './EventSugestao.vue';


  export default {

    props:['titulo'],

    components: {
      'event-sugestao': EventSugestao
    },
    data(){
      return {
        eventos: [
          {
            "id_eventos": "2",
            "nome_evento": "Passeio Botanico",
            "data_evento": "2017-06-05 00:00:00",
            "descricao_short": "Passeio Botanico \u00e0 Pateira de Frossos com a Dra. Rosa Pinho, bot\u00e2nica e curadora do herb\u00e1rio do Departamento de Biologia da Universidade de Aveiro.",
            "fotos": "http://i.imgur.com/VWPWTXW.png"
          },
          {
            "id_eventos": "3",
            "nome_evento": "Lorem ipsum lorem",
            "data_evento": "2017-06-05 00:00:00",
            "descricao_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit\u2026",
            "fotos": "http://i.imgur.com/wmOUbG4.png"
          },
          {
            "id_eventos": "4",
            "nome_evento": "Lorem ipsum ipsumipsum ipsum ipsum ipsum ipsum ipsumipsum",
            "data_evento": "2017-06-05 00:00:00",
            "descricao_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit\u2026",
            "fotos": "http://i.imgur.com/kBk6DxY.png"
          },
          {
            "id_eventos": "4",
            "nome_evento": "Lorem ipsum",
            "data_evento": "2017-06-05 00:00:00",
            "descricao_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit\u2026",
            "fotos": "http://i.imgur.com/EPPQu4t.png"
          }
        ]
      }
    }
  }

</script>

<style lang="scss">
  .btn__home {
    margin-left: auto;
    margin-right: auto;
  }
</style>

