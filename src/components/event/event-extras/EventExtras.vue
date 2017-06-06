<template>
  <div class="paddingVertLarge">
    <event-extra v-for="(extra,index) in extras"
                 :titulo="extra.titulo"
                 :descricao="extra.descricao"
                 :icon="extra.descricao_classe"
                 :descricaoExtra="extra.descricao_pequena"
                 :iconSm="extra.descricao_pequena_classe"
                 :index="index"
                 :data="dataEvento"
                 :key="extra.titulo">

    </event-extra>


  </div>
</template>

<script>

  import EventExtra from './EventExtra.vue';

  export default {

    // TODO : Obter os extras atraves de AJAX

    components: {
      'event-extra': EventExtra
    },

    data(){
      return {
        dataEvento: '2017-06-10 00:00:00',
        extras: [
          {
            "titulo": "Oferta de lanche",
            "descricao": "Oferta de lanchinho descricao",
            "descricao_classe": "fa-star",
            "descricao_pequena": null,
            "descricao_pequena_classe": null
          },
          {
            "titulo": "Oferta de tshirts",
            "descricao": "Exemplo descricao",
            "descricao_classe": "fa-info",
            "descricao_pequena": "exemplo pequena descricao",
            "descricao_pequena_classe": "fa-life-ring"
          }
        ]
      }
    }
  }
</script>

<style lang="scss">

</style>

