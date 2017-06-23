<template>
  <div>
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :title="nome">
      <div class="sugestoes paddingBottom" @click.prevent="clicarEvento">

        <div class="sugestoes__foto" :style="`background-image: url('${this.foto}')`">
          <div class="sugestoes__tipo" :title="tipoEvento"><i class="fa fa-bicycle" aria-hidden="true"></i></div>
          <div class="sugestoes__down">
            <div class="sugestoes__down--lft">
              <el-button type="primary" class="btn--base2" size="small">
                <i class="fa fa-calendar-o" aria-hidden="true"></i> {{dataFormatada}}
              </el-button>

            </div>
            <div class="sugestoes__down--rht">
              <el-button :plain="true" :disabled="true" class="btn--primary" size="small" v-if="passado" title="Inscrições fechadas">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </el-button>
              <el-button type="primary" class="btn--primary" size="small" v-else>
                <i class="fa fa-plus" aria-hidden="true"></i>
              </el-button>
            </div>
          </div>
        </div>

        <div class="sugestoes__info">
          <h3>{{nome}}</h3>
          <p> {{humanizarHorario}}</p>
        </div>

      </div>
    </el-col>


  </div>
</template>

<script>

  import moment from 'moment';

  export default {

    props: ['idEvento', 'nome', 'dataEvento', 'foto','tipoEvento']
    ,
    data(){
      return {
        dialogInscrever: false
      }
    },
    methods: {
      clicarEvento(acao){
          this.$router.push(`/evento/${this.idEvento}`);
          window.scrollTo(0, 0);
      }
    },
    computed: {
      humanizarHorario(){
        return `${moment(this.dataEvento).locale('pt').fromNow()}, ${moment(this.dataEvento).locale('pt').format("dddd")}`;
      },
      dataFormatada(){
        return moment(this.dataEvento).locale('pt').format('L');
      },
      passado(){
        const data = new Date;
        const dataHoje = data.getTime();
        return moment(this.dataEvento).isBefore(dataHoje);
      }
    }
  }

</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .sugestoes {
    margin: {
      left: $spacingBase;
      right: $spacingBase;
      bottom: 0;
      top: $spacingLarge;
    }

    border-radius: $radius;

    @include screen(sm) {
      top: 0;
    }

    cursor: pointer;
    border: $borderSize $colorBase6 solid;

    &:hover {
      border: $borderSize $colorVerde solid;

    }

    &__foto {
      position: relative;
      min-height: 180px;
      @include screen(sm) {
        min-height: 300px;
      }
      width: 100%;
      height: auto;
      background: {
        size: cover;
        position: center;
      }
      .sugestoes__tipo {
        font: {
          size: $sizeMedium;
        }
        position: absolute;
        top: 0;
        right: 0;
        border-radius: $radius;
        border: $borderSize $colorBase4 solid;
        display: inline;
        padding: $spacingXSmall;
        margin: $spacingBase;
        background-color: $colorBg;
      }

      .sugestoes__down {
        font: {
          size: $sizeMedium;
        }
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: $spacingBase;
        &--lft {
          min-width: 80%;
          padding-right: $spacingXSmall;
          .btn--base2 {
            width: 100%;
            text-align:left;
            i{
              padding-right:$spacingXSmall;
            }
          }
        }
        &--rght {
          width: 20%;
        }
      }
    }
    &__info {

      padding: {
        top: $spacingBase;
        left: $spacingBase;
        right: $spacingBase;
      }
      width: 100%;
      background: {
        color: white;
      }

      h3 {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
      }

      p:first-letter{
        text-transform:capitalize;
      }
    }

    &--passado{
      width:100%;
      height:100%;
      top:0;
      left:0;
      background-color:rgba(255,255,255,0.5);
      position:absolute;
    }
  }


</style>

