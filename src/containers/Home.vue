<template>
  <el-row :gutter="24" style="margin-left:auto;margin-right:auto;">

    <el-col style="padding:0; text-align:center">
      <h1>Natureza e Educação para Todos</h1>

      <el-input class="btn-search__home"
                placeholder="Procure eventos"
                icon="search"
                v-model="inputSearch"
                :on-icon-click="searchEventos">
      </el-input>

      <el-date-picker
        v-model="dataInicio"
        type="date"
        placeholder="Desde">
      </el-date-picker>
 <el-date-picker
        v-model="dataFim"
        type="date"
        placeholder="Até">
      </el-date-picker>

    </el-col>
    <el-col :xs="24">
      <event-sugestao v-for="evento in eventos"
                      :idEvento="evento.id_eventos"
                      :nome="evento.nome_evento"
                      :dataEvento="evento.data_evento"
                      :foto="evento.fotos.split(',')[0]"
                      :key="evento.id_eventos">
      </event-sugestao>
    </el-col>


  </el-row>

</template>

<script>
  import EventSugestao from './../components/event/event-sugestoes/EventSugestao.vue';

  export default {
    components: {
      'event-sugestao': EventSugestao
    },
    data(){
      return {

        inputSearch: '',
        dataInicio: '',
        dataFim: '',
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
          },

        ]
      }
    },

    methods: {
      searchEventos(){
        console.log('eventos');
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  .btn-search__home {
    width: 30%;

  }

</style>

