<template>
  <div class="paddingBottom">
    <el-row style="padding-left:0; padding-right:0;" class="mapa">

      <el-tooltip placement="top" class="mapa__info" :value="true" effect="dark">
        <div slot="content">
          <h3 style="color:white; text-align:center" class="align-center size-md paddingFix">Encontramo-nos aqui:</h3>
          <p style="color:white" class="align-right size-sm paddingFix">
            Parque da Boca do Carreiro - Pateira de Frossos</p>
        </div>
        <el-button>Top center</el-button>
      </el-tooltip>
    </el-row>
  </div>
</template>

<script>

  // TODO : Vue-resource para obter coordenadas ou prop

  export default {
    data(){
      return {
        center: {lat: 40.640999, lng: -8.642626},
      }
    },
    computed: {},
    methods: {}
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
      image: url('https://maps.googleapis.com/maps/api/staticmap?center="Pateira de Frossos"&zoom=18&size=700x260&key=AIzaSyDeycVva7lFs4Eaye6rvXWknNEGguBEMAg');
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

