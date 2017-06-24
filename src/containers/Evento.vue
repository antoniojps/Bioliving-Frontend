<template>
  <div>

    <el-dialog title="Inscrição" :visible.sync="inscricao">
      <el-form :model="form">
        <el-form-item label="Promotion name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="inscricaoToggle = false">Cancel</el-button>
    <el-button type="primary" @click="inscricaoToggle = false">Confirm</el-button>
  </span>
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
                <el-button type="primary" size="large" class="expandir" disabled v-if="passado">
                  Inscrever
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </el-button>

                <!-- evento futuro -->
                <el-button type="primary" size="large" class="expandir" @click="inscricaoToggle" v-else>
                  Inscrever
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </el-button>
              </div>
              <!-- informaçao obtida -->

              <div class="btns-share">
                <el-button :plain="true" type="info" class="marginVertBase btns-share__btn">
                  Contactar
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>

                </el-button>

                <el-popover ref="popoverShare" placement="bottom-start" width="160" title="Redes sociais">
                  <el-button-group>
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
          <event-localizacao v-if="evento.data[0].localizacao" :lat="evento.data[0].lat" :lng="evento.data[0].lng"></event-localizacao>
        </div>
        <!-- /Componente Localizacao -->

        <!-- Componente Localizacao -->
        <event-colaboradores v-if="evento.data" :idEvento="id"></event-colaboradores>
        <!-- /Componente Localizacao -->

        <hr v-if="evento.data">
        <event-sugestoes v-if="evento.data" :titulo="'Outros eventos que te podem interessar…'"></event-sugestoes>
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
        inscricao: false,
        ajaxFeito: false,
        paginaInexistente: false,
        evento: {}, // dados preenchidos atraves do ajax
        form: {
          name: '',
          region: ''
        }
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

      inscricaoToggle(){
        console.log('inscricao');
        this.inscricao = !this.inscricao;
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
      }
    },
    watch: {
      id(){
        this.getDados();
      },
      /*
       Verificamos se a autenticação já foi feita, forma de tornar assincrono
       Decidimos optar por esta opçao pois o Apache não lidava bem com pedidos ao mesmo tempo do mesmo browser dai termos que tornar assincrono os pedidos
       */
      getConcluido(){
        if (this.getConcluido) {
          this.getDados();
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

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

