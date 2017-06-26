<template>
  <el-row :gutter="24" style="margin-left:auto;margin-right:auto;" class="certificado">

    <el-col :gutter="24" :xs="24" :sm="24" :md="18" :lg="18" class="certificado--left">
      <div class="certificado__wrapper">
        <h1 class="certificado--titulo">Certificado de participação</h1>
        <h2 class="certificado--texto">
          Certifica-se que Manel Almeida participou com sucesso no evento Passeio Botânico no dia 27-06-2017.</h2>
        <img src='http://imgh.us/logo_619.svg' class="certificado--img" alt="" style="padding:1rem;">
        <img src="http://i.imgur.com/OQo8Ctd.png" alt="" class="certificado--logo">
      </div>
    </el-col>

    <el-col :gutter="24" :xs="24" :sm="24" :md="6" :lg="6" class="certificado--right">
      <el-button-group
        style="display:flex; align-items:center; justify-content:center; margin-bottom:.75rem;">
        <social-sharing :url="shareUrl" :title="shareText"
                        description="Manel" hashtags="bioliving" inline-template>
          <div>
            <network network="facebook">
              <el-button type="primary" class="btn--facebook"><i class="fa fa-facebook"
                                                                 aria-hidden="true"></i>
              </el-button>
            </network>
            <network network="twitter">
              <el-button type="info"><i class="fa fa-twitter" aria-hidden="true"></i></el-button>
            </network>
            <network network="pinterest">
              <el-button type="danger"><i class="fa fa-pinterest-p" aria-hidden="true"></i></el-button>
            </network>
          </div>
        </social-sharing>
      </el-button-group>

      <div class="certificado__utilizador__wrapper">
        <p>Certificado atribuído a:</p>
        <div class="certificado__utilizador">
          <div class="certificado__utilizador--avatar"></div>
          <div class="certificado__utilizador--nome">
            <h2>Manel Almeida</h2>
            <p><a href="#">Ver perfil</a></p>
          </div>
        </div>
      </div>

      <event-sugestao idEvento="22" nome="Diana rocha" dataEvento="22-10-2017" foto="" tipoEvento="Manel" lat="0" lng="0" tipoEventoIcon="fa-pencil" auth="true" ></event-sugestao>

    </el-col>

  </el-row>
</template>

<script>

  import EventSugestaoCertificado from '../components/event/event-sugestoes/EventSugestaoCertificado.vue';

  export default {

    components:{
      'event-sugestao' : EventSugestaoCertificado
    },
    data(){
      return {}
    },
    computed: {
      shareUrl(){
        return window.location.href;
      },
      shareText(){
        return '';
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  .certificado {

    &__sugestao{
      padding:0;
      margin:0;
      width:100%;
    }

    &__utilizador {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      &--avatar {
        width: 60px;
        min-width: 60px;
        height: 60px;
        min-height: 60px;
        border-radius: 100%;
        background-image: url(http://loremflickr.com/120/120);
        background-position: center;
        background-size: cover;
        background-color: $colorBase7;
        margin-right: $spacingBase;
      }
      &--nome {
        h3 {

        }
      }
    }

    &--right {
      height: 60vh;
      min-heigh: 60vh;
    }

    &--left {

      height: 60vh;
      min-heigh: 600px;
      @include screen(sm){
        min-height:60vh;
      }

      .certificado--titulo {
        position: absolute;
        left: 50%;
        font-size: $sizeXXLarge;
        @include screen(sm) {
          font-size: $sizeXXLarge;
        }
        transform: translate(-50%, 30%);
        @include screen(sm) {
          transform: translate(-50%, 50%);
        }
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }

      .certificado--texto {
        font-weight: $regular;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 125%);
        @include screen(sm) {
          transform: translate(-50%, 150%);
        }
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }

      .certificado__wrapper {
        background-color: $colorBg;
        border: $borderSize $colorBase6 solid;
        border-radius: $radius;
        width: 100%;
        height: 100%;
        left: 0;
        position: relative;
        .certificado--img {
          position: absolute;
          width: 100%;
          bottom: 10%;

        }
        .certificado--logo {
          position: absolute;
          width: 100px;
          left: 50%;
          bottom: 5%;
          transform: translate(-50%);
        }
      }

    }
  }


</style>

