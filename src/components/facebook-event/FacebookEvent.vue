<template>
  <div @click="goToPage">
    <div class="facebook-event" @mouseover="mouseHandler(true)" @mouseleave="mouseHandler(false)" :class="{'facebook-event--hover': mouseOver}">
      <div class="facebook-event__photo" :style="backgroundStyle">
      </div>
      <div class="facebook-event__info">
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <h3><i class="fa fa-facebook-square" aria-hidden="true"></i> Passeio Botânico</h3>
          <a href="#">2015-11-12 13:42</a>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" class="align-right">
          <p class="highlight">6 Vão</p>
          <p>16 Interessados</p>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  // TODO : Vue-resource para dados ou prop


  data(){
    return {
      mouseOver : false,
      bgUrl: 'https://scontent.flis7-1.fna.fbcdn.net/v/t1.0-9/18527764_2023549594531749_7999441219371837831_n.jpg?oh=53102e61ca5bfce8d5a7c4aa65213f81&oe=599F0E37',
      fbUrl: 'https://www.facebook.com/events/1769492436713853'
    }
  },
  methods:{
    mouseHandler(isActive){
      this.mouseOver = isActive;
    },
    goToPage(){
      window.open(this.fbUrl);
    }
  },
  computed:{
    backgroundStyle() {
      return  `background-image:url("${this.bgUrl}")`;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/styles.scss';



  .facebook-event {
    width:100%;
    padding:{
      bottom:$spacingBase
    };
    border: $borderSize $colorBase7 solid;

    &--hover {
      border: $borderSize $colorVerde solid;
      border-radius:$radius;
      cursor:pointer;

    }

    &__photo{
      width:100%;
      display:block;
      height:120px;
      background:{
        color:$colorBase7;
        size: cover;
        position: center
      }
    }

    &__info{
      padding:$spacingBase;
      display:flex;
      background-color:white;
      border-radius:$radius;

      h3 {
        padding:0;
      }

      p{
        padding:0;
      }
    }

  }
</style>

