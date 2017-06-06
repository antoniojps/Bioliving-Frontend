<template>
  <div class="colaborador">
    <el-col :xs="5" :sm="3" :md="2" :lg="2">
      <img :src="srcPic">
    </el-col>

    <el-col :xs="19" :sm="21" :md="22" :lg="22">

      <h2>{{titulo}}</h2>
      <p>{{descricao}}</p>

    </el-col>
  </div>
</template>

<script>

  export default {
    props: {
      titulo: {
        type: String,
        required: true
      },
      descricao: {
        type: String
      },
      srcPic: {
        type: String
      }
    },
    data(){
      return {}
    }
  }

</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .colaborador {
    color:$colorBase;
    padding: {
      top: $spacingSmall;
      bottom: $spacingSmall;
    }
    img{
      width:42px;
      border-radius:100%;
      margin:{
        right:$spacingBase;
      }
    }
  }

</style>

