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
      <event-sugestao v-for="evento in eventos.data"
                      :idEvento="evento.id_eventos"
                      :nome="evento.nome_evento"
                      :dataEvento="evento.data_evento"
                      :foto="evento.fotos"
                      :tipoEvento="evento.nome_tipo_evento"
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
        eventos: {
          "status": "200",
          "data": [
            {
              "id_eventos": "25",
              "nome_evento": "BioLousada - FieldSketching",
              "nome_tipo_evento": "Field Sketching",
              "nome": "Lousada",
              "data_evento": "2017-06-17 09:30:00",
              "descricao_short": "Desenhar a natureza é uma outra forma de vê-la, de se conectar com ela. ",
              "inscritos": "0",
              "interessados": "0",
              "fotos": "http://i.imgur.com/VWPWTXW.png"

            },
            {
              "id_eventos": "23",
              "nome_evento": "Votação online Orçamento Participativo Albergaria-a-Velha",
              "nome_tipo_evento": "Votação",
              "nome": "Lousada",
              "data_evento": "2017-06-20 00:00:00",
              "descricao_short": "Durante o mês de Junho estão a votação 20 projetos para o Orçamento Participativo do Município de Albergaria-a-Velha, em http://op.cm-albergaria.pt/",
              "inscritos": "1",
              "interessados": "1",
              "fotos": "http://i.imgur.com/wmOUbG4.png"
            },
            {
              "id_eventos": "24",
              "nome_evento": "LousadaBlitz",
              "nome_tipo_evento": "Oficina",
              "nome": "Lousada",
              "data_evento": "2017-06-22 08:00:00",
              "descricao_short": "Ser biólogo por um dia!",
              "inscritos": "0",
              "interessados": "0",
              "fotos": "http://i.imgur.com/kBk6DxY.png"

            },
            {
              "id_eventos": "22",
              "nome_evento": "Passeio Botânico",
              "nome_tipo_evento": "Passeio",
              "nome": "Pateira de Frossos",
              "data_evento": "2017-06-30 08:28:00",
              "descricao_short": " Passeio Botanico à Pateira de Frossos com a Dra. Rosa Pinho, botânica e curadora do herbário do Departamento de Biologia da Universidade de Aveiro.",
              "inscritos": "1",
              "interessados": "1",
              "fotos": "http://i.imgur.com/EPPQu4t.png"

            }
          ]
        }
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

