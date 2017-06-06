<template>
  <div>
    <!-- Infos default -->
    <el-row :gutter="12" class="extra" v-if="index===0">
      <el-col :xs="4" :sm="2" :md="2" :lg="2" class="extra__icon">
        <i class="fa fa-calendar-o"></i>
      </el-col>

      <el-col :xs="20" :sm="22" :md="22" :lg="22">

        <div class="extra__title">
          <h2>{{horaTitulo}}</h2>
          <div class="extra__title--icon">
            <i class="fa fa-clock-o"></i>
            <p>{{horaInicio}}</p>
          </div>
        </div>
        <p>{{humanizarHorario}}</p>
      </el-col>
    </el-row>


    <!-- infos do utilizador -->
    <el-row :gutter="12" class="extra">
      <el-col :xs="4" :sm="2" :md="2" :lg="2" class="extra__icon">
        <i class="fa" :class="icon"></i>
      </el-col>

      <el-col :xs="20" :sm="22" :md="22" :lg="22" :class="{iconClass: true}">

        <div class="extra__title">
          <h2>{{titulo}}</h2>
          <div class="extra__title--icon" v-if="descricaoExtra && iconSm">
            <i class="fa" :class="iconClassSm"></i>
            <p>{{descricaoExtra}}</p>
          </div>
        </div>
        <p>{{descricao}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {

    props: {
      titulo: {
        type: String,
        required: true
      },
      descricao: {
        type: String,
        required: true
      },
      descricaoExtra: {
        type: String
      },
      icon: {
        type: String,
        default: 'fa-star'
      },
      iconSm: {
        type: String,
        default: 'fa-star-o'

      },
      data: {
        type: String
      },
      index: {
        type: Number,
        default: 0
      },


    }
    ,
    computed: {
      iconClassSm(){
        return this.descricaoExtra ? this.iconSm : '';
      },
      horaTitulo(){
        return moment(this.data).locale('pt').calendar(null, {
          sameDay: '[Hoje!]',
          nextDay: '[Amanhã!]',
          nextWeek: '[Este] dddd!',
          lastDay: '[Foi ontem...]',
          lastWeek: '[Última] dddd',
          sameElse: 'DD/MM/YYYY'
        });
      }
      ,
      humanizarHorario(){
        return `${moment(this.data).locale('pt').format("dddd")}, ${moment(this.data).locale('pt').fromNow()} - ${moment(this.data).locale('pt').format('LL')}`;
      },
      horaInicio(){
        return `Começa às ${moment(this.data).format('HH:mm a')}`;
      }
    }
  }

</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .extra {
    padding: {
    top: $spacingSmall;
    bottom: $spacingSmall;
  }
    &__icon {

      font-size: $sizeXXLarge;
      color: $colorVerde;

    }
    &__title {
      h2 {
        display: inline-block;
        padding-right: $spacingBase;
      }
      &--icon {
        display: inline-block;
        p {
          display: inline-block;
          padding-left: $spacingXSmall;
        }
      }
    }
  }

</style>

