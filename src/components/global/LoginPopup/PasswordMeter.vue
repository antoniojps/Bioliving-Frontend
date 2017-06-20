<template>
  <!--
    Componente feito para LabMM4
    Dependencias: zxcvbn
    https://github.com/dropbox/zxcvbn
  -->
  <div class="passwordMeter">
    <div class="passwordMeter__lineWrapper">
      <div class="passwordMeter__line" :class="classObj">
      </div>
    </div>
    <div class="passwordMeter__info">{{texto}}</div>
  </div>
</template>

<script>

  import zxcvbn from 'zxcvbn';

  export default {
    props: ['password'],
    data(){
      return {}
    },
    computed: {
      score(){
        return zxcvbn(this.password).score;
      },
      classObj(){
        return {
          'passwordMeter--fraca': this.score === 1,
          'passwordMeter--media': this.score === 2,
          'passwordMeter--boa': this.score === 3,
          'passwordMeter--excelente': this.score === 4,

        }
      },
      texto(){
        let infoTexto = 'Fraca';
        if (this.score === 0) infoTexto = 'Muito fraca'
        if (this.score === 1) infoTexto = 'Fraca'
        if (this.score === 2) infoTexto = 'Média'
        if (this.score === 3) infoTexto = 'Boa'
        if (this.score === 4) infoTexto = 'Excelente'
        return infoTexto;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .passwordMeter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &__lineWrapper {
      width: 60%;
      @include screen(sm){
        width:80%;
      }
      height: 8px;
      border-radius: $radius;
      border: 1px solid $colorBase7;
      background-color: $colorBase7;

    }
    &__info {
      text-align: center;
      width: 40%;
      @include screen(sm){
        width:20%;
      }
    }
  }

  .passwordMeter__line{
    width:100%;
    height:100%;
    transition: all 200ms ease-in-out;
  }

  .passwordMeter__line.passwordMeter{
    &--fraca {
      width: 20%;
      height: 100%;
      background-color: $colorVermelho;
    }
    &--media {
      width: 40%;
      height: 100%;
      background-color: $colorAmarelo;
    }
    &--boa {
      width: 75%;
      height: 100%;
      background-color: $colorAzul;
    }
    &--excelente {
      width: 100%;
      height: 100%;
      background-color: $colorVerde;
    }
  }
</style>

