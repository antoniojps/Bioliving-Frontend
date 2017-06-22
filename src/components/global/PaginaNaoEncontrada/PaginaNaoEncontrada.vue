<template>
  <el-row :gutter="48" style="margin-left:auto;margin-right:auto;height:100%;">
    <el-col :xs="24" :sm="16" :md="16" :lg="16"  class="paginaNaoEncontrada">
    <h1>Para estes lados não há nada para ver!</h1>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data(){
      return {}
    }
  }
</script>

<style lang="scss">
.paginaNaoEncontrada{
  width:100%;
  height:100%;
  text-align:center;
}
</style>

