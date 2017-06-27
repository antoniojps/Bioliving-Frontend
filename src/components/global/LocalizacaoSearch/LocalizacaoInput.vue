<template>
  <div class="localizacao">
    <localizacao-search @localSearch="handleLocalInput" :placeholder="placeholder"></localizacao-search>
    <transition name="el-zoom-in-center">
      <i class="el-icon-check" v-if="localAdicionado"></i>
    </transition>

  </div>
</template>

<script>

  // @evento localInput (envia dados)

  import LocalizacaoSearch from './LocalizacaoSearch.vue';


  export default {
    components: {
      'localizacao-search': LocalizacaoSearch
    },
    props:['placeholder'],
    data(){
      return {
        nomeLocal: '',
        lat: '',
        lng: '',
        localAdicionado: false
      }
    },
    methods: {
      handleLocalInput(local){
        if (local) {
          this.nomeLocal = local.value ? local.value : '';
          this.lat = local.coordenadas.lat ? local.coordenadas.lat : '';
          this.lng = local.coordenadas.lng ? local.coordenadas.lng : '';
        } else {
          this.nomeLocal = false;
        }

        this.postLocal();

      },

      postLocal(){
        if (this.inputFeito) {
          this.$Progress.start();
          this.$http.post('locais', {nomeLocal: this.nomeLocal, lat: this.lat, lng: this.lng}).then(
            resposta => {
              this.$Progress.finish();
              return resposta.json();

            }, resposta => {

              this.localAdicionado = false;
              this.$Progress.fail();
              return resposta.json();

            }).then(data => {
            this.localAdicionado = true;
            // Envia id do local
            this.$emit('localInput',data.data);
          })
        }
      }
    },
    computed: {

      inputFeito(){
        return this.nomeLocal && this.lat && this.lng;
      },

      tipoBotao(){
        if (this.nomeLocal) {
          return 'primary';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .localizacao {
    display: flex;
    align-items: center;
    .el-icon-check {
      padding-left: $spacingBase;
      color: $colorVerde;
    }
  }

</style>

