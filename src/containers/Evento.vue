<template>
  <div>

    <el-dialog title="Inscrição" :visible.sync="inscricao">
      <div class="eventos__info" v-if="evento.data">
        <h2>{{evento.data[0].nome_evento}}</h2>
        <p v-if="evento.data[0].descricao_short" v-html="descricaoShort"></p>
      </div>
      <div v-if="evento.data">
        <event-extras :idEvento="id" :data="evento.data[0].data_evento"></event-extras>
      </div>
      <hr>
      <div class="inscricao__comprometer">
        <p>Li todas as informações e comprometo-me a participar no evento</p>
        <el-checkbox v-model="inscritoCheck">Confirmo</el-checkbox>
      </div>
    </el-dialog>

    <el-dialog title="Cartão de inscrição" :visible.sync="dialogInscrito" class="inscrito">
      <div class="eventos__info" v-if="evento.data">
        <div class="eventos__info--inscrito">
          <h2>{{evento.data[0].nome_evento}}</h2>
          <el-button type="info" size="mini" style="margin-left:.5rem">Inscrito</el-button>
        </div>
        <p v-if="evento.data[0].descricao_short" v-html="descricaoShort"></p>
      </div>
      <div v-if="evento.data">
        <event-extras :idEvento="id" :data="evento.data[0].data_evento"></event-extras>
      </div>
      <hr>
      <div>
        <el-tooltip content="Anular inscrição" placement="top">
          <el-switch
            v-model="inscricaoSwitch"
            on-color="#50bfff"
            off-color="#E5E9F2"
            on-text=""
            off-text=""
            @change="cancelarInscricao">
          </el-switch>
        </el-tooltip>

      </div>

    </el-dialog>

    <el-row :gutter="48" style="margin-left:auto;margin-right:auto;">
      <!-- Coluna esquerda -->
      <el-col :xs="24" :sm="16" :md="16" :lg="16">
        <div class="eventos__info" v-if="evento.data">
          <h1>{{evento.data[0].nome_evento}}</h1>
          <p v-if="evento.data[0].descricao_short" v-html="descricaoShort"></p>

          <p v-if="evento.data[0].descricao" v-html="descricao"></p>
        </div>
        <awesome-loader v-else></awesome-loader>

        <!-- Componente Eventos -->
        <div v-if="evento.data">
          <event-extras :idEvento="id" :data="evento.data[0].data_evento"></event-extras>
        </div>
        <!-- /Componente Eventos -->

      </el-col>
      <!-- /Coluna esquerda -->


      <!-- Coluna direita -->
      <el-col :xs="24" :sm="8" :md="8" :lg="8" class="cover">

        <el-row class="cover--info" style="padding-left:0; padding-right:0;">
          <el-col :xs="24" :sm="24" style="padding-left:0" v-loading="!evento.data"
                  element-loading-text="A carregar...">
            <div>
              <!-- loading botao -->
              <el-button type="primary" size="large" class="expandir" v-if="!evento.data">
                Inscrever
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </el-button>
              <!-- /loading botao -->

              <!-- informaçao obtida -->
              <div v-else>

                <!-- evento passado -->
                <el-button type="primary" size="large" class="expandir" disabled v-if="passado && !inscricaoFeita">
                  Inscrições fechadas
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </el-button>

                <!-- evento futuro -->
                <!-- Sem inscricao -->
                <el-button type="primary" size="large" class="expandir" @click="inscricaoToggle"
                           v-if="!passado && !inscricaoFeita">
                  Inscrever
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </el-button>
                <!-- /Sem inscricao -->

                <!-- Inscrito -->
                <div v-if="inscricaoFeita" class="inscrito">
                  <el-button type="info" size="large" class="expandir" @click="inscritoToggle">
                    Inscrito
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </el-button>
                </div>

                <!-- /Inscrito -->

              </div>
              <!-- informaçao obtida -->

              <div class="btns-share">
                <el-button v-if="auth" :plain="true" type="danger" class="btn--love marginVertBase btns-share__btn"
                           @click="gostarEvento">
                  <i class="fa fa-heart" :class="{'btn--love--active':gostoFeito}" aria-hidden="true"></i>
                </el-button>

                <el-popover ref="popoverShare" placement="bottom-start" width="160" title="Redes sociais">
                  <el-button-group
                    style="display:flex; align-items:center; justify-content:center; margin-bottom:.75rem;">
                    <social-sharing v-if="evento.data" :url="shareUrl" :title="shareText"
                                    :description="evento.data[0].descricao_short" hashtags="bioliving" inline-template>
                      <div>
                        <network network="facebook">
                          <el-button type="primary" class="btn--facebook"><i class="fa fa-facebook"
                                                                             aria-hidden="true"></i>
                          </el-button>
                        </network>
                        <network network="twitter">
                          <el-button type="info"><i class="fa fa-twitter" aria-hidden="true"></i></el-button>
                        </network>
                        <network network="pinterest">
                          <el-button type="danger"><i class="fa fa-pinterest-p" aria-hidden="true"></i></el-button>
                        </network>
                      </div>
                    </social-sharing>
                  </el-button-group>
                </el-popover>

                <el-button :plain="true" type="info" class="marginVertBase btns-share__btn" style="width:49%"
                           v-popover:popoverShare>
                  Partilhar
                  <i class="fa fa-share-square-o" aria-hidden="true"></i>
                </el-button>
              </div>
            </div>
            <div class="info-preco" v-if="evento.data">
              <div v-if="evento.data[0].preco">
                <h2 class="paddingVertBase info-preco__title" v-if="mostrarPreco">Por pessoa: {{preco}}</h2>
                <h2 class="paddingVertBase info-preco__title" v-else>{{preco}}</h2>
              </div>
              <p v-if="evento.data[0].data_evento" class="size-sm info-preco__data">{{humanizarHorarioRelativo}}</p>
            </div>
          </el-col>
        </el-row>

        <!-- Componente Facebook Evento -->
        <el-row class="facebook-card" style="padding-left:0; padding-right:0;" v-if="evento.data">
          <div v-if="evento.data[0].facebook_id">
            <h3>No Facebook :</h3>
            <facebook-event :id="evento.data[0].facebook_id"></facebook-event>
          </div>
        </el-row>
        <!-- Componente Facebook Evento -->


      </el-col>
      <!-- /Coluna direita -->

      <!-- Coluna Baixo -->

      <el-col :xs="24" :sm="24" :md="24" :lg="24" class="cover">
        <!-- Componente Localizacao -->
        <div v-if="evento.data">
          <event-localizacao v-if="evento.data[0].localizacao" :lat="evento.data[0].lat"
                             :lng="evento.data[0].lng"></event-localizacao>
        </div>
        <!-- /Componente Localizacao -->

        <!-- Componente Localizacao -->
        <event-colaboradores v-if="evento.data" :idEvento="id"></event-colaboradores>
        <!-- /Componente Localizacao -->


      </el-col>

    </el-row>
  </div>
