<template>
  <el-row :gutter="48" style="margin-left:auto;margin-right:auto;">

    <!-- Coluna esquerda -->
    <el-col :xs="24" :sm="16" :md="16" :lg="16">
      <h1>{{evento.nome_evento}}</h1>
      <p>
        {{id}} -
        {{evento.descricao_short}} -
      </p>


      <p>{{ evento.descricao }}</p>

      <!-- Componente Eventos -->
      <event-extras></event-extras>
      <!-- /Componente Eventos -->


    </el-col>
    <!-- /Coluna esquerda -->


    <!-- Coluna direita -->
    <el-col :xs="24" :sm="8" :md="8" :lg="8" class="cover">

      <el-row class="cover--info" style="padding-left:0; padding-right:0;">
        <el-col :xs="24" :sm="24" style="padding-left:0">
          <el-button type="primary" size="large" class="expandir">
            Inscrever
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </el-button>
          <div class="btns-share">
            <el-button :plain="true" type="info" class="marginVertBase btns-share__btn">
              Contactar
              <i class="fa fa-envelope-o" aria-hidden="true"></i>

            </el-button>
            <el-button :plain="true" type="info" class="marginVertBase btns-share__btn" style="width:49%">
              Partilhar
              <i class="fa fa-share-square-o" aria-hidden="true"></i>
            </el-button>
          </div>
          <div class="info-preco">
            <h2 class="paddingVertBase info-preco__title">Por pessoa: 3€</h2>
            <p class="size-sm info-preco__data">daqui a 5 dias, dia  27 de Maio</p>
          </div>
        </el-col>
      </el-row>

      <!-- Componente Facebook Evento -->
      <el-row class="facebook-card" style="padding-left:0; padding-right:0;">
        <h3>No Facebook :</h3>
        <facebook-event></facebook-event>
      </el-row>
      <!-- Componente Facebook Evento -->


    </el-col>
    <!-- /Coluna direita -->

    <!-- Coluna Baixo -->

    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="cover">
      <!-- Componente Localizacao -->
      <event-localizacao></event-localizacao>
      <!-- /Componente Localizacao -->

      <!-- Componente Localizacao -->
      <event-colaboradores></event-colaboradores>
      <!-- /Componente Localizacao -->

      <hr>
      <event-sugestoes :titulo="'Outros eventos que te podem interessar…'"></event-sugestoes>
    </el-col>

  </el-row>


</template>

<script>

  import FacebookEvent from '../components/facebook-event/FacebookEvent.vue';
  import EventExtras from '../components/event/event-extras/EventExtras.vue';
  import EventLocalizacao from '../components/event/event-localizacao/EventLocalizacao.vue';
  import EventColaboradores from '../components/event/event-colaboradores/EventColaboradores.vue';
  import EventSugestoes from '../components/event/event-sugestoes/EventSugestoes.vue';

  export default {

    props: ['id'],

    components: {
      'facebook-event': FacebookEvent,
      'event-extras': EventExtras,
      'event-localizacao': EventLocalizacao,
      'event-colaboradores': EventColaboradores,
      'event-sugestoes': EventSugestoes
    },
    data(){
      return {

        evento: {
          "id_eventos": "2",
          "nome_evento": "Passeio Botânico",
          "data_registo_evento": "2017-06-02 06:41:25",
          "data_evento": "2017-06-05 00:00:00",
          "descricao_short": "Passeio Botanico \u00e0 Pateira de Frossos com a Dra. Rosa Pinho, bot\u00e2nica e curadora do herb\u00e1rio do Departamento de Biologia da Universidade de Aveiro.",
          "descricao": "Agora que a Primavera fez florescer tantas plantas, venha conhecer a diversidade bot\u00e2nica da Pateira de Frossos, na companhia de uma bot\u00e2nica de renome. Qual o nome de cada planta? Quais se podem comer? Que propriedade medicinal t\u00eam? Deixe-se maravilhar pelo fascinante mundo das plantas.",
          "max_participantes": null,
          "min_participantes": null,
          "idade_minima": null,
          "data_fim": null,
          "fotos": "http:/i.imgur.com/RQrr9Jj.jpg",
          "ativo": "0",
          "localizacao_localizacao": "1",
          "tipo_evento_id_tipo_evento": "1",
          "localizacao": "1",
          "lat": "40.640999",
          "lng": "-8.642626",
          "nome": "pateoas",
          "eventos_id_eventos": "2",
          "utilizadores_id_utilizadores": "14",
          "data_inscricao": "2017-06-03 15:53:58",
          "id_tipo_evento": "1",
          "nome_tipo_evento": "adsa",
          "participantes": "1"
        }
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  .cover {
    display: flex;
    flex-direction: column;
    &--info {
      padding: {
        top: $spacingBase;
        bottom: $spacingBase;
        right: 0;
        left: 0;
      }
    }
  }

  .facebook-card {
    padding: {
      top: $spacingBase;
      bottom: $spacingBase;
      right: 0;
      left: 0;
    }

    h3 {
      color: $colorBase4;
      font-weight: 400;
    }
  }

  .el-carousel {
    &__container {
      min-height: auto;
      @include screen(md) {
        min-height: 300px;
      }
      @include screen(lg) {
        min-height: 450px;
      }
    }
    &--img {
      width: 100%;
      height: auto;
    }
  }

  .info-preco {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .btns-share{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width:100%;
    &__btn{
      width:49%;
    }
  }

</style>

