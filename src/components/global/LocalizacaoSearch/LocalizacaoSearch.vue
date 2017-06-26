<template>
  <!--
    @evento localSearch para obter resultado seleccionado
  -->
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="inputSearch"
      :fetch-suggestions="searchLocations"
      :placeholder="placeholder"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>

  import lodashDebounce from 'lodash.debounce';

  export default {

    props:['placeholder'],

    data(){
      return {
        locais: [],
        inputSearch: '',
      }
    },

    methods: {

      searchLocations: lodashDebounce(function (queryString,cb) {
        if (this.inputSearch) {
          this.$http.get(`terceiros/google/local/${this.inputUri}`).then(resposta => {
            // 200 OK
            return resposta.json()
          }, resposta => {
            // erro

            return false;
          }).then((data) => {

            this.locais = [{
              value: data.data.results[0].formatted_address,
              coordenadas: data.data.results[0].geometry.location,
            }];
            cb(this.locais);
          })
        }

      }, 250),
      querySearch(queryString, cb) {
        // call callback function to return suggestions
        cb([{value: 'oi'}]);
      },
      handleSelect(item) {
        this.$emit('localSearch',item);
      }
    },
    computed: {
      googleSearchLink(){
        return `http://maps.google.com/maps/api/geocode/json?address=${this.inputSearch}`;
      },
      inputUri(){
        return encodeURI(this.inputSearch);
      }
    },
    watch: {
      inputSearch(){
        if(this.inputSearch === ''){
          this.$emit('localSearch',false);
        }
      }
    }
  }
</script>

<style lang="scss">


</style>

