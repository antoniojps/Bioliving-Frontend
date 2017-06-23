<template>
  <div @click="goToPage">

    <div class="facebook-event" @mouseover="mouseHandler(true)" @mouseleave="mouseHandler(false)" v-if="facebookData.data"
         :class="{'facebook-event--hover': mouseOver}">
        <div class="facebook-event__photo" v-if="facebookData.data.cover" :style="backgroundStyle">
        </div>
      <div class="facebook-event__info">
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <h3><i class="fa fa-facebook-square" aria-hidden="true"></i> {{facebookData.data.name}}</h3>
          <a href="#">2015-11-12 13:42</a>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" class="align-right">
          <p class="highlight">{{facebookData.data.attending_count}} Vão</p>
          <p>{{facebookData.data.interested_count}} Interessados</p>
        </el-col>
      </div>
    </div>
    <div class="facebook-event" @mouseover="mouseHandler(true)" @mouseleave="mouseHandler(false)" v-loading="!facebookData.data"
          v-else
         :class="{'facebook-event--hover': mouseOver}">
      <div class="facebook-event__photo facebook--event__photo--shadow">
      </div>
      <div class="facebook-event__info">
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <h3><i class="fa fa-facebook-square" aria-hidden="true"></i></h3>
          <a href="#"></a>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" class="align-right">
          <p class="highlight"></p>
          <p></p>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    // TODO : Vue-resource para dados ou prop
    // LINK: https://graph.facebook.com/1769492436713853?fields=owner,name,start_time,end_time,place,description,attending_count,interested_count,maybe_count,cover,is_canceled&access_token=

    props: ['id'],

    mounted(){
      Vue.http.get(`terceiros/facebook/evento/${this.id}`).then(resposta => {
        // 200 -> dados obtidos
        return resposta.json();
      }, resposta => {
        // erro
        if (resposta.status === 404) {
          console.log('pagina facebook inexistente');
        }
        return false;
      }).then((data) => {
        this.facebookData = data;
        if (data.status === '200') {
        } else {
        }
      });
    },

    data(){
      return {
        mouseOver: false,
        facebookData: {}
      }
    },
    methods: {
      mouseHandler(isActive){
        this.mouseOver = isActive;
      },
      goToPage(){
        window.open(this.fbUrl);
      }
    },
    computed: {
      backgroundStyle() {
        return `background-image:url("${this.facebookData.data.cover.source}")`;
      },
      fbUrl(){
        return `https://www.facebook.com/events/${this.id}/`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/styles.scss';

  .facebook-event {
    width: 100%;
    padding: {
      bottom: $spacingBase
    }
  ;
    border: $borderSize $colorBase7 solid;

    &--hover {
      border: $borderSize $colorVerde solid;
      border-radius: $radius;
      cursor: pointer;

    }

    &__photo {
      width: 100%;
      display: block;
      height: 120px;
      background: {
        color: $colorBase7;
        size: cover;
        position: center
      }
      &--shadow{
        -moz-box-shadow: inset 0 0 10px #000000;
        -webkit-box-shadow: inset 0 0 10px #000000;
        box-shadow: inset 0 0 10px #000000;
      }
    }

    &__info {
      padding: $spacingBase;
      display: flex;
      background-color: white;
      border-radius: $radius;

      h3 {
        padding: 0;
        padding-bottom:$spacingSmall;
      }

      p {
        padding: 0;
      }
    }

  }
</style>