</template>

<script>

  import FacebookEvent from '../components/facebook-event/FacebookEvent.vue';
  import EventExtras from '../components/event/event-extras/EventExtras.vue';
  import EventLocalizacao from '../components/event/event-localizacao/EventLocalizacao.vue';
  import EventColaboradores from '../components/event/event-colaboradores/EventColaboradores.vue';
  import EventSugestoes from '../components/event/event-sugestoes/EventSugestoes.vue';
  import AwesomeLoader from '../components/global/Loader/Loader.vue';
  import moment from 'moment';
  import linkifyStr from 'linkifyjs/string';

  import {mapGetters} from 'vuex';

  export default {

    props: ['id'],

    components: {
      'facebook-event': FacebookEvent,
      'event-extras': EventExtras,
      'event-localizacao': EventLocalizacao,
      'event-colaboradores': EventColaboradores,
      'event-sugestoes': EventSugestoes,
      'awesome-loader': AwesomeLoader
    },
    data(){
      return {
        inscricaoSwitch: false,
        dialogInscrito: false,
        inscricao: false,
        ajaxFeito: false,
        paginaInexistente: false,
        evento: {}, // dados preenchidos atraves do ajax
        form: {
          name: '',
          region: ''
        },
        inscritoCheck: false,
        inscricaoFeita: false,
        gostoFeito: false,
      }
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

      interesseAjaxUrl()
      {
        return `eventos/${this.id}/interesse`;
      },

      shareUrl(){
        return window.location.href;
      },
      humanizarHorario(){
        return `${moment(this.evento.data[0].data_evento).locale('pt').format("dddd")}, ${moment(this.evento.data[0].data_evento).locale('pt').format('L')}`;
      },
      humanizarHorarioRelativo(){
        return `${moment(this.evento.data[0].data_evento).locale('pt').fromNow()}, ${moment(this.evento.data[0].data_evento).locale('pt').format('L')}`;
      },
      shareText(){
        return `${this.evento.data[0].nome_evento}, ${this.humanizarHorario}`;
      },
      mostrarPreco(){
        if (this.ajaxFeito) return !!this.evento.data[0].preco;
      },
      preco(){
        let resultado;
        if (this.ajaxFeito) {
          if (this.evento.data[0].preco > 0) {
            resultado = `€${(this.evento.data[0].preco).replace(/\.0+$/, '')}`; // replace matches da regular expression por ''  remove 0s desnecessários
          } else {
            resultado = 'Gratuito!';
          }
        }
        return resultado;
      },
      descricao(){
        if (this.ajaxFeito)
          return linkifyStr(this.evento.data[0].descricao, {});
      },
      descricaoShort(){
        if (this.ajaxFeito) {
          return linkifyStr(this.evento.data[0].descricao_short, {})
        }
      },
      passado(){
        const data = new Date;
        const dataHoje = data.getTime();
        return moment(this.evento.data[0].data_evento).isBefore(dataHoje);
      }
    },
    methods: {

      gostarEvento(){
        if (this.gostoFeito) {
          this.deleteInteresse();
        } else {
          this.postInteresse();
        }
      }
      ,

      redirectLogin(){
        this.$router.push({name: 'home', params: {query: 'login'}})
      },

      deleteInteresse() {
        this.$http.delete(this.interesseAjaxUrl).then(resposta => {
          // 200 -> dados obtidos
          this.gostoFeito = false;
          this.$message({
            type: 'success',
            message: 'Interesse removido'
          });
          return resposta.json();
        }, resposta => {
          this.gostoFeito = true;
          this.$message({
            type: 'error',
            message: 'Ocorreu um erro e não foi possivel remover o interesse'
          });
          return false;
        }).then((data) => {

        });
      }

      ,
      postInteresse(){
        this.$http.post(this.interesseAjaxUrl, {id: this.id}).then(
          resposta => {
            // Sucesso
            this.gostoFeito = true;
            this.$message({
              type: 'success',
              message: 'Interesse adicionado'
            });
            return resposta.json();
          }, resposta => {

            // Falhado
            this.$message({
              type: 'error',
              message: 'Ocorreu um erro'
            });
            this.gostoFeito = false;

            return resposta.json();

          }).then(data => {
        })
      },

      cancelarInscricao(){
        if (!this.inscricaoSwitch) {
          this.$confirm('Confirma que deseja anular a inscrição?', 'Anulação', {
            confirmButtonText: 'Anular',
            cancelButtonText: 'Cancelar',
            type: 'warning'
          }).then(() => {
            this.$Progress.start();
            this.$http.delete(`eventos/${this.id}/inscrito`).then(
              resposta => {
                this.$Progress.finish();
                this.inscricaoFeita = false;
                return resposta.json();
              }, resposta => {
                this.$Progress.fail();
                this.inscricaoFeita = true;
                return resposta.json();
              }).then(data => {
            });
            this.$message({
              type: 'success',
              message: 'Inscrição anulada'
            });
            this.inscritoToggle();

          }).catch(() => {
            this.inscricao = false;
            this.inscritoToggle();
            this.$message({
              type: 'info',
              message: 'Anulação cancelada'
            });
          });
        }
      },
      inscricaoToggle(){
        if (this.auth) {
          this.inscricao = !this.inscricao;
        }
      },

      inscritoToggle(){
        if (this.auth) {
          this.dialogInscrito = !this.dialogInscrito;
        }
      },

      getDados(){
        this.$http.get('eventos/' + this.id).then(resposta => {
          this.paginaInexistente = false;
          // 200 -> dados obtidos
          return resposta.json()
        }, resposta => {
          // erro
          if (resposta.status === 404) {
            console.log('pagina inexistente');
          } else {

          }
          return false;
        }).then((data) => {
          if (data.status === '200') {
            this.evento = data;
            this.ajaxFeito = true;
          } else {
            this.paginaInexistente = true;
          }
        })

        // Ver se esta inscrito ou nao

        this.$http.get(`eventos/${this.id}/inscrito`).then(resposta => {
          // 200
          return resposta.json();
        }, resposta => {
          return resposta.json();
        }).then(data => {

          if (data.info === 'true') {
            this.inscricaoFeita = true;
            this.inscricaoSwitch = true;
          } else if (data.info === 'false') {
            this.inscricaoFeita = false;
          }
        })

        // Ver se meteu gosto ou nao

        this.$http.get(this.interesseAjaxUrl).then(resposta => {
          // 200 -> dados obtidos
          return resposta.json();
        }, resposta => {
          // erro
          if (resposta.status === 404) {

          }
          return false;
        }).then((data) => {
          if (data.info === 'true') {
            this.gostoFeito = true;

          } else if (data.info === 'false') {
            this.gostoFeito = false;
          }
        });

      }
    }
    ,
    watch: {
      id()
      {
        this.getDados();
      }
      ,
      /*
       Verificamos se a autenticação já foi feita, forma de tornar assincrono
       Decidimos optar por esta opçao pois o Apache não lidava bem com pedidos ao mesmo tempo do mesmo browser dai termos que tornar assincrono os pedidos
       */
      getConcluido()
      {
        if (this.getConcluido) {
          this.getDados();
        }
      }
      ,
      inscritoCheck()
      {
        if (this.inscritoCheck) {
          this.$confirm('Clique inscrever para confirmar a inscrição', 'Confirmação', {
            confirmButtonText: 'Inscrever',
            cancelButtonText: 'Cancelar',
            type: 'info'
          }).then(() => {
            this.$Progress.start();
            this.$http.post(`eventos/${this.id}/inscrito`).then(
              resposta => {
                this.$Progress.finish();
                this.inscricaoFeita = true;
                return resposta.json();
              }, resposta => {
                this.$Progress.fail();
                this.inscricaoFeita = false;
                return resposta.json();
              }).then(data => {
            });
            this.$message({
              type: 'success',
              message: 'Inscrição completa'
            });
            this.inscricaoToggle();

          }).catch(() => {
            this.inscritoCheck = false;
            this.inscricaoToggle();
            this.$message({
              type: 'info',
              message: 'Inscrição cancelada'
            });
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  .el-button--danger.is-plain:focus {
    background: #fff;
    border-color: $colorBase5;
    color: $colorBase5;
  }

  .btn--love {

    .el-button--danger.is-plain:focus {
      background: #fff;
      border-color: $colorBase6;
    }

    i {
      transition: all 200ms ease-in-out;
      &:hover {
        color: $colorVermelho;
      }
    }


    &--active {
      color: $colorVermelho;
    }
  }

  .el-popover__title {
    color: rgb(31, 45, 61);
    font-size: 13px;
    line-height: 1;
    padding: $spacingSmall;
    margin-bottom: 0;
  }

  .inscrito {
    .el-button:active {
      color: #fff;
      border-color: $colorAzul;
      outline: 0;
    }

    .el-button:focus, .el-button:hover {
      color: #fff;
      border-color: darken($colorAzul, 5%);
    }
  }

  .eventos__info {
    &--inscrito {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      h3 {
        padding-right: $spacingLarge;
      }
    }
  }

  .inscricao {
    &__comprometer {
      width: 100%;
      background-color: lighten($colorBase7, 5%);
      border: $borderSize $colorBase7 solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      @include screen(sm) {
        flex-direction: row;
      }

      p {
        width: 80%;
        font-weight: $bold;
        padding: $spacingBase;

      }
      .el-checkbox__label {
        padding: $spacingBase;

        width: 20%;
        font-weight: $bold;
      }
      border-radius: $sizeSmall;
      padding: $spacingBase;
    }
  }

  .cover {
    display: flex;
    flex-direction: column;
    &--info {
      padding: {
        top: $spacingBase;
        bottom: $spacingBase;
        right: 0;
        left: 0;
      }
    }
  }

  .facebook-card {
    padding: {
      top: $spacingBase;
      bottom: $spacingBase;
      right: 0;
      left: 0;
    }

    h3 {
      color: $colorBase4;
      font-weight: 400;
    }
  }

  .el-carousel {
    &__container {
      min-height: auto;
      @include screen(md) {
        min-height: 300px;
      }
      @include screen(lg) {
        min-height: 450px;
      }
    }
    &--img {
      width: 100%;
      height: auto;
    }
  }

  .info-preco {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .btns-share {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    &__btn {
      width: 49%;
    }
  }


</style>

