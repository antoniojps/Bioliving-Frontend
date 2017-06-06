<template>
  <div class="footer paddingVertLarge">
    <el-row :gutter="24" style="margin-left:auto;margin-right:auto;">
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <img class="footer__logo img-responsive" src="http://i.imgur.com/OQo8Ctd.png" alt="Bioliving logo">
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" class="align-right">
        <ul>
          <router-link v-for="footer in footerRoutes" :key="footer.route" :to="`/${footer.route}`"><li>{{footer.text}}</li></router-link>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  // TODO : Vue-resource para obter os dados


  export default {
    data(){
      return {
        footerRoutes:[
          {'route':'bioliving', 'text':'Quem Somos?'},
          {'route':'contacto', 'text':'Contacto'},
          {'route':'faq', 'text':'Perguntas frequentemente questionadas'},
          {'route':'politica-de-privacidade', 'text':'Política de privacidade'}
          ]
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

  .footer {
    border: $borderSize $colorBase6 solid;
    background-color: $colorBase7;
    margin-top: $spacingLarge;
    ul{
      list-style-type: none;

      li{
        padding:{
          bottom: $spacingBase;
        }
      }

      a {
        color: $colorBase4;
        transition:color .4s;
        text-decoration:none;

        &:hover,&:focus {
          color: $colorBase;
        }
      }
    }

    &__logo {

    }

  }

</style>

