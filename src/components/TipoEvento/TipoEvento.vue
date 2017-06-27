<template>
  <div>
    <el-input style="width:36%" placeholder="Tipo de evento" v-model="tipoEvento"></el-input>
    <div class="icons">
      <el-input class="icons__input" placeholder="Icon" v-model="iconSearch"></el-input>

        <div class="icons__icon" v-for="(icon,index) in resultados" >
          <div @click="selectIcon(index)" style="display:flex; justify-content:space-between">
            <i class="fa" :class="icon.classe">
            </i>
            <div v-if="iconsExistentes">
            {{icon.classe.slice(3)}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  import lodashDebounce from 'lodash.debounce';
  /*
   use Bioliving\Custom\Helper as Helper;
   {
   "nome_tipo_evento": "Cultural",
   "icons_id": "290"
   }
   */

  export default {
    data() {
      return {
        tipoEvento: '',
        iconSearch: '',
        resultados: [],
        iconsExistentes: false,
        idClicado: '',
        classClicada: '',
      }
    },
    methods: {

      selectIcon(index){
        this.idClicado = this.resultados[index].id_icons;
        this.classClicada = this.resultados[index].classe;
        this.iconSearch = this.classClicada;
      }
    },
    computed:{
      removeFa(classe){
        if(this.iconsExistentes){
        return classe.slice('3'); // remove fa-
        }
      }
    },

    watch:{
      iconSearch: lodashDebounce(function () {
        this.$http.get(`icones?msg=${this.iconSearch}`).then(resposta => {
          // 200 -> login feito
          this.iconsExistentes = true;
          return resposta.json()
        }, resposta => {
          // erro
          this.iconsExistentes = false;
        }).then((data) => {
          this.resultados = data.data;
        })
      }, 250, {'maxWait': 5000}),
    }

  };
</script>

<style lang="scss">

  @import '../../assets/scss/styles.scss';

  .icons {
    width:36%;
    margin-left:auto; margin-right:auto;

    &__input {

    }
    &__resultado {
      max-height:150px;
      overflow-y:scroll;
      background-color:$colorBg;
      border: $borderSize $colorBase7 solid;
    }

    &__icon {
      cursor:pointer;
      padding:$spacingBase;
      transition: all 100ms ease-in;
      &:hover{
        background-color:$colorBase7;
        border-radius:$radius;
      }

    }
  }
</style>

