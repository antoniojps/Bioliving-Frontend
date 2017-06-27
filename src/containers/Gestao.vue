<template>

  <div>

    <el-dialog title="Editar informações sobre o evento" :visible.sync="dialogEvento" size="large">
      <el-form :model="formEventoPut" style="display:flex;" label-position="top">
        <div style="padding-right:5%" class="formEvento">

        <el-form-item label="Nome" label-width="120px">
          <el-input v-model="formEventoPut.nome_evento" auto-complete="off"></el-input>
        </el-form-item>

          <el-form-item label="Descrição" label-width="120px">
            <el-input v-model="formEventoPut.descricao" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Descrição pequena" label-width="120px">
            <el-input v-model="formEventoPut.descricao_short" auto-complete="off"></el-input>
          </el-form-item>


          <el-form-item label="Facebook" label-width="120px">
            <el-input v-model="formEventoPut.facebook_id" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Criador" label-width="120px">
            <el-input v-model="formEventoPut.utilizadores_id_utilizadores" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Tipo de evento" label-width="120px">
            <el-input v-model="formEventoPut.tipo" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Localização" label-width="120px">
            <el-input v-model="formEventoPut.nome" auto-complete="off"></el-input>
          </el-form-item>



        </div>
        <div class="formEvento">
          <el-form-item label="Data do evento" label-width="120px">
            <br>
          <el-date-picker
            v-model="formEventoPut.data_evento"
            type="datetime"
            placeholder="Pick a day">
          </el-date-picker>
          </el-form-item>

          <el-form-item label="Data do fim" label-width="120px">
            <br>
            <el-date-picker
              v-model="formEventoPut.data_fim"
              type="datetime"
              placeholder="Pick a day">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Preço" label-width="120px">
            <el-input v-model="formEventoPut.preco" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Desconto sócio" label-width="120px">
            <el-input v-model="formEventoPut.desconto_socio" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Mínimo de Participantes" label-width="120px">
            <el-input v-model="formEventoPut.min_participantes" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Mínimo de Participantes" label-width="120px">
            <el-input v-model="formEventoPut.max_participantes" auto-complete="off"></el-input>
          </el-form-item>

        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="putEvento">Confirmar</el-button>
  </span>
    </el-dialog>

    <el-row style="margin-left:auto;margin-right:auto; min-height:100%;" v-if="!adminScope">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" class="gestao__nav">
        <h1 style="text-align:center" class="paddingLarge">Sem acesso</h1>
      </el-col>
    </el-row>

  <el-row style="margin-left:auto;margin-right:auto; min-height:100%;" v-else>
    <el-col :xs="24" :sm="6" :md="4" :lg="4" class="gestao__nav">

      <el-menu default-active="1" class="el-menu-vertical" @open="handleOpen" @close="handleClose"
               @select="mudarPagina">
        <el-menu-item index="1"><i class="el-icon-menu"></i>Dashboard</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-setting"></i>Utilizadores</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>Eventos</el-menu-item>
      </el-menu>
    </el-col>

    <el-col :gutter="24" :xs="24" :sm="18" :md="20" :lg="20" class="gestao__content" v-infinite-scroll="loaderMaisInfo"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check>
      <h1>Gestão - {{pagAtual}}</h1>
      <!-- Dashboard -->

      <div v-if="menuAtivo == 1">
        <el-row>
          <div class="cartoes">
            <div class="cartao">
              <div class="cartao--icon cartao--icon--azul">
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
              </div>

              <div class="cartao--info">
                <div class="cartao--info--titulo">Eventos</div>
                <h1>{{nEventos}}</h1>
              </div>
            </div>


            <div class="cartao">
              <div class="cartao--icon cartao--icon--verde">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>

              <div class="cartao--info">
                <div class="cartao--info--titulo">Utilizadores</div>
                <h1>{{nUtilizadoresRecentes}}</h1>
              </div>
            </div>

            <div class="cartao">
              <div class="cartao--icon cartao--icon--amarelo">
                <i class="fa fa-users" aria-hidden="true"></i>
              </div>

              <div class="cartao--info">
                <div class="cartao--info--titulo">Utilizadores Totais</div>
                <h1>{{nUtilizadoresTotais}}</h1>
              </div>
            </div>
          </div>
        </el-row>

        <h3 class="paddingVertLarge" style="padding-bottom:0">Número de utilizadores registados nos últimos dias</h3>
        <chart-eventos class="paddingVertLarge"></chart-eventos>

      </div>

      <!-- /Dashboard -->

      <!-- Utilizadores -->

      <div v-if="menuAtivo == 2">

        <el-form ref="form" :model="formUtilizador" label-width="120px" label-position="top"
                 @keyup.enter.prevent="pesquisarUtilizador">
          <el-form-item label="Pesquisar">
            <el-input v-model="formUtilizador.msg"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="pesquisarUtilizador">Create</el-button>
          </el-form-item>
        </el-form>


        <table>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
          <tr v-for="user in utilizadoresData">
            <td>{{user.nome}} {{user.apelido}}</td>
            <td>{{user.email}}</td>
            <td>{{user.nome_estatuto}}</td>

            <td>
              <el-tooltip content="Por desenvolver" placement="top">

              <el-button type="primary" size="mini">Editar</el-button>
              </el-tooltip>
              <el-tooltip content="Por desenvolver" placement="top">
                <el-button type="danger" size="mini" v-if="user.ativo==='1'" @click="handleAtivarUtilizador(user)">Desativar</el-button>
              <el-button type="info" size="mini" v-if="user.ativo==='0'" @click="handleAtivarUtilizador(user)">Ativar</el-button>
              </el-tooltip>

            </td>

          </tr>

        </table>



      </div>

      <!-- /Utilizadores -->

      <!-- Eventos -->

      <div v-if="menuAtivo == 3">
        <el-form ref="form" :model="formEvento" label-width="120px" label-position="top"
                 @keyup.enter.prevent="pesquisarEvento">
          <el-form-item label="Pesquisar">
            <el-input v-model="formEvento.msg"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="pesquisarEvento">Create</el-button>
          </el-form-item>
        </el-form>


        <table>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
          <tr v-for="evento in eventosData">
            <td>{{evento.nome_evento}}</td>
            <td>{{evento.data_evento}}</td>
            <td>{{evento.nome_tipo_evento}}</td>
            <td>
              <a :href="`#/evento/${evento.id_eventos}`" target="_blank"><el-button type="primary" size="mini">Abrir</el-button></a>
              <el-button type="primary" size="mini" @click="abrirDialogEvento(evento.id_eventos)">Editar</el-button>
            </td>
          </tr>

        </table>


      </div>

      <!-- /Eventos -->

    </el-col>
  </el-row>
  </div>

