<template>
  <!--
  Componente feito por António Santos
  Loader baseado no facebook
  -->
  <div class="awesome-loader">
    <div class="awesome-loader__animated">
      <div class="awesome-loader__animated--st"></div>
      <div class="awesome-loader__animated--nd"></div>
      <div class="awesome-loader__animated--rd"></div>
      <div class="awesome-loader__animated--th"></div>
      <div class="awesome-loader__animated--ft"></div>

    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .awesome-loader{
    width:100%;
    height:200px;
    padding:$spacingBase;
    background-color:$colorBg;
    @keyframes placeHolderShimmer{
      0%{
        background-position: -800px 0
      }
      100%{
        background-position: 800px 0
      }
    }

    &__animated {
      animation-duration: 2s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeHolderShimmer;
      animation-timing-function: linear;
      background: $colorBase7;
      background: linear-gradient(to right, $colorBase7 8%, $colorBase6 18%, $colorBase7 33%);
      background-size: 800px 104px;
      height: $sizeXLarge + $spacingLarge + ($spacingBase*3);
      position: relative;
      border-radius:$radius;

      &--st{
        position:absolute;
        width:50%;
        top:0;
        right:0;
        height:$sizeXLarge;
        background-color:$colorBg;
        &:before{
          content:"";
          top:0;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
        &:after{
           content:"";
           bottom:0;
           left:0;
           transform: translate(-40%,50%);
           border-radius:$radius;
           position:absolute;
           width:$radius;
           height:$radius;
           background-color:$colorBg;
           z-index:99;
         }
      }

      &--nd{
        position:absolute;
        width:100%;
        top:$sizeXLarge;
        left:0;
        height:$spacingLarge;
        background-color:$colorBg;
        &:before{
          content:"";
          top:0;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
        &:after{
          content:"";
          top:100%;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
      }
      &--rd{
        position:absolute;
        width:40%;
        top:$sizeXLarge + $spacingLarge;
        right:0;
        height:$sizeMedium;
        background-color:$colorBg;
        &:before{
          content:"";
          top:0;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
        &:after{
          content:"";
          bottom:30%;
          left:0;
          transform: translate(-40%,50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
          z-index:99;
        }
      }

      &--th{
        position:absolute;
        width:100%;
        top:$sizeXLarge + $spacingLarge + $spacingBase;
        left:0;
        height:$spacingBase;
        background-color:$colorBg;
        &:before{
          content:"";
          top:0;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
        &:after{
          content:"";
          top:100%;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
      }

      &--ft{
        position:absolute;
        width:20%;
        top:$sizeXLarge + $spacingLarge + ($spacingBase*2);
        right:0;
        height:$sizeMedium;
        background-color:$colorBg;
        &:before{
          content:"";
          top:0;
          left:0;
          transform: translate(-40%,-50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
        }
        &:after{
          content:"";
          bottom:30%;
          left:0;
          transform: translate(-40%,50%);
          border-radius:$radius;
          position:absolute;
          width:$radius;
          height:$radius;
          background-color:$colorBg;
          z-index:99;
        }
      }
    }
  }


</style>

