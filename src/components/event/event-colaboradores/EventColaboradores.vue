<template>
  <!-- TODO Mostrar so se tiver colaboradores no resultado -->
  <div class="colaboradores">
  <el-row :gutter="12">
    <h2>Colaboradores</h2>
  <event-colaborador v-for="(colaborador,index) in colaboradores"
                       :titulo="colaborador.nome"
                       :descricao="colaborador.descricao"
                       :srcPic="colaborador.image_src"
                       :key="index"
    >

    </event-colaborador>
  </el-row>
  </div>
</template>

<script>
  import EventColaborador from './EventColaborador.vue';


  export default {
    components: {
      'event-colaborador': EventColaborador
    },

    // TODO Vue-resource

    data(){
      return {
        colaboradores: [
          {
            "nome": "Dr. Rosa Pinho",
            "descricao": "Bot\u00e2nica e curadora do herb\u00e1rio do Departamento de Biologia da Universidade de Aveiro.\r\n",
            "tipo_colaborador": "Docente",
            "image_src": "https:\/\/fakeimg.pl\/50x50\/"
          },
          {
            "nome": "Universidade de Aveiro",
            "descricao": "A melhor universidade do mundo capaz de produzir alunos com desempenhos extraordin\u00e1rios.\r\n",
            "tipo_colaborador": "Universidade",
            "image_src": "https:\/\/fakeimg.pl\/50x50\/"
          }
        ]
      }
    }
  }

</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .colaboradores {

    h3{
      color:$colorBase2;
    }

    padding:{
      bottom:$spacingBase;
      top:$spacingLarge;
    }
  }

</style>