</template>

<script>

  import ChartEventos from '../components/ChartEventos/ChartEventos.vue';
  import lodashDebounce from 'lodash.debounce';
  import queryString from 'query-string';
  import {mapGetters} from 'vuex';
  import H from '../custom/Helpers';
  import moment from 'moment';

  export default {

    components: {
      'chart-eventos': ChartEventos

    },


    mounted(){


      this.$http.get('count/eventos').then(
        resposta => {
          // Ok
          return resposta.json();
        }, resposta => {
          // Erro
        }).then(data => {
        this.nEventos = data.resultado;
      })

      this.$http.get('count/utilizadores').then(
        resposta => {
          // Ok
          return resposta.json();
        }, resposta => {
          // Erro
        }).then(data => {
        this.nUtilizadoresTotais = data.resultado;
      })

      this.$http.get('count/novos/utilizadores').then(
        resposta => {
          // Ok
          return resposta.json();
        }, resposta => {
          // Erro
        }).then(data => {
        this.nUtilizadoresRecentes = data.resultado;
      })

    },


    data(){
      return {
        busy: false,
        formUtilizador: {
          msg: ''
        },
        formEvento: {
          msg: ''
        },
        nUtilizadoresRecentes: '',
        nEventos: '',
        nUtilizadoresTotais: '',
        menuAtivo: 1,
        utilizadoresData: '',
        eventosData: '',
        proxPagina: '',
        proxPaginaEventos: '',
        dialogEvento: false,
        dialogEventoId: '',
        formEventoPut:  {
          "id_eventos": "",
          "nome_evento": "",
          "data_registo_evento": "",
          "data_evento": "",
          "preco": "",
          "desconto_socio": "",
          "descricao_short": "",
          "descricao": "",
          "min_participantes": "",
          "max_participantes": "",
          "data_fim": "",
          "ativo": "",
          "localizacao_localizacao": "",
          "tipo_evento_id_tipo_evento": "",
          "facebook_id": "",
          "utilizadores_id_utilizadores": "",
          "tipo": "Passeio",
          "localizacao": "",
          "nome": "",
          "inscritos": "",
          "interessados": "",
          "participantes": ""
        },
        formAtualizado: false
      }
    },

    methods: {

      abrirDialogEvento(id){
        this.dialogEvento = true;

        this.$http.get(`eventos/${id}`).then(
          resposta => {
            // Ok
            return resposta.json();
          }, resposta => {
            // Erro
          }).then(data => {
            this.formEventoPut = data.data[0];
        })

      },

      handleAtivarUtilizador(user) {
        console.log(user);
      },
      handleDeleteUtilizador(user) {
        console.log(user);
      },

      handleEditEvento(evento) {
        console.log(evento);
      },
      handleDeleteEvento(evento) {
        console.log(evento);
      },


      loaderMaisInfo: lodashDebounce(function () {
        if (this.menuAtivo === '2' && this.proxPagina && !this.busy) {

          this.busy = true;
          this.$http.get(this.proxPagina).then(
            resposta => {
              // Ok
              return resposta.json();
            }, resposta => {
              // Erro
            }).then(data => {
            this.utilizadoresData.push.apply(this.utilizadoresData, data.data);
            this.proxPagina = data.proxPagina;
            this.busy = false;
          })
        } else if (this.menuAtivo === '3' && this.proxPaginaEventos && !this.busy) {
          this.busy = true;
          this.$http.get(this.proxPagina).then(
            resposta => {
              // Ok
              return resposta.json();
            }, resposta => {
              // Erro
            }).then(data => {
            this.eventosData.push.apply(this.eventosData, data.data);
            this.proxPagina = data.proxPagina;
            this.busy = false;
          })
        }
      }, 250, {'maxWait': 5000}),


      pesquisarUtilizador(){
        this.$http.get(`utilizadores?msg=${this.formUtilizador.msg}`).then(
          resposta => {
            // Ok
            return resposta.json();
          }, resposta => {
            // Erro
          }).then(data => {
          if (data.data)
            this.utilizadoresData = data.data;

        })
      },

      pesquisarEvento(){
        this.$http.get(`eventos?msg=${this.formEvento.msg}`).then(
          resposta => {
            // Ok
            return resposta.json();
          }, resposta => {
            // Erro
          }).then(data => {
          if (data.data)
            this.eventosData = data.data;
        })
      },

      handleClick() {
        console.log('click');
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      mudarPagina(index){
        this.menuAtivo = index;
      },
      putEvento(){

        let query = {
          idEvento: this.formEventoPut.id_eventos,
          nomeEvento: this.formEventoPut.nome_evento,
          data: moment(this.formEventoPut.data_evento).unix(),
          descricao: this.formEventoPut.descricao,
          descricaoShort: this.formEventoPut.descricao_short,
          maxParticipantes: this.formEventoPut.max_participantes,
          minParticipantes: this.formEventoPut.min_participantes,
          dataFim: moment(this.formEventoPut.data_fim).unix(),
          local: this.formEventoPut.localizacao_localizacao,
          tipo: this.formEventoPut.tipo_evento_id_tipo_evento,
          preco: this.formEventoPut.preco,
          facebook: this.formEventoPut.facebook_id,
          descontoSocio: this.formEventoPut.desconto_socio

        };

        H.limparObj(query);

        this.$Progress.start();
        this.$http.put(`eventos/${this.formEventoPut.id_eventos}`, query).then(
          resposta => {

            this.$message({
              message: 'Evento atualizado!',
              type: 'success'
            });

            return resposta.json();
          }, resposta => {


            this.$message({
              message: 'Erro ao atualizar as informações',
              type: 'warning'
            });

            this.$Progress.fail();
            return resposta.json();

          }).then(data => {

        })
      }
    },

    computed: {

      ...mapGetters([
        'auth',
        'idUtilizador',
        'publicoScope',
        'normalScope',
        'socioScope',
        'colaboradorScope',
        'adminScope'
      ]),

      ativoIco(ativo){
        if (ativo === 1) {
          return 'Ativo';
        } else {
          return 'Desativo';
        }
      }
      ,
      pagAtual(){
        if (this.menuAtivo == 1) {
          return 'Dashboard';
        } else if (this.menuAtivo === '2') {
          if (!this.utilizadoresData) {
            this.$http.get('utilizadores').then(
              resposta => {
                // Ok
                return resposta.json();
              }, resposta => {
                // Erro
              }).then(data => {
              this.utilizadoresData = data.data;
              this.proxPagina = data.proxPagina;
            })
          }

          return 'Utilizadores';
        } else if (this.menuAtivo === '3') {

          if (!this.eventosData) {
            this.$http.get('eventos').then(
              resposta => {
                // Ok
                return resposta.json();
              }, resposta => {
                // Erro
              }).then(data => {
              this.eventosData = data.data;
              this.proxPaginaEventos = data.proxPagina;
            })
          }

          return 'Eventos';
        }
      }
    },
    watch: {}
  }
</script>

<style lang="scss">

  @import '../assets/scss/styles.scss';

  .formEvento{
    width:100%;
    display:block;
    @include screen(sm){
      width:45%;

    }
  }

  .gestao {

    display: flex;
    align-items: stretch;

    &__content {
      @include screen(sm) {
        padding-left: $spacingLarge;
      }

      .el-button:focus, .el-button:hover {
        color: #fff;
        border-color: #8a962b;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid $colorBase7;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: $colorBase7;
      }

    }

    &__nav {
      min-height: 100%;

      .el-menu {
        border-radius: 2px;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        border: $borderSize $colorBase7 solid;
        background-color: $colorBg;
      }

      .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: $colorBase7;
      }

    }

    .el-button:focus, .el-button:hover {
      color: $colorBase;
      border-color: #8a962b;
    }

    .el-button:active {
      color: $colorBase;
      border-color: #B3C14E;
      outline: 0;
    }

  }

  .cartoes {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    @include screen(sm) {
      flex-direction: row;

    }
  }

  .cartao {
    display: flex;
    width: 100%;
    margin: {
      right: $spacingLarge;
    }
    border-radius: $radius;
    border: $borderSize $colorBase7 solid;

    margin-top: 1rem;
    &:first-child {
      margin-top: 0;
    }

    @include screen(sm) {
      margin-top: 0;
    }
    &--icon {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: $borderSize $colorBase7 solid;
      color: white;
      text-align: center;
      font-size: $sizeXXLarge;
      &--vermelho {
        background-color: $colorVermelho;
      }

      &--azul {
        background-color: $colorAzul;
      }

      &--verde {
        background-color: $colorVerde;
      }
      &--amarelo {
        background-color: $colorAmarelo;
      }
    }
    &--info {
      width: 70%;
      padding: $spacingBase;
      &--titulo {
        padding-bottom: $spacingBase;
      }
    }
  }


</style>

