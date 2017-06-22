<template>
  <el-col :xs="24" :sm="6" :md="6" :lg="6">
  <div class="sugestoes paddingBottom" @click="irParaEvento(idEvento)">

    <div class="sugestoes__foto" :style="`background-image: url('${this.foto}')`">
    <div class="sugestoes__tipo"></div>
    </div>

    <div class="sugestoes__info">
      <h3>{{nomePequeno(24)}}</h3>
      <p> {{humanizarHorario}}</p>
    </div>

  </div>
  </el-col>
</template>

<script>

  import moment from 'moment';

  export default {

    props:['idEvento','nome','dataEvento','foto']
    ,
    data(){
      return {

      }
    },
    methods:{
      irParaEvento(id){
        this.$router.push(`/evento/${id}`);
        window.scrollTo(0,0);
      },
      nomePequeno(letras){
        let nome = this.nome.split('')
        if(nome.length>letras){
          return nome.slice(0,letras).join('') + "...";
        } else {
          return nome.join('');
        }
      }
    },
    computed:{
      humanizarHorario(){
        return `${moment(this.dataEvento).locale('pt').format("dddd")}, ${moment(this.dataEvento).locale('pt').format('L')}`;
      }
    }
  }

</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .sugestoes {
    margin:{
      left:$spacingBase;
      right:$spacingBase;
      bottom:0;
      top: $spacingLarge;
    }

    border-radius:$radius;


    @include screen(sm) {
      top: 0;
    }

    cursor:pointer;
    border: $borderSize $colorBase6 solid;

    &:hover {
      border: $borderSize $colorVerde solid;

    }

    &__foto{
      min-height:180px;
      @include screen(sm){
        min-height:300px;
      }
      width:100%;
      height:auto;
      background:{
        size:cover;
        position:center;
      }
    }
    &__info{

     padding:{
       top:$spacingBase;
       left:$spacingBase;
       right:$spacingBase;
     }
      width:100%;
      background:{
        color:white;
      }
    }
  }



</style>

