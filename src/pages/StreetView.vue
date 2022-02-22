<template>
  <q-page class="q-pa-sm row">
    <div id="myMap" class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="height: 85vh;width: 50%;"></div>
    <div id="pano" class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="height: 85vh;width: 50%;"></div>
  </q-page>
</template>

<script>
export default {
  name: 'StreetView',
  data () {
    return {
      mapData: ''
    }
  }
}
</script>

<style scoped>

</style>
