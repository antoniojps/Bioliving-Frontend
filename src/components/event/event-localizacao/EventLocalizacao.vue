<template>
  <div class="paddingBottom">
    <h2>Localização</h2>
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="16"
      class="mapa"
      @bounds_changed="bordasAtualizadas($event)"
    >
      <gmap-marker
        :key="index"
        v-for="(marker,index) in markers"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="center=marker.position"
      ></gmap-marker>

    </gmap-map>

  </div>
</template>

<script>

  import {Map,Marker} from 'vue2-google-maps';
  import lodashDebounce from 'lodash.debounce';

  export default {

    components: {
      'gmap-map': Map,
      'gmap-marker': Marker
    },

    props:['lat','lng'],
    data () {
      return {

      }
    },
    computed: {
      center(){
        return {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};
      },
      markers(){
        return [{ position: {lat: parseFloat(this.lat), lng: parseFloat(this.lng) }}];
      },
      mapStyle(){
        return `background-image: url(${this.mapUrl})`
      }
    },

    methods: {
      // Debounce para ser chamado so de 1s em 1s (controlar event triggers)
      bordasAtualizadas: lodashDebounce(function($e){
        // $e tem as coordenadas das bordas
        console.log(`Lng Este: ${$e.b.b} Lng Oeste: ${$e.b.f} Lat Norte: ${$e.f.f} Lat Sul: ${$e.f.b}`);
      },500, { 'maxWait': 5000 })
    }
  }

</script>

<style lang="scss">

  @import '../../../assets/scss/styles.scss';

  .mapa {
    position: relative;
    min-height: 250px;
    width: 100%;
    background: {
      color: $colorBase7;
      size: cover;
      position: center;
    }
    border: $borderSize $colorBase6 solid;

    &__info {
      color: white;
      position: absolute;
      z-index: 1;
      background-color: rgba($colorVerde, .15);
      width: 100px;
      height: 100px;
      color: rgba(0, 0, 0, 0);
      padding: $spacingBase;
      border-radius: 100%;
      border: $borderSize $colorBase6 solid;
      left: 50%;
      top: 30%;
      transform: translate(-50%);
      span {
        opacity: 0;
      }
      &:after {
        z-index: 2;
        content: "";
        position: absolute;
        bottom: 43%;
        left: 50%;
        transform: translate(-50%);
        width: 15px;
        height: 22px;
        background: {
          image: url('../../../assets/imgs/localization_oval.svg');
        }
      }

      &:hover, &:active, &:focus {
        border: $borderSize $colorVerde solid;
      }
    }

  }

</style>

