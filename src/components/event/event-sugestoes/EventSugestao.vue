<template>
  <div>
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :title="nome">
      <div class="sugestoes paddingBottom">
        <div class="sugestoes__clicar" @click="clicarEvento"></div>

        <div class="sugestoes__foto">
          <!-- foto -->
          <div v-if="foto">
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

          <div class="sugestoes__tipo" v-if="tipoEvento" :title="tipoEvento" style="z-index: 1000;">
            <el-tooltip content="Tipo de Evento" placement="top">
              <i class="fa" :class="classIcon" aria-hidden="true"></i>
            </el-tooltip>
          </div>

          <!-- Gostar -->
          <transition name="el-fade-in-linear">
            <div class="sugestoes__gostar" v-if="auth && interesseAjaxFeito" title="Whishlist" style="z-index: 1000;"
                 @click="clicarInteresse">
              <el-tooltip content="Mostrar interesse" placement="top">
                <i class="fa fa-heart" :class="classGosto" aria-hidden="true"></i>
              </el-tooltip>
            </div>
          </transition>
          <!-- /Gostar -->


          <div class="sugestoes__down">
            <div class="sugestoes__down--lft" v-if="dataEvento">
              <el-tooltip content="Data do Evento" placement="top">
                <el-button type="primary" class="btn--base2" size="small">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i> {{dataFormatada}}
                </el-button>
              </el-tooltip>
            </div>
            <div class="sugestoes__down--rht">
              <el-tooltip content="Inscrever" placement="top">

                <el-button :plain="true" :disabled="true" class="btn--primary" size="small" v-if="passado"
                           title="Inscrições fechadas">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </el-button>
                <el-button type="primary" class="btn--primary" size="small" title="inscrever" @click="clicarInscrever"
                           v-else>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="sugestoes__info">
          <h3>{{nome}}</h3>
          <p v-if="dataEvento"> {{humanizarHorario}}</p>
        </div>

      </div>
    </el-col>


  </div>
</template>

<script>

  import moment from 'moment';
  import lodashDebounce from 'lodash.debounce';

  export default {
    mounted(){
      if (this.auth) {
        Vue.http.get(this.interesseAjaxUrl).then(resposta => {
          // 200 -> dados obtidos
          return resposta.json();
        }, resposta => {
          // erro
          if (resposta.status === 404) {

          }
          return false;
        }).then((data) => {
          this.gostoFeito = data.info;
          this.interesseAjaxFeito = true;

        });
      }
    },
    props: ['idEvento', 'nome', 'dataEvento', 'foto', 'tipoEvento', 'lat', 'lng', 'tipoEventoIcon', 'auth']
    ,
    data(){
      return {
        interesseAjaxFeito: false,
        dialogInscrever: false,
        gostoFeito: ''
      }
    },
    methods: {

      clicarInteresse(){
        if (this.gostoFeito === true || this.gostoFeito === 'true') {
          this.gostoFeito = false;
          this.deleteInteresse();
        } else {
          this.gostoFeito = true;
          this.postInteresse();
        }
      },

      clicarEvento(){
        this.$router.push(`/evento/${this.idEvento}`);
        window.scrollTo(0, 0);
      },
      clicarInscrever(){
        console.log('Inscrever');
      },
      deleteInteresse() {
        this.$http.delete(this.interesseAjaxUrl).then(resposta => {
          // 200 -> dados obtidos
          return resposta.json();
        }, resposta => {

          return false;
        }).then((data) => {
          if (data.status === 200) {

          } else {
            this.gostoFeito = false;
          }

        });
      }
      ,
      postInteresse(){
        this.$http.post(this.interesseAjaxUrl, {id: this.idEvento}).then(
          resposta => {
            // Sucesso
            return resposta.json();
          }, resposta => {

            // Falhado
            return resposta.json();

          }).then(data => {

          // Mostrar erro
          if (data.status === 404) {
          } else {
            this.gostoFeito = true;
          }
        })
      }
    }
    ,
    computed: {
      interesseAjaxUrl()
      {
        return `eventos/${this.idEvento}/interesse`;
      }
      ,
      classGosto()
      {
        if (this.gostoFeito === "true" || this.gostoFeito === true) {
          return 'coracaoVermelho';
        }
      }
      ,
      classIcon()
      {
        return this.tipoEventoIcon;
      }
      ,
      coordenadas()
      {
        return {lat: this.lat, lng: this.lng};
      }
      ,
      mapUrl()
      {
        return `https://maps.googleapis.com/maps/api/staticmap?center="${this.coordenadas.lat},${this.coordenadas.lng}"&zoom=10&size=600x200&key=AIzaSyDeycVva7lFs4Eaye6rvXWknNEGguBEMAg`
      }
      ,
      humanizarHorario()
      {
        return `${moment(this.dataEvento).locale('pt').fromNow()}, ${moment(this.dataEvento).locale('pt').format("dddd")}`;
      }
      ,
      dataFormatada()
      {
        return moment(this.dataEvento).locale('pt').format('L');
      }
      ,
      passado()
      {
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

      &--bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        &--default {
          background-image: url(http://i.imgur.com/OQo8Ctd.png);
          background-repeat: no-repeat;
          background-size: auto;
          background-position: center;
        }
        &--mapa {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;

          &--icon {
            color: $colorVerde;
            font-size: $sizeXXLarge;
            position: inherit;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -80%);
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

      .sugestoes__gostar {
        font: {
          size: $sizeMedium;
        }
        position: absolute;
        top: 0;
        left: 0;
        color: $colorBase6;
        background-color: $colorBg;
        border-radius: $radius;
        border: $borderSize $colorBase4 solid;
        display: inline;
        padding: {
          right: $spacingSmall;
          left: $spacingSmall;
          top: $spacingXSmall;
          bottom: $spacingXSmall;
        }
        margin: $spacingBase;
        cursor: pointer;
        .coracaoVermelho {
          color: $colorVermelho;
        }
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

