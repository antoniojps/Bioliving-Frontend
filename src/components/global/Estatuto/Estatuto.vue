<template>
  <div class="estatuto">
    <el-tooltip content="O utilizador é administrador" placement="top" width="100">
      <el-button type="primary" size="small" class="marginBottom" v-if="adminScope"><i class="fa fa-black-tie" aria-hidden="true"></i> Admin
      </el-button>
    </el-tooltip>
    <el-tooltip content="O utilizador é um colaborador da Bioliving" placement="top">
      <el-button type="info" size="small" class="marginBottom" v-if="colaboradorScope"><i class="fa fa-envira" aria-hidden="true"></i>
        Colaborador
      </el-button>
    </el-tooltip>
    <el-tooltip content="O utilizador é um sócio da Bioliving" placement="top">
      <el-button type="warning" size="small" class="marginBottom" v-if="socioScope"><i class="fa fa-star" aria-hidden="true"></i> Sócio
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data(){
      return {}
    },
    computed: {
      ...mapGetters([
        'getConcluido',
        'auth',
        'idUtilizador',
        'publicoScope',
        'normalScope',
        'socioScope',
        'colaboradorScope',
        'adminScope'
      ]),

    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .estatuto {

    .el-button + .el-button {
      width: auto;


      @include screen(md) {

      }
    }

  }

</style>

