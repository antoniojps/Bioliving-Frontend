<template>
  <div>
    <el-input
      placeholder="Procurar eventos"
      icon="search"
      v-model="searchInput"
      :on-icon-click="handleIconClick"
    >
    </el-input>
  </div>
</template>

<script>
  // TODO : Vue-resource para dados ao input e criar componente EventSearchFilters (search com filtros)

  export default {
    data() {
      return {
        searchInput: ''
      }
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

</style>

