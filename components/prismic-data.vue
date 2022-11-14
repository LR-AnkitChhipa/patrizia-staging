<template>
  <b-container>
    <b-row>
      <b-col>
        <pre class="code">{{ $store.state.prismicDoc }}</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PrismicData'
}
</script>

<style scoped>
.code {
  width: 100%;
  height: 80vh;
  overflow: auto;
  background: black;
  color: white;
  font-size: 14px;
  padding: 10px;
}
</style>
