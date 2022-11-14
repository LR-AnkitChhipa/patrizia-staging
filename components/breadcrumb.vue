<template>
  <div id="Breadcrumb">
    <b-breadcrumb :items="breadcrumbitems.items" />
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumbitems: {
      type: Object,
      default () {
        return {
          items: [
            { text: 'European City Pulse', to: '/' },
            { text: 'The City Index', to: { name: '/' }, active: true }
          ]
        }
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#Breadcrumb {
  .breadcrumb{
    background: none;
    padding-bottom: 10px;
    margin-bottom: 1rem;
    border-bottom: 1px solid #F0EDEE;
    .breadcrumb-item{
      a{
        font-family: "Corporate S Pro";
        font-size: 16px;
        color: #BEB6BA;
        text-decoration: none;
        position: relative;
      }
      &::before{
        color: #BEB6BA;
      }
      &.active{
        color: #802437;
        font-family: "Corporate S Pro";
        font-size: 16px;
      }
    }
  }
}
</style>
