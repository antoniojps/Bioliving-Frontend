<template>
  <div>
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :title="nome">
      <div class="sugestoes paddingBottom">

        <div class="sugestoes__clicar" @click="clicarEvento"></div>


        <div class="sugestoes__foto">
          <!-- foto -->
          <div v-if="this.foto">
            <div class="sugestoes__foto--bg" :style="`background-image: url('${foto}')`"></div>
          </div>
          <!-- foto -->

          <!-- mapa -->
          <div v-if="!foto && lat && lng">
            <div class="sugestoes__foto--bg sugestoes__foto--bg--mapa" :style="`background-image: url('${mapUrl}')`">
              <i class="sugestoes__foto--bg--mapa--icon fa fa-map-marker" aria-hidden="true"></i>
            </div>
          </div>
          <!-- /mapa -->

          <!-- default -->
          <div>
            <div class="sugestoes__foto--bg sugestoes__foto--bg--default" v-if="!foto && !lat && !lng"></div>
          </div>
          <!-- /default -->

          <div class="sugestoes__tipo" :title="tipoEvento"><i class="fa fa-bicycle" aria-hidden="true"></i></div>
          <div class="sugestoes__down">
            <div class="sugestoes__down--lft">
              <el-button type="primary" class="btn--base2" size="small">
                <i class="fa fa-calendar-o" aria-hidden="true"></i> {{dataFormatada}}
              </el-button>

            </div>
            <div class="sugestoes__down--rht">
              <el-button :plain="true" :disabled="true" class="btn--primary" size="small" v-if="passado"
                         title="Inscrições fechadas">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </el-button>
              <el-button type="primary" class="btn--primary" size="small" title="inscrever" @click="clicarInscrever"
                         v-else>
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

    props: ['idEvento', 'nome', 'dataEvento', 'foto', 'tipoEvento', 'lat' ,'lng']
    ,
    data(){
      return {
        dialogInscrever: false
      }
    },
    methods: {
      clicarEvento(){
        console.log('Ir para evento');
        this.$router.push(`/evento/${this.idEvento}`);
        window.scrollTo(0, 0);
      },
      clicarInscrever(){
        console.log('Inscrever');

      }
    },
    computed: {
      coordenadas(){
        return {lat:this.lat,lng:this.lng};
      },
      mapUrl(){
        return `https://maps.googleapis.com/maps/api/staticmap?center="${this.coordenadas.lat},${this.coordenadas.lng}"&zoom=14&size=600x200&key=AIzaSyDeycVva7lFs4Eaye6rvXWknNEGguBEMAg`
      },
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
    position: relative;
    margin: {
      bottom: 0;
      top: $spacingLarge;
    }
    @include screen(lg) {
      margin: {
        left: $spacingBase;
        right: $spacingBase;
        bottom: 0;
        top: $spacingLarge;
      }
    }

    border-radius: $radius;

    @include screen(sm) {
      top: 0;
    }
    border: $borderSize $colorBase6 solid;

    &:hover {
      border: $borderSize $colorVerde solid;

    }

    &__clicar {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 999;
      cursor: pointer;
      width: 100%;
      min-height: 130px;
      @include screen(sm) {
        min-height: 250px;
      }
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

      &--bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        &--default {
          background-image: url(http://i.imgur.com/OQo8Ctd.png);
          background-repeat: no-repeat;
          background-size: auto;
          background-position: center;
        }
        &--mapa{
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;

          &--icon {
            color:$colorVerde;
            font-size:$sizeXXLarge;
            position:inherit;
            top:50%;
            left:50%;
            transform:translate(-50%,-80%);
          }
        }
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
            text-align: left;
            i {
              padding-right: $spacingXSmall;
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

      h3, p {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
      }

      p:first-letter {
        text-transform: capitalize;
      }
    }

    &--passado {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.5);
      position: absolute;
    }
  }


</style>